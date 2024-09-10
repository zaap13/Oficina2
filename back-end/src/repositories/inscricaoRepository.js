import Workshop from "../models/workshopModel.js";

async function inscreverAluno({ alunoId, workshopId }) {
  const workshop = await Workshop.findById(workshopId);
  workshop.alunosInscritos.push(alunoId);
  return await workshop.save();
}

async function buscarInscricaoPorAlunoEWorkshop(alunoId, workshopId) {
  const workshop = await Workshop.findById(workshopId);
  return workshop.alunosInscritos.includes(alunoId) ? workshop : null;
}

async function desinscreverAluno({ alunoId, workshopId }) {
  const workshop = await Workshop.findById(workshopId);
  workshop.alunosInscritos = workshop.alunosInscritos.filter(id => id.toString() !== alunoId.toString());
  return await workshop.save();
}

async function listarAlunosPorWorkshop(workshopId) {
  const workshop = await Workshop.findById(workshopId).populate("alunosInscritos");
  return workshop.alunosInscritos;
}

export { inscreverAluno, buscarInscricaoPorAlunoEWorkshop, desinscreverAluno, listarAlunosPorWorkshop };
