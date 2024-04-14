import mongoose from "mongoose";

const alunoSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  curso: String
});

const Aluno = mongoose.model("Aluno", alunoSchema);

export default Aluno;
