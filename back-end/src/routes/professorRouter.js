import express from "express";
import { criarProfessor } from "../controllers/professorController";

const professorRouter = express.Router();

professorRouter.post("/", criarProfessor);

export default professorRouter;
