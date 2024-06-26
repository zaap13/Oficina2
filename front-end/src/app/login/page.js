"use client";
import Image from "next/image";
import Button from "@/components/Button.js";
import Input from "@/components/Input.js";
import ellp from "../../../public/ellp5.jpg";
import { useState } from "react";
import { login } from "@/services/apiService.js";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext.js";
import { getDecodedToken } from "@/helpers/authHelper.js";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { dispatch } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, senha);
      const token = response.token;
      localStorage.setItem("token", token);
      const decodedToken = getDecodedToken();
      const userType = decodedToken ? decodedToken.tipo : null;

      dispatch({ type: "LOGIN", payload: { userType } });
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao fazer login",
        text: "Verifique suas credenciais e tente novamente.",
      });
    }
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
            aria-label="E-mail"
            required
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Senha"
            aria-label="Senha"
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
