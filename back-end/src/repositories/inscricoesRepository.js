import Workshop from "../models/workshopModel.js";

async function inscreverAluno({ alunoId, workshopId }) {
  const workshop = await Workshop.findById(workshopId);
  if (!workshop) {
    throw new Error("Workshop não encontrado");
  }

  const alunoJaInscrito = workshop.alunosInscritos.includes(alunoId);
  if (alunoJaInscrito) {
    throw new Error("Aluno já está inscrito neste workshop");
  }

  workshop.alunosInscritos.push(alunoId);
  return await workshop.save();
}

async function buscarInscricaoPorAlunoEWorkshop(alunoId, workshopId) {
  const workshop = await Workshop.findById(workshopId);

  if (!workshop) {
    return null;
  }

  const alunoJaInscrito = workshop.alunosInscritos.includes(alunoId);
  return alunoJaInscrito ? workshop : null;
}
async function desinscreverAluno({ alunoId, workshopId }) {
  const workshop = await Workshop.findById(workshopId);
  if (!workshop) {
    throw new Error("Workshop não encontrado");
  }

  workshop.alunosInscritos = workshop.alunosInscritos.filter(
    (inscritoId) => inscritoId.toString() !== alunoId.toString()
  );

  return await workshop.save();
}

export { inscreverAluno, buscarInscricaoPorAlunoEWorkshop, desinscreverAluno };
