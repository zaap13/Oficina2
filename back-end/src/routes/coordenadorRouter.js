import express from "express";
import { criarCoordenador } from "../controllers/coordenadorController";

const coordenadorRouter = express.Router();

coordenadorRouter.post("/", criarCoordenador);

export default coordenadorRouter;
