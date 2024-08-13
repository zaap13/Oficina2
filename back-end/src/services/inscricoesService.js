import { inscreverAluno, buscarInscricaoPorAlunoEWorkshop } from "../repositories/inscricaoRepository.js";

async function inscreverAlunoNoWorkshop({ alunoId, workshopId }) {
  const inscricaoExistente = await buscarInscricaoPorAlunoEWorkshop(alunoId, workshopId);
  if (inscricaoExistente) {
    throw new Error("Aluno já está inscrito neste workshop");
  }
  return await inscreverAluno({ alunoId, workshopId });
}

export { inscreverAlunoNoWorkshop };
