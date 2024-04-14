import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nomeUsuario: String,
  senha: String,
  tipo: String // "aluno" ou "professor"
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
