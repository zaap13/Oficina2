import {
  buscarInscricaoPorAlunoEWorkshop,
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

export { inscreverAlunoNoWorkshop };
