import { criarCoordenador } from "../repositories/coordernadorRepository";

async function criarNovoCoordenador(data) {
  try {
    return await criarCoordenador(data);
  } catch (error) {
    throw new Error("Erro ao criar coordenador no banco de dados.");
  }
}

export { criarNovoCoordenador };
