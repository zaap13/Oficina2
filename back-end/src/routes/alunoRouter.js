import express from "express";
import { criarAluno } from "../controllers/alunoController";

const alunoRouter = express.Router();

alunoRouter.post("/", criarAluno);

export default alunoRouter;