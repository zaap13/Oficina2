import express from "express";
import { criarUsuario } from "../controllers/usuarioController";

const usuarioRouter = express.Router();

usuarioRouter.post("/", criarUsuario);

export default usuarioRouter;
