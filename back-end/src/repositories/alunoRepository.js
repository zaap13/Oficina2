import Aluno from "../models/alunoModel.js";

async function criarAluno(data) {
  return await Aluno.create(data);
}

export { criarAluno };
