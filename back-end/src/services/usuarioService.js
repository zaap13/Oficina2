import { criarUsuario } from "../repositories/usuarioRepository.js";

async function criarNovoUsuario(data) {
  try {
    return await criarUsuario(data);
  } catch (error) {
    throw new Error("Erro ao criar usuario no banco de dados.");
  }
}

export { criarNovoUsuario };
