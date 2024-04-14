"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  return (
    <header className="w-full bg-blue-500 text-white px-4 py-2 flex items-center justify-between">
      <div>
        <Link href="/">
          <span className="text-lg font-bold">Ellp</span>
        </Link>
      </div>
      <nav className="space-x-4">
        <NavLink href="/workshops" title="Workshops" />
        <NavLink href="/certificados" title="Meus Certificados" />
        <NavLink href="/login" title="Login" />
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
