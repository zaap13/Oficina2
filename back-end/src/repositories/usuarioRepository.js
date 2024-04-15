import Usuario from "../models/usuarioModel.js";

async function criarUsuario(nome, email, senha) {
  const usuario = new Usuario({ nome, email, senha });
  return await usuario.save();
}

export { criarUsuario };
