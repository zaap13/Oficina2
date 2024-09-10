"use client";
import { useEffect, useState } from "react";
import {
  listarAlunosPorWorkshop,
  gerarCertificado,
  marcarFalta,
} from "@/services/workshopService";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";

const WorkshopAlunosPage = () => {
  const { id } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [certificadosGerados, setCertificadosGerados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        setIsLoading(true);
        const data = await listarAlunosPorWorkshop(id);
        const certificados = data.filter(
          (inscricao) => inscricao.certificadoGerado
        );
        const pendentes = data.filter(
          (inscricao) => !inscricao.certificadoGerado && !inscricao.marcadoFalta
        );
        setAlunos(pendentes);
        setCertificadosGerados(certificados);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao listar alunos:", error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAlunos();
    }
  }, [id]);

  const handleGenerateCertificate = async (alunoId) => {
    try {
      await gerarCertificado(id, alunoId);
      Swal.fire({
        icon: "success",
        title: "Certificado gerado com sucesso",
      });

      setAlunos(alunos.filter((inscricao) => inscricao.aluno._id !== alunoId));
      setCertificadosGerados([
        ...certificadosGerados,
        alunos.find((inscricao) => inscricao.aluno._id === alunoId),
      ]);
    } catch (error) {
      console.error("Erro ao gerar certificado:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao gerar certificado",
        text: "Não foi possível gerar o certificado. Tente novamente.",
      });
    }
  };

  const handleMarcarFalta = async (alunoId) => {
    try {
      await marcarFalta(id, alunoId);
      Swal.fire({
        icon: "success",
        title: "Falta marcada com sucesso",
      });

      setAlunos(alunos.filter((inscricao) => inscricao.aluno._id !== alunoId));
    } catch (error) {
      console.error("Erro ao marcar falta:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao marcar falta",
        text: "Não foi possível marcar a falta. Tente novamente.",
      });
    }
  };

  return (
    <Layout className="p-8 bg-white">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-12">
        Alunos Inscritos no Workshop
      </h1>

      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {!isLoading &&
        alunos.length === 0 &&
        certificadosGerados.length === 0 && (
          <div className="text-center text-gray-600">
            <p>Nenhum aluno pendente neste workshop.</p>
          </div>
        )}

      {!isLoading && alunos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Alunos Pendentes</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {alunos.map((inscricao) => (
              <div
                key={inscricao.aluno._id}
                className="bg-gray-50 border border-gray-200 shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-orange-600">
                  {inscricao.aluno.nome}
                </h2>
                <p className="mt-2 text-gray-700">{inscricao.aluno.email}</p>
                <div className="flex justify-between mt-4">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() =>
                      handleGenerateCertificate(inscricao.aluno._id)
                    }>
                    Gerar Certificado
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleMarcarFalta(inscricao.aluno._id)}>
                    Marcar Falta
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && certificadosGerados.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Certificados Gerados</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificadosGerados.map((inscricao) => (
              <div
                key={inscricao.aluno._id}
                className="bg-gray-50 border border-gray-200 shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-green-600">
                  {inscricao.aluno.nome}
                </h2>
                <p className="mt-2 text-gray-700">{inscricao.aluno.email}</p>
                <p className="mt-4 text-gray-600">Certificado Gerado</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WorkshopAlunosPage;
