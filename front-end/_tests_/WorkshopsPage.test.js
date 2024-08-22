import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkshopsPage from "@/app/workshops/page";
import { AuthProvider } from "@/contexts/AuthContext";
import {
  listarWorkshops,
  buscarWorkshop,
  inscreverEmWorkshop,
} from "../src/services/workshopService";
import Swal from "sweetalert2";

jest.mock("../src/services/workshopService");
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("WorkshopsPage Component", () => {
  const mockUserId = "user1";
  const mockWorkshops = [
    {
      _id: "1",
      titulo: "Workshop 1",
      descricao: "Descrição do Workshop 1",
      data: "2024-08-02",
      vagas: 10,
      alunosInscritos: [mockUserId],
    },
    {
      _id: "2",
      titulo: "Workshop 2",
      descricao: "Descrição do Workshop 2",
      data: "2024-09-15",
      vagas: 20,
      alunosInscritos: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    listarWorkshops.mockResolvedValue(mockWorkshops);
    buscarWorkshop.mockResolvedValue(mockWorkshops[0]);
    inscreverEmWorkshop.mockResolvedValue({});
  });

  test("displays workshop details in a modal", async () => {
    render(
      <AuthProvider initialState={{ userId: mockUserId }}>
        <WorkshopsPage />
      </AuthProvider>
    );

    fireEvent.click(await screen.findByText("Workshop 1"));

    await waitFor(() => {
      const modalTitle = screen.getByText("Workshop 1");
      expect(modalTitle).toBeInTheDocument();
      expect(screen.getByText("Descrição do Workshop 1")).toBeInTheDocument();
    });
  });

  test("allows user to enroll in a workshop", async () => {
    buscarWorkshop.mockResolvedValue({
      ...mockWorkshops[1],
    });

    render(
      <AuthProvider initialState={{ userId: mockUserId }}>
        <WorkshopsPage />
      </AuthProvider>
    );

    fireEvent.click(await screen.findByText("Workshop 2"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /inscrever-se/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /inscrever-se/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Inscrição realizada com sucesso",
      });
    });
  });
});
