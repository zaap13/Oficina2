import express from "express";
import {
  assinarCertificadoWorkshop,
  listarCertificadosPorAluno,
  gerarCertificadoParaAluno,
  baixarCertificado,
} from "../controllers/certificadoController.js";
import { listarWorkshopsPassados } from "../controllers/workshopController.js";
import {
  verificarAdmin,
  verificarToken,
} from "../middlewares/authMiddleware.js";

const certificadoRouter = express.Router();

certificadoRouter.post(
  "/assinar/:workshopId",
  verificarToken,
  verificarAdmin,
  assinarCertificadoWorkshop
);
certificadoRouter.get(
  "/baixar/:certificadoId",
  verificarToken,
  baixarCertificado
);
certificadoRouter.get("/aluno", verificarToken, listarCertificadosPorAluno);
certificadoRouter.get(
  "/workshops-passados",
  verificarToken,
  verificarAdmin,
  listarWorkshopsPassados
);

export default certificadoRouter;
