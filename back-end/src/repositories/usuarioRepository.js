import Usuario from "../models/usuarioModel.js";

async function buscarUsuarioPorEmail(email) {
  return await Usuario.findOne({ email });
}

async function criarUsuario(nome, email, senha) {
  const usuario = new Usuario({ nome, email, senha });
  return await usuario.save();
}

export { criarUsuario, buscarUsuarioPorEmail };
