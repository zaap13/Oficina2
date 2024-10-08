import express from "express";
import {
  buscarWorkshopPorId,
  criarNovoWorkshop,
  deletarWorkshop,
  editarWorkshop,
  listarTodosWorkshops,
} from "../controllers/workshopController.js";
import {
  inscreverAluno,
  desinscreverAluno,
  listarAlunosPorWorkshopId,
  marcarFalta,
} from "../controllers/inscricaoController.js";
import {
  verificarAdmin,
  verificarToken,
} from "../middlewares/authMiddleware.js";

const workshopRouter = express.Router();

workshopRouter.get("/", listarTodosWorkshops);
workshopRouter.post("/", verificarToken, verificarAdmin, criarNovoWorkshop);
workshopRouter.put(
  "/:workshopId",
  verificarToken,
  verificarAdmin,
  editarWorkshop
);
workshopRouter.delete(
  "/:workshopId",
  verificarToken,
  verificarAdmin,
  deletarWorkshop
);

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
workshopRouter.post(
  "/:workshopId/alunos/:alunoId/marcar-falta",
  verificarToken,
  verificarAdmin,
  marcarFalta
);

export default workshopRouter;
