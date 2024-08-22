import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { buscarUsuarioPorEmail } from "../repositories/usuarioRepository.js";

const chaveSecreta = process.env.JWTSecret;

async function realizarLogin({ email, senha }) {
  const usuario = await buscarUsuarioPorEmail(email);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    throw new Error("Credenciais inválidas");
  }

  const payload = {
    id: usuario._id.toString(),
    email: usuario.email,
    tipo: usuario.tipo,
  };

  console.log("Payload JWT:", payload);

  const token = jwt.sign(payload, chaveSecreta);

  return token;
}

export { realizarLogin };
