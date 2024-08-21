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

  // Incluindo o ID e o tipo de usuário no objeto assinado pelo JWT
  const payload = {
    id: usuario._id.toString(), // Convertendo o ObjectId para string
    email: usuario.email,
    tipo: usuario.tipo, // Supondo que 'tipo' seja o campo que define o tipo de usuário
  };

  console.log("Payload JWT:", payload); // Log para depuração

  const token = jwt.sign(payload, chaveSecreta);

  return token;
}

export { realizarLogin };
