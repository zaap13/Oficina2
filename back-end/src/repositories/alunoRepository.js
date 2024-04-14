import Aluno from "../models/alunoModel";

async function criarAluno(data) {
  return await Aluno.create(data);
}

export { criarAluno };
