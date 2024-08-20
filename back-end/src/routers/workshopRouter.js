import express from "express";
import {
  criarNovoWorkshop,
  listarTodosWorkshops,
} from "../controllers/workshopController.js";
import {
  inscreverAluno,
  listarAlunosPorWorkshopId,
} from "../controllers/alunoworkshopController.js";
import { verificarAdmin, verificarToken } from "../middlewares/authMiddleware.js";

const workshopRouter = express.Router();

workshopRouter.get("/", listarTodosWorkshops);

workshopRouter.post("/", verificarToken, verificarAdmin, criarNovoWorkshop);

workshopRouter.post("/inscrever", verificarToken, inscreverAluno);

workshopRouter.get("/:workshopId/alunos", verificarToken, listarAlunosPorWorkshopId);

export default workshopRouter;
