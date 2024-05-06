import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Home from "@/app/page";

describe("Home Component", () => {
  test("renders welcome text", () => {
    render(<Home />);
    const welcomeText = screen.getByText(/Seja bem-vindo ao ELLP Workshops/i);
    expect(welcomeText).toBeInTheDocument();
  });

  test("renders request access button", () => {
    render(<Home />);
    const requestButton = screen.getByRole("button", { name: /Solicitar acesso/i });
    expect(requestButton).toBeInTheDocument();
  });

  test("renders login button", () => {
    render(<Home />);
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("login button redirects to login page", () => {
    render(<Home />);
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(loginButton.closest("a")).toHaveAttribute("href", "/login");
  });

  test("request access button redirects to sign page", () => {
    render(<Home />);
    const requestButton = screen.getByRole("button", { name: /Solicitar acesso/i });
    expect(requestButton.closest("a")).toHaveAttribute("href", "/sign");
  });
});
