import Workshop from "../models/workshopModel.js";

async function inscreverAluno({ alunoId, workshopId }) {
  const workshop = await Workshop.findById(workshopId);
  if (!workshop) {
    throw new Error("Workshop não encontrado");
  }

  const alunoJaInscrito = workshop.alunosInscritos.some(
    (inscricao) => inscricao.aluno.toString() === alunoId.toString()
  );

  if (alunoJaInscrito) {
    throw new Error("Aluno já está inscrito neste workshop");
  }

  workshop.alunosInscritos.push({
    aluno: alunoId,
    certificadoGerado: false,
    marcadoFalta: false,
  });

  await workshop.save();
  return workshop;
}

async function buscarInscricaoPorAlunoEWorkshop(alunoId, workshopId) {
  const workshop = await Workshop.findById(workshopId);
  const inscricao = workshop.alunosInscritos.find(
    (inscricao) => inscricao.aluno.toString() === alunoId.toString()
  );
  return inscricao ? workshop : null;
}

async function desinscreverAluno({ alunoId, workshopId }) {
  const workshop = await Workshop.findById(workshopId);
  workshop.alunosInscritos = workshop.alunosInscritos.filter(
    (inscricao) => inscricao.aluno.toString() !== alunoId.toString()
  );
  return await workshop.save();
}

async function listarAlunosPorWorkshop(workshopId) {
  const workshop = await Workshop.findById(workshopId).populate({
    path: "alunosInscritos.aluno",
    model: "Usuario",
  });

  console.log(workshop.alunosInscritos);

  return workshop.alunosInscritos;
}

export {
  inscreverAluno,
  buscarInscricaoPorAlunoEWorkshop,
  desinscreverAluno,
  listarAlunosPorWorkshop,
};
