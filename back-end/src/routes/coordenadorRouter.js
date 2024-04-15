import express from "express";
import { criarCoordenador } from "../controllers/coordenadorController.js";

const coordenadorRouter = express.Router();

coordenadorRouter.post("/", criarCoordenador);

export default coordenadorRouter;
