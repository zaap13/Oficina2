import {
  buscarInscricaoPorAlunoEWorkshop,
  desinscreverAluno,
  inscreverAluno,
} from "../repositories/inscricoesRepository.js";

async function inscreverAlunoNoWorkshop({ alunoId, workshopId }) {
  console.log(
    "Tentativa de inscrição - Aluno ID:",
    alunoId,
    "Workshop ID:",
    workshopId
  );

  const inscricaoExistente = await buscarInscricaoPorAlunoEWorkshop(
    alunoId,
    workshopId
  );
  if (inscricaoExistente) {
    throw new Error("Aluno já está inscrito neste workshop");
  }
  return await inscreverAluno({ alunoId, workshopId });
}

async function desinscreverAlunoNoWorkshop({ alunoId, workshopId }) {
  const inscricaoExistente = await buscarInscricaoPorAlunoEWorkshop(
    alunoId,
    workshopId
  );

  console.log(inscricaoExistente);
  if (!inscricaoExistente) {
    throw new Error("Aluno não está inscrito neste workshop");
  }
  return await desinscreverAluno({ alunoId, workshopId });
}

export { inscreverAlunoNoWorkshop, desinscreverAlunoNoWorkshop };
