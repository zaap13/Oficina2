"use client";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ellp from "../../../public/ellp5.jpg";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          email,
          senha,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      console.log("Token de acesso:", token);
      // Redirecionar/Boas Vindas
    } catch (error) {
      console.error("Erro ao fazer login:", error.response.data);
      // Tratar erros de login, exibir mensagem para o usuário, etc.
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch h-screen">
      <div className="relative w-full md:w-[50%] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={ellp}
            alt="Ellp animate"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col md:w-[50%] items-center justify-center p-8 bg-gradient-to-b from-transparent to-neutral-900">
        <h1 className="text-3xl pb-8 text-center font-semibold text-white">
          Log in
        </h1>

        <form
          onSubmit={handleLoginSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <Input
            type="email"
            autoComplete="username"
            placeholder="E-mail"
            required
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Senha"
            required
            className="w-full"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white mt-4"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
