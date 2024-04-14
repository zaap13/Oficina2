import mongoose from "mongoose";

const coordenadorSchema = new mongoose.Schema({
  nome: String,
  departamento: String
});

const Coordenador = mongoose.model("Coordenador", coordenadorSchema);

export default Coordenador;
