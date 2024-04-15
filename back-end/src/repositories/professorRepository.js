import Professor from "../models/professorModel";

async function criarProfessor(data) {
  return await Professor.create(data);
}

export { criarProfessor };
