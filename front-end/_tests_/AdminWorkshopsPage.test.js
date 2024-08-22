import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminWorkshopsPage from "@/app/gerenciar-workshop/page";
import { AuthProvider } from "@/contexts/AuthContext";
import {
  listarWorkshops,
  criarWorkshop,
  editarWorkshop,
  deletarWorkshop,
} from "@/services/workshopService";
import Swal from "sweetalert2";

jest.mock("../src/services/workshopService");
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("AdminWorkshopsPage Component", () => {
  const mockWorkshops = [
    {
      _id: "1",
      titulo: "Workshop 1",
      descricao: "Descrição do Workshop 1",
      data: "2024-08-02",
      vagas: 10,
    },
    {
      _id: "2",
      titulo: "Workshop 2",
      descricao: "Descrição do Workshop 2",
      data: "2024-09-15",
      vagas: 20,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    listarWorkshops.mockResolvedValue(mockWorkshops);
  });

  test("renders workshops and buttons", async () => {
    render(
      <AuthProvider>
        <AdminWorkshopsPage />
      </AuthProvider>
    );

    expect(await screen.findByText("Workshop 1")).toBeInTheDocument();
    expect(screen.getByText("Workshop 2")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar Novo Workshop" })
    ).toBeInTheDocument();
  });

  test("opens modal to create a new workshop", async () => {
    render(
      <AuthProvider>
        <AdminWorkshopsPage />
      </AuthProvider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Criar Novo Workshop" })
    );

    expect(await screen.findByPlaceholderText("Título")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar Workshop" })
    ).toBeInTheDocument();
  });

  test("allows admin to create a new workshop", async () => {
    criarWorkshop.mockResolvedValue({
      _id: "3",
      titulo: "Workshop 3",
      descricao: "Descrição do Workshop 3",
      data: "2024-10-10",
      vagas: 15,
    });

    render(
      <AuthProvider>
        <AdminWorkshopsPage />
      </AuthProvider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Criar Novo Workshop" })
    );

    fireEvent.change(screen.getByPlaceholderText("Título"), {
      target: { value: "Workshop 3" },
    });
    fireEvent.change(screen.getByPlaceholderText("Descrição"), {
      target: { value: "Descrição do Workshop 3" },
    });
    fireEvent.change(screen.getByPlaceholderText("Data"), {
      target: { value: "2024-10-10" },
    });
    fireEvent.change(screen.getByPlaceholderText("Vagas"), {
      target: { value: 15 },
    });

    fireEvent.click(screen.getByRole("button", { name: "Criar Workshop" }));

    await waitFor(() => {
      expect(screen.getByText("Workshop 3")).toBeInTheDocument();
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Workshop criado com sucesso",
      });
    });
  });

  test("opens modal to edit a workshop", async () => {
    render(
      <AuthProvider>
        <AdminWorkshopsPage />
      </AuthProvider>
    );

    const editButtons = await screen.findAllByText("Editar");
    fireEvent.click(editButtons[0]); // Seleciona o primeiro botão "Editar"

    expect(screen.getByPlaceholderText("Título").value).toBe("Workshop 1");
    expect(
      screen.getByRole("button", { name: "Atualizar Workshop" })
    ).toBeInTheDocument();
  });

  test("allows admin to edit a workshop", async () => {
    editarWorkshop.mockResolvedValue({
      _id: "1",
      titulo: "Workshop 1 - Editado",
      descricao: "Descrição do Workshop 1 - Editado",
      data: "2024-08-03",
      vagas: 8,
    });

    render(
      <AuthProvider>
        <AdminWorkshopsPage />
      </AuthProvider>
    );

    const editButtons = await screen.findAllByText("Editar");
    fireEvent.click(editButtons[0]); // Seleciona o primeiro botão "Editar"

    fireEvent.change(screen.getByPlaceholderText("Título"), {
      target: { value: "Workshop 1 - Editado" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Atualizar Workshop" }));

    await waitFor(() => {
      expect(screen.getByText("Workshop 1 - Editado")).toBeInTheDocument();
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Workshop atualizado com sucesso",
      });
    });
  });

  test("allows admin to delete a workshop", async () => {
    Swal.fire.mockResolvedValue({ isConfirmed: true });
    deletarWorkshop.mockResolvedValue({});

    render(
      <AuthProvider>
        <AdminWorkshopsPage />
      </AuthProvider>
    );

    const deleteButtons = await screen.findAllByText("Deletar");
    fireEvent.click(deleteButtons[0]); // Seleciona o primeiro botão "Deletar"

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Cancelar",
      });
    });

    await waitFor(() => {
      expect(screen.queryByText("Workshop 1")).not.toBeInTheDocument();
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Workshop deletado com sucesso",
      });
    });
  });
});
