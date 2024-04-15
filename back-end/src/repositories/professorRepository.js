import Professor from "../models/professorModel.js";

async function criarProfessor(data) {
  return await Professor.create(data);
}

export { criarProfessor };
