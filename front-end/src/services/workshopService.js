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

export {
  listarWorkshops,
  buscarWorkshop,
  inscreverEmWorkshop,
  desinscreverDoWorkshop,
  criarWorkshop,
  editarWorkshop,
  deletarWorkshop,
};
