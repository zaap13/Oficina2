import { criarProfessor } from "../repositories/professorRepository";

async function criarNovoProfessor(data) {
  try {
    return await criarProfessor(data);
  } catch (error) {
    throw new Error("Erro ao criar professor no banco de dados.");
  }
}

export { criarNovoProfessor };
