"use client";
import { useEffect, useState } from "react";
import {
  listarWorkshops,
  buscarWorkshop,
  inscreverEmWorkshop,
  desinscreverDoWorkshop,
} from "@/services/workshopService";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";

const WorkshopsPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInscritos, setShowInscritos] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useAuth();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setIsLoading(true);
        const data = await listarWorkshops();
        setWorkshops(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao listar workshops:", error);
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  useEffect(() => {
    // Filtrar workshops com base no termo de busca
    const filtered = workshops.filter(
      (workshop) =>
        workshop.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workshop.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenar para mostrar workshops inscritos no topo
    const sortedWorkshops = filtered.sort((a, b) => {
      const isAInscrito = a.alunosInscritos.includes(state.userId);
      const isBInscrito = b.alunosInscritos.includes(state.userId);

      if (isAInscrito && !isBInscrito) return -1;
      if (!isAInscrito && isBInscrito) return 1;
      return 0;
    });

    // Se o filtro "mostrar inscritos" estiver ativo, mostrar todos, com os inscritos no topo
    // Se estiver inativo, mostrar apenas os não inscritos
    const results = sortedWorkshops.filter((workshop) => {
      return showInscritos || !workshop.alunosInscritos.includes(state.userId);
    });

    setFilteredWorkshops(results);
  }, [searchTerm, showInscritos, workshops, state.userId]);

  const handleSelectWorkshop = async (workshopId) => {
    try {
      const data = await buscarWorkshop(workshopId);
      setSelectedWorkshop(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar workshop:", error);
    }
  };

  const handleInscrever = async () => {
    try {
      await inscreverEmWorkshop(selectedWorkshop._id);
      Swal.fire({
        icon: "success",
        title: "Inscrição realizada com sucesso",
      });

      const updatedWorkshop = {
        ...selectedWorkshop,
        alunosInscritos: [...selectedWorkshop.alunosInscritos, state.userId],
      };
      setSelectedWorkshop(updatedWorkshop);
      setWorkshops((prevWorkshops) =>
        prevWorkshops.map((workshop) =>
          workshop._id === selectedWorkshop._id ? updatedWorkshop : workshop
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao inscrever no workshop:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao inscrever",
        text: "Não foi possível realizar a inscrição. Tente novamente.",
      });
    }
  };

  const handleDesinscrever = async () => {
    try {
      await desinscreverDoWorkshop(selectedWorkshop._id);
      Swal.fire({
        icon: "success",
        title: "Desinscrição realizada com sucesso",
      });

      const updatedWorkshop = {
        ...selectedWorkshop,
        alunosInscritos: selectedWorkshop.alunosInscritos.filter(
          (id) => id !== state.userId
        ),
      };
      setSelectedWorkshop(updatedWorkshop);
      setWorkshops((prevWorkshops) =>
        prevWorkshops.map((workshop) =>
          workshop._id === selectedWorkshop._id ? updatedWorkshop : workshop
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao desinscrever do workshop:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao desinscrever",
        text: "Não foi possível realizar a desinscrição. Tente novamente.",
      });
    }
  };

  return (
    <Layout className="p-8 bg-white">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-12">
        Workshops
      </h1>

      <div className="mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar workshops..."
          className="w-2/3 p-4 rounded-lg border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="ml-4">
          <label className="mr-2 text-gray-700">Mostrar inscritos</label>
          <input
            type="checkbox"
            checked={showInscritos}
            onChange={(e) => setShowInscritos(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {!isLoading && filteredWorkshops.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkshops.map((workshop) => (
            <div
              key={workshop._id}
              className="bg-gray-50 border border-gray-200 shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform cursor-pointer hover:shadow-xl"
              onClick={() => handleSelectWorkshop(workshop._id)}>
              <h2 className="text-2xl font-semibold text-orange-600">
                {workshop.titulo}
              </h2>
              <p className="mt-2 text-gray-700">{workshop.descricao}</p>
              <p className="mt-4 text-gray-600">
                Data: {new Date(workshop.data).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-600">
                Vagas: {workshop.vagas - workshop.alunosInscritos.length}{" "}
                disponíveis
              </p>
              {workshop.alunosInscritos.includes(state.userId) && (
                <p className="text-green-500 font-bold mt-2">
                  Você está inscrito!
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedWorkshop && isModalOpen && (
        <Modal
          title={selectedWorkshop.titulo}
          onClose={() => setIsModalOpen(false)}>
          <p>{selectedWorkshop.descricao}</p>
          <p>Data: {new Date(selectedWorkshop.data).toLocaleDateString()}</p>
          <p>
            Vagas:{" "}
            {selectedWorkshop.vagas - selectedWorkshop.alunosInscritos.length}{" "}
            disponíveis
          </p>
          {selectedWorkshop.alunosInscritos.includes(state.userId) ? (
            <Button
              className="mt-6 bg-red-500 hover:bg-red-600 text-white"
              isLoading={isLoading}
              onClick={handleDesinscrever}>
              Desinscrever-se
            </Button>
          ) : (
            <Button
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white"
              isLoading={isLoading}
              onClick={handleInscrever}>
              Inscrever-se
            </Button>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default WorkshopsPage;
