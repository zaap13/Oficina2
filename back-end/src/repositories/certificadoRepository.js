import Certificado from "../models/certificadoModel.js";

async function salvarCertificado(workshopId, alunoId) {
  const certificado = new Certificado({ workshop: workshopId, aluno: alunoId });
  return await certificado.save();
}

async function buscarCertificadosPorAluno(alunoId) {
  const certificados = await Certificado.find({ aluno: alunoId }).populate(
    "workshop"
  );
  return certificados || [];
}

export { salvarCertificado, buscarCertificadosPorAluno };
