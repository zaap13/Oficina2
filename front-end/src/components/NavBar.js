"use client";
import { getDecodedToken } from "@/helpers/authHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { handleLogout } from "@/helpers/authHelper";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const { state, dispatch } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuthenticated) {
      const decodedToken = getDecodedToken();
      if (decodedToken) {
        const userType = decodedToken.tipo;
        dispatch({ type: "LOGIN", payload: { userType } });
      }
    }
  }, [state.isAuthenticated]);

  const confirmLogout = async () => {
    const result = await Swal.fire({
      title: "Tem certeza que deseja sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      handleLogout();
      dispatch({ type: "LOGOUT" });
      router.push('/');
    }
  };

  console.log(state)

  return (
    <header className="w-full bg-blue-500 text-white px-4 py-2 flex items-center justify-between">
      <div>
        <Link href="/">
          <span className="text-lg font-bold">Ellp</span>
        </Link>
      </div>
      <nav className="space-x-4">
        {state.userType && state.isAuthenticated && (
          <NavLink href="/perfil" title="Perfil" />
        )}
        {state.userType === "admin" && state.isAuthenticated && (
          <>
            <NavLink href="/cadastrar-aluno" title="Cadastrar Aluno" />
            <NavLink href="/gerenciar-workshop" title="Gerenciar Workshops" />
          </>
        )}
        {state.userType === "aluno" && state.isAuthenticated && (
          <>
            <NavLink href="/workshops" title="Workshops" />
            <NavLink href="/meus-certificados" title="Meus Certificados" />
          </>
        )}
        {!state.isAuthenticated && <NavLink href="/login" title="Login" />}
        {state.isAuthenticated && (
          <button
            onClick={confirmLogout}
            className="text-white hover:text-yellow-500">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

const NavLink = ({ href, title }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <span
        className={`hover:text-yellow-500 ${
          router.pathname === href ? "text-yellow-500" : ""
        }`}>
        {title}
      </span>
    </Link>
  );
};

export default NavBar;
