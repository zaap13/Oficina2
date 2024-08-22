import express from "express";
import {
  buscarWorkshopPorId,
  criarNovoWorkshop,
  listarTodosWorkshops,
} from "../controllers/workshopController.js";
import {
  desinscreverAluno,
  inscreverAluno,
  listarAlunosPorWorkshopId,
} from "../controllers/alunoworkshopController.js";
import {
  verificarAdmin,
  verificarToken,
} from "../middlewares/authMiddleware.js";

const workshopRouter = express.Router();

workshopRouter.get("/", listarTodosWorkshops);

workshopRouter.post("/", verificarToken, verificarAdmin, criarNovoWorkshop);

workshopRouter.post("/:workshopId/inscrever", verificarToken, inscreverAluno);

workshopRouter.post(
  "/:workshopId/desinscrever",
  verificarToken,
  desinscreverAluno
);

workshopRouter.get(
  "/:workshopId/alunos",
  verificarToken,
  listarAlunosPorWorkshopId
);

workshopRouter.get("/:id", verificarToken, buscarWorkshopPorId);

export default workshopRouter;
