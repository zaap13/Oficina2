import { jwtDecode } from "jwt-decode";

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const getDecodedToken = () => {
  const token = getTokenFromLocalStorage();
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Erro ao decodificar token:", error.message);
      return null;
    }
  }
  return null;
};

export const handleLogout = () => {
  localStorage.removeItem("token");
};
