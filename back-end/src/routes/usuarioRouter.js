import express from "express";
import { criarUsuario } from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/", criarUsuario);

export default usuarioRouter;
