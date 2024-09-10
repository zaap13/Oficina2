"use client";
import { useEffect, useState } from "react";
import {
  listarWorkshops,
  listarWorkshopsPassados,
  criarWorkshop,
  editarWorkshop,
  deletarWorkshop,
} from "@/services/workshopService";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AdminWorkshopsPage = () => {
  const [workshopsAtuais, setWorkshopsAtuais] = useState([]);
  const [workshopsPassados, setWorkshopsPassados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    titulo: "",
    descricao: "",
    data: "",
    vagas: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setIsLoading(true);
        const [atuais, passados] = await Promise.all([
          listarWorkshops(),
          listarWorkshopsPassados(),
        ]);
        setWorkshopsAtuais(atuais);
        setWorkshopsPassados(passados);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao listar workshops:", error);
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleCreateWorkshop = async () => {
    try {
      const newWorkshop = await criarWorkshop(formState);
      setWorkshopsAtuais([...workshopsAtuais, newWorkshop]);
      Swal.fire({
        icon: "success",
        title: "Workshop criado com sucesso",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar workshop:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao criar workshop",
        text: "Não foi possível criar o workshop. Tente novamente.",
      });
    }
  };

  const handleGenerateCertificate = (workshopId) => {
    router.push(`/gerenciar-workshop/${workshopId}`);
  };

  const handleEditWorkshop = async () => {
    try {
      const updatedWorkshop = await editarWorkshop(
        selectedWorkshop._id,
        formState
      );
      setWorkshopsAtuais((prevWorkshops) =>
        prevWorkshops.map((workshop) =>
          workshop._id === selectedWorkshop._id ? updatedWorkshop : workshop
        )
      );
      Swal.fire({
        icon: "success",
        title: "Workshop atualizado com sucesso",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar workshop:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao atualizar workshop",
        text: "Não foi possível atualizar o workshop. Tente novamente.",
      });
    }
  };

  const handleDeleteWorkshop = async (workshopId) => {
    const resultado = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      try {
        await deletarWorkshop(workshopId);
        setWorkshopsAtuais(
          workshopsAtuais.filter((workshop) => workshop._id !== workshopId)
        );
        Swal.fire({
          icon: "success",
          title: "Workshop deletado com sucesso",
        });
      } catch (error) {
        console.error("Erro ao deletar workshop:", error);
        Swal.fire({
          icon: "error",
          title: "Erro ao deletar workshop",
          text: "Não foi possível deletar o workshop. Tente novamente.",
        });
      }
    }
  };

  const openModalForCreate = () => {
    setSelectedWorkshop(null);
    setFormState({ titulo: "", descricao: "", data: "", vagas: "" });
    setIsModalOpen(true);
  };

  const openModalForEdit = (workshop) => {
    setSelectedWorkshop(workshop);
    setFormState({
      titulo: workshop.titulo,
      descricao: workshop.descricao,
      data: workshop.data.split("T")[0],
      vagas: workshop.vagas,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedWorkshop) {
      handleEditWorkshop();
    } else {
      handleCreateWorkshop();
    }
  };

  return (
    <Layout className="p-8 bg-white">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-12">
        Gerenciamento de Workshops
      </h1>

      <div className="mb-8 flex justify-between items-center">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={openModalForCreate}>
          Criar Novo Workshop
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {!isLoading && workshopsAtuais.length > 0 && (
        <div>
          <h2 className="text-3xl font-semibold text-blue-600 mb-6">
            Workshops Atuais
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshopsAtuais.map((workshop) => (
              <div
                key={workshop._id}
                className="bg-gray-50 border border-gray-200 shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-orange-600">
                  {workshop.titulo}
                </h2>
                <p className="mt-2 text-gray-700">{workshop.descricao}</p>
                <p className="mt-4 text-gray-600">
                  Data: {new Date(workshop.data).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-600">
                  Vagas: {workshop.vagas} disponíveis
                </p>
                <div className="mt-4 flex justify-between">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => openModalForEdit(workshop)}
                    type="button">
                    Editar
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleDeleteWorkshop(workshop._id)}
                    type="button">
                    Deletar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && workshopsPassados.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-red-600 mb-6">
            Workshops Passados
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshopsPassados.map((workshop) => (
              <div
                key={workshop._id}
                className="bg-gray-50 border border-gray-200 shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-orange-600">
                  {workshop.titulo}
                </h2>
                <p className="mt-2 text-gray-700">{workshop.descricao}</p>
                <p className="mt-4 text-gray-600">
                  Data: {new Date(workshop.data).toLocaleDateString()}
                </p>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => handleGenerateCertificate(workshop._id)}>
                  Gerar certificado para alunos
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal
          title={selectedWorkshop ? "Editar Workshop" : "Criar Novo Workshop"}
          onClose={() => setIsModalOpen(false)}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Título"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={formState.titulo}
              onChange={(e) =>
                setFormState({ ...formState, titulo: e.target.value })
              }
            />
            <textarea
              placeholder="Descrição"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={formState.descricao}
              onChange={(e) =>
                setFormState({ ...formState, descricao: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Data"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={formState.data}
              onChange={(e) =>
                setFormState({ ...formState, data: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Vagas"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={formState.vagas}
              onChange={(e) =>
                setFormState({ ...formState, vagas: e.target.value })
              }
            />
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              type="submit">
              {selectedWorkshop ? "Atualizar Workshop" : "Criar Workshop"}
            </Button>
          </form>
        </Modal>
      )}
    </Layout>
  );
};

export default AdminWorkshopsPage;
