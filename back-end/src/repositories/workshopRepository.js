import Workshop from "../models/workshopModel.js";

async function criarWorkshop({ titulo, descricao, data, vagas }) {
  console.log(titulo, descricao, data, vagas);

  const workshop = new Workshop({ titulo, descricao, data, vagas });
  return await workshop.save();
}

async function buscarWorkshopPorId(id) {
  return await Workshop.findById(id);
}

async function listarWorkshops() {
  return await Workshop.find();
}

async function atualizarWorkshopPorId(id, dadosAtualizados) {
  return await Workshop.findByIdAndUpdate(id, dadosAtualizados, { new: true });
}

async function removerWorkshopPorId(id) {
  return await Workshop.findByIdAndDelete(id);
}

async function marcarCertificadoComoAssinado(id, assinatura) {
  return await Workshop.findByIdAndUpdate(
    id,
    { certificadoAssinado: true, assinaturaProfessor: assinatura },
    { new: true }
  );
}

export {
  criarWorkshop,
  buscarWorkshopPorId,
  listarWorkshops,
  atualizarWorkshopPorId,
  removerWorkshopPorId,
  marcarCertificadoComoAssinado,
};
