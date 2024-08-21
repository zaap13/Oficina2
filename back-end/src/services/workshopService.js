import {
  criarWorkshop,
  buscarWorkshopPorId,
  listarWorkshops,
} from "../repositories/workshopRepository.js";

async function criarWorkshopService({ titulo, descricao, data }) {
  return await criarWorkshop({ titulo, descricao, data });
}

async function buscarWorkshop(id) {
  console.log(id);
  return await buscarWorkshopPorId(id);
}

async function listarTodosWorkshopsService() {
  return await listarWorkshops();
}

export { criarWorkshopService, buscarWorkshop, listarTodosWorkshopsService };
