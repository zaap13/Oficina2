import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  vagas: {
    type: Number,
    required: true,
  },
  alunosInscritos: [
    {
      aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
      certificadoGerado: {
        type: Boolean,
        default: false,
      },
      marcadoFalta: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Workshop = mongoose.model("Workshop", workshopSchema);

export default Workshop;
