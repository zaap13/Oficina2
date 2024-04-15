import express from "express";
import { criarProfessor } from "../controllers/professorController.js";

const professorRouter = express.Router();

professorRouter.post("/", criarProfessor);

export default professorRouter;
