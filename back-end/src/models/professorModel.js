import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
  nome: String,
  disciplina: String
});

const Professor = mongoose.model("Professor", professorSchema);

export default Professor;
