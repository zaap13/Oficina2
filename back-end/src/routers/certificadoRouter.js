import express from "express";
import {
  assinarCertificadoWorkshop,
  listarCertificadosPorAluno,
  gerarCertificadoParaAluno,
} from "../controllers/certificadoController.js";
import { verificarAdmin, verificarToken } from "../middlewares/authMiddleware.js";

const certificadoRouter = express.Router();

certificadoRouter.post("/assinar/:workshopId", verificarToken, verificarAdmin, assinarCertificadoWorkshop);
certificadoRouter.get("/aluno", verificarToken, listarCertificadosPorAluno);
certificadoRouter.get("/gerar/:workshopId/:alunoId", verificarToken, gerarCertificadoParaAluno);

export default certificadoRouter;
