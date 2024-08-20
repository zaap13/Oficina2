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
    const response = await apiService.get(`/workshops/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const inscreverEmWorkshop = async (workshopId, userId) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.post(
      `/workshops/${workshopId}/inscrever`,
      { userId },
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

export { listarWorkshops, buscarWorkshop, inscreverEmWorkshop };
