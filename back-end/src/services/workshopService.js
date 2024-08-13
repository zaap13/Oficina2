import { criarWorkshop, buscarWorkshopPorId, listarWorkshops } from "../repositories/workshopRepository.js";

async function criarNovoWorkshop({ titulo, descricao, data }) {
  return await criarWorkshop({ titulo, descricao, data });
}

async function buscarWorkshop(id) {
  return await buscarWorkshopPorId(id);
}

async function listarTodosWorkshops() {
  return await listarWorkshops();
}

export { criarNovoWorkshop, buscarWorkshop, listarTodosWorkshops };
