import mongoose from "mongoose";

const certificadoSchema = new mongoose.Schema({
  workshop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workshop",
    required: true,
  },
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  professorAssinante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  dataAssinatura: {
    type: Date,
    default: Date.now,
  },
});

const Certificado = mongoose.model("Certificado", certificadoSchema);

export default Certificado;
