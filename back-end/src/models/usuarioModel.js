import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["aluno", "admin"],
    required: true,
  },
  instituicao: String,
  email: String,
  assinatura: String,
  avatar: String,
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
