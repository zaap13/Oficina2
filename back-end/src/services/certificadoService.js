import { salvarCertificado, buscarCertificadosPorAluno } from "../repositories/certificadoRepository.js";
import { buscarWorkshopPorId } from "../repositories/workshopRepository.js";
import { gerarCertificadoPDF } from "./pdfService.js";

async function listarCertificadosAlunoService(alunoId) {
  return await buscarCertificadosPorAluno(alunoId);
}

async function assinarCertificadoService(workshopId, alunoId) {
  const workshop = await buscarWorkshopPorId(workshopId);
  if (new Date(workshop.data) > new Date()) {
    throw new Error("Não é possível assinar certificado de workshops futuros.");
  }
  await salvarCertificado(workshopId, alunoId);
}

async function gerarCertificadoService(workshopId, alunoId) {
  const workshop = await buscarWorkshopPorId(workshopId);
  return await gerarCertificadoPDF(workshop, alunoId);
}

export { listarCertificadosAlunoService, assinarCertificadoService, gerarCertificadoService };
