import Workshop from "../models/workshopModel.js";

async function criarWorkshop(titulo, descricao, data) {
  const workshop = new Workshop({ titulo, descricao, data });
  return await workshop.save();
}

async function buscarWorkshopPorId(id) {
  return await Workshop.findById(id);
}

async function listarWorkshops() {
  return await Workshop.find();
}

export { criarWorkshop, buscarWorkshopPorId, listarWorkshops };
