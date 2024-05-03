import axios from "axios";

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

export { login };
