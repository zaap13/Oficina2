import { criarAluno } from "../repositories/alunoRepository";

async function criarNovoAluno(data) {
  try {
    return await criarAluno(data);
  } catch (error) {
    throw new Error("Erro ao criar aluno no banco de dados.");
  }
}

export { criarNovoAluno };
