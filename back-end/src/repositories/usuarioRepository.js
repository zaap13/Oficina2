import Usuario from "../models/usuarioModel";

async function criarUsuario(data) {
  return await Usuario.create(data);
}

export { criarUsuario };
