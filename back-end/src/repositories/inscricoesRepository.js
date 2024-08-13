import Inscricao from "../models/inscricaoModel.js";

async function inscreverAluno(alunoId, workshopId) {
  const inscricao = new Inscricao({ aluno: alunoId, workshop: workshopId });
  return await inscricao.save();
}

async function buscarInscricaoPorAlunoEWorkshop(alunoId, workshopId) {
  return await Inscricao.findOne({ aluno: alunoId, workshop: workshopId });
}

export { inscreverAluno, buscarInscricaoPorAlunoEWorkshop };
