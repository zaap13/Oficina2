import express from "express";
import { criarUsuario } from "../controllers/usuarioController.js";
import { verificarAdmin, verificarToken } from "../middlewares/authMiddleware.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/", verificarToken, verificarAdmin, criarUsuario);

export default usuarioRouter;