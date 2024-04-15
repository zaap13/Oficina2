import Usuario from "../models/usuarioModel.js";

async function criarUsuario(data) {
  return await Usuario.create(data);
}

export { criarUsuario };
