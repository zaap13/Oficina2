import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider } from "../src/contexts/AuthContext";
import RegisterPage from "@/app/cadastrar-aluno/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RegisterPage Component", () => {
  test("renders register form elements", () => {
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );

    expect(screen.getByText("Cadastro de Novo Usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo (admin/aluno)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cadastrar" })).toBeInTheDocument();
  });

  test("allows user to fill inputs", () => {
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );

    const nomeInput = screen.getByLabelText("Nome");
    const emailInput = screen.getByLabelText("E-mail");
    const tipoInput = screen.getByLabelText("Tipo (admin/aluno)");

    fireEvent.change(nomeInput, { target: { value: "Teste Nome" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(tipoInput, { target: { value: "admin" } });

    expect(nomeInput.value).toBe("Teste Nome");
    expect(emailInput.value).toBe("test@example.com");
    expect(tipoInput.value).toBe("admin");
  });
});
