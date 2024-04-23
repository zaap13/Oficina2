"use client";
import React, { createContext, useContext, useReducer } from "react";
import { getDecodedToken } from "@/helpers/authHelper";

const initialState = {
  isAuthenticated: false,
  userType: null,
};

const AuthActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      const userType = action.payload?.userType || state.userType; // Prioriza o userType do payload, se disponível
      return { isAuthenticated: true, userType };
    case AuthActionTypes.LOGOUT:
      return { isAuthenticated: false, userType: null };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  React.useEffect(() => {
    const decodedToken = getDecodedToken();
    if (decodedToken) {
      const userType = decodedToken.tipo;
      dispatch({ type: AuthActionTypes.LOGIN, payload: { userType } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
