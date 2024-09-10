"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import { listarCertificadosUsuario } from "@/services/workshopService";

const MeusCertificadosPage = () => {
  const [certificados, setCertificados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCertificados = async () => {
      try {
        setIsLoading(true);
        const data = await listarCertificadosUsuario();
        if (data && Array.isArray(data)) {
          setCertificados(data);
        } else {
          setCertificados([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao listar certificados:", error);
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível carregar os certificados.",
        });
      }
    };

    fetchCertificados();
  }, []);

  const handleDownload = async (certificadoId) => {
    try {
      const token = localStorage.getItem("token"); // Obtendo o token do localStorage
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/certificado/baixar/${certificadoId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao baixar o certificado");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificado-${certificadoId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      Swal.fire({
        icon: "success",
        title: "Download Iniciado",
        text: "O download do certificado foi iniciado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao baixar o certificado:", error);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível baixar o certificado. Tente novamente.",
      });
    }
  };

  return (
    <Layout className="p-8 bg-white">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-12">
        Meus Certificados
      </h1>

      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : certificados.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Você ainda não possui nenhum certificado.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificados.map((certificado) => (
            <div
              key={certificado._id}
              className="bg-gray-50 border border-gray-200 shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-orange-600">
                {certificado?.workshop?.titulo || "Workshop Desconhecido"}
              </h2>
              <p className="mt-2 text-gray-700">
                Assinado por:{" "}
                {certificado?.professorAssinante?.nome ||
                  "Professor Desconhecido"}
              </p>
              <p className="mt-4 text-gray-600">
                Data de Assinatura:{" "}
                {certificado?.dataAssinatura
                  ? new Date(certificado.dataAssinatura).toLocaleDateString()
                  : "Data Desconhecida"}
              </p>
              <Button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleDownload(certificado._id)}>
                Download PDF
              </Button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default MeusCertificadosPage;
