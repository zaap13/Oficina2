import express from "express";
import {
  buscarWorkshopPorId,
  criarNovoWorkshop,
  deletarWorkshop,
  editarWorkshop,
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

workshopRouter.put("/:workshopId", verificarToken, verificarAdmin, editarWorkshop);

workshopRouter.delete("/:workshopId", verificarToken, verificarAdmin, deletarWorkshop);

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
