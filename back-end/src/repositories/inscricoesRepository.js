import Workshop from "../models/workshopModel.js";

// Função para inscrever um aluno em um workshop
async function inscreverAluno({ alunoId, workshopId }) {
  const workshop = await Workshop.findById(workshopId);
  if (!workshop) {
    throw new Error("Workshop não encontrado");
  }

  // Verifica se o aluno já está inscrito
  const alunoJaInscrito = workshop.alunosInscritos.includes(alunoId);
  if (alunoJaInscrito) {
    throw new Error("Aluno já está inscrito neste workshop");
  }

  // Adiciona o aluno ao array de inscritos
  workshop.alunosInscritos.push(alunoId);
  return await workshop.save();
}

// Função para buscar uma inscrição específica de um aluno em um workshop
async function buscarInscricaoPorAlunoEWorkshop(alunoId, workshopId) {
  const workshop = await Workshop.findById(workshopId);

  if (!workshop) {
    return null;
  }

  // Verifica se o aluno está inscrito
  const alunoJaInscrito = workshop.alunosInscritos.includes(alunoId);
  return alunoJaInscrito ? workshop : null;
}

export { inscreverAluno, buscarInscricaoPorAlunoEWorkshop };
