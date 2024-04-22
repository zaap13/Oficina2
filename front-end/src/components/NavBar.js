"use client";
import { getDecodedToken } from "@/helpers/authHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isClient, setIsClient] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const decodedToken = getDecodedToken();
    if (decodedToken) {
      const userType = decodedToken.tipo;
      setUserType(userType);
    }
  }, []);

  return (
    <header className="w-full bg-blue-500 text-white px-4 py-2 flex items-center justify-between">
      <div>
        <Link href="/">
          <span className="text-lg font-bold">Ellp</span>
        </Link>
      </div>
      <nav className="space-x-4">
        {isClient && userType === "admin" && (
          <>
            <NavLink href="/cadastrar-aluno" title="Cadastrar Aluno" />
            <NavLink href="/assinar-certificado" title="Assinar Certificado" />
          </>
        )}
        {isClient && userType === "aluno" && (
          <>
            <NavLink href="/workshops" title="Workshops" />
            <NavLink href="/meus-certificados" title="Meus Certificados" />
          </>
        )}
        {isClient && userType && <NavLink href="/perfil" title="Perfil" />}
        {isClient && !userType && <NavLink href="/login" title="Login" />}
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
