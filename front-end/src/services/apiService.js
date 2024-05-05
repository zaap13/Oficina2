import axios from "axios";
import { getTokenFromLocalStorage } from "@/helpers/authHelper.js";

const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const login = async (email, senha) => {
  try {
    const response = await apiService.post("/login", { email, senha });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const register = async (userData) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await apiService.post("/usuarios", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { login, register };
