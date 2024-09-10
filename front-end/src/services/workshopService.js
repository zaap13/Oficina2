import axios from "axios";
import { getTokenFromLocalStorage } from "@/helpers/authHelper.js";

const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const listarWorkshops = async () => {
  try {
    const response = await apiService.get("/workshops");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const buscarWorkshop = async (id) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.get(`/workshops/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const inscreverEmWorkshop = async (workshopId) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.post(
      `/workshops/${workshopId}/inscrever`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const desinscreverDoWorkshop = async (workshopId) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.post(
      `/workshops/${workshopId}/desinscrever`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const criarWorkshop = async (dados) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.post("/workshops", dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.workshop;
  } catch (error) {
    throw error;
  }
};

const editarWorkshop = async (workshopId, dadosAtualizados) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.put(
      `/workshops/${workshopId}`,
      dadosAtualizados,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.workshopAtualizado;
  } catch (error) {
    throw error;
  }
};

const deletarWorkshop = async (workshopId) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.delete(`/workshops/${workshopId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const listarWorkshopsPassados = async () => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.get("/certificado/workshops-passados", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função para listar alunos por workshop
const listarAlunosPorWorkshop = async (workshopId) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.get(`/workshops/${workshopId}/alunos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const gerarCertificado = async (workshopId, alunoId) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.post(
      `/certificado/assinar/${workshopId}`,
      { alunoId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const marcarFalta = async (workshopId, alunoId) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.post(
      `/workshops/${workshopId}/alunos/${alunoId}/marcar-falta`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const listarCertificadosUsuario = async () => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.get("/certificado/aluno", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const baixarCertificado = async (certificadoId) => {
  const token = getTokenFromLocalStorage();
  const response = await apiService.get(
    `/certificado/baixar/${certificadoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // Isso é importante para lidar com o PDF
    }
  );

  return response;
};

export {
  listarWorkshops,
  buscarWorkshop,
  inscreverEmWorkshop,
  desinscreverDoWorkshop,
  criarWorkshop,
  editarWorkshop,
  deletarWorkshop,
  listarWorkshopsPassados,
  listarAlunosPorWorkshop,
  gerarCertificado,
  marcarFalta,
  listarCertificadosUsuario,
  baixarCertificado,
};
