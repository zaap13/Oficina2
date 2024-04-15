import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import ellp from "../../public/ellp1.jpg";

const Home = () => {
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
        <h1 className="text-[40px] pb-8 text-center z-20 font-semibold text-white">
          Seja bem-vindo ao ELLP Workshops
        </h1>
        <div className="flex flex-col w-full items-end justify-center gap-4">
          <Link href="/sign" className="w-full flex items-center justify-center">
            <Button className="w-full bg-white text-neutral-900">Solicitar acesso</Button>
          </Link>
          <Link href="/login" className="w-full flex items-center justify-center">
            <Button className="w-full bg-neutral-900 text-white border border-gray-700">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
