import bcrypt from "bcrypt";
import { criarUsuario } from "../repositories/usuarioRepository.js";

async function criarNovoUsuario({ nome, email, tipo }) {
  const senha = Math.floor(1000 + Math.random() * 9000).toString();

  const hashedSenha = await bcrypt.hash(senha, 10);

  await criarUsuario(nome, email, hashedSenha, tipo);

  return senha;
}

export { criarNovoUsuario };