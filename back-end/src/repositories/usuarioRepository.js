import Usuario from "../models/usuarioModel.js";

async function buscarUsuarioPorEmail(email) {
  return await Usuario.findOne({ email });
}

async function criarUsuario(nome, email, senha, tipo) {
  const usuario = new Usuario({ nome, email, senha, tipo });
  return await usuario.save();
}

export { criarUsuario, buscarUsuarioPorEmail };
