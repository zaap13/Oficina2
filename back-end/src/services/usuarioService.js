import { criarUsuario } from "../repositories/usuarioRepository.js";

async function criarNovoUsuario(nome, email) {
  const senha = Math.floor(1000 + Math.random() * 9000).toString();
  await criarUsuario(nome, email, senha);
  return senha;
}

export { criarNovoUsuario };
