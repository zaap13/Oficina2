"use client";
import { useEffect, useState } from "react";
import {
  listarWorkshops,
  buscarWorkshop,
  inscreverEmWorkshop,
} from "@/services/workshopService";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Swal from "sweetalert2";

const WorkshopsPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useAuth();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setIsLoading(true);
        const data = await listarWorkshops();
        console.log("Workshops recebidos:", data); // Adicione este log
        setWorkshops(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao listar workshops:", error);
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleSelectWorkshop = async (workshopId) => {
    try {
      const data = await buscarWorkshop(workshopId);
      setSelectedWorkshop(data);
    } catch (error) {
      console.error("Erro ao buscar workshop:", error);
    }
  };

  const handleInscrever = async () => {
    try {
      await inscreverEmWorkshop(selectedWorkshop._id, state.user._id);
      Swal.fire({
        icon: "success",
        title: "Inscrição realizada com sucesso",
      });
    } catch (error) {
      console.error("Erro ao inscrever no workshop:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao inscrever",
        text: "Não foi possível realizar a inscrição. Tente novamente.",
      });
    }
  };

  return (
    <Layout className="p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Workshops</h1>

      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {!isLoading && workshops.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop) => (
            <div
              key={workshop._id}
              className="border p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition"
              onClick={() => handleSelectWorkshop(workshop._id)}>
              <h2 className="text-xl font-bold">{workshop.titulo}</h2>
              <p>{workshop.descricao}</p>
              <p>Data: {new Date(workshop.data).toLocaleDateString()}</p>
              <p>
                Vagas: {workshop.vagas - workshop.alunosInscritos.length}{" "}
                disponíveis
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedWorkshop && (
        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="text-2xl font-bold">{selectedWorkshop.titulo}</h2>
          <p>{selectedWorkshop.descricao}</p>
          <p>Data: {new Date(selectedWorkshop.data).toLocaleDateString()}</p>
          <p>
            Vagas:{" "}
            {selectedWorkshop.vagas - selectedWorkshop.alunosInscritos.length}{" "}
            disponíveis
          </p>

          <Button
            className="mt-4"
            isLoading={isLoading}
            onClick={handleInscrever}>
            Inscrever-se
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default WorkshopsPage;
