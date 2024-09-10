import {
  buscarInscricaoPorAlunoEWorkshop,
  inscreverAluno,
  desinscreverAluno,
  listarAlunosPorWorkshop,
} from "../repositories/inscricaoRepository.js";

async function inscreverAlunoNoWorkshop({ alunoId, workshopId }) {
  const inscricaoExistente = await buscarInscricaoPorAlunoEWorkshop(alunoId, workshopId);
  if (inscricaoExistente) {
    throw new Error("Aluno já está inscrito neste workshop");
  }
  return await inscreverAluno({ alunoId, workshopId });
}

async function desinscreverAlunoNoWorkshop({ alunoId, workshopId }) {
  const inscricaoExistente = await buscarInscricaoPorAlunoEWorkshop(alunoId, workshopId);
  if (!inscricaoExistente) {
    throw new Error("Aluno não está inscrito neste workshop");
  }
  return await desinscreverAluno({ alunoId, workshopId });
}

async function listarAlunosPorWorkshopService(workshopId) {
  return await listarAlunosPorWorkshop(workshopId);
}

export { inscreverAlunoNoWorkshop, desinscreverAlunoNoWorkshop, listarAlunosPorWorkshopService };
