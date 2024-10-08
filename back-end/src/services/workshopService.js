import {
  criarWorkshop,
  buscarWorkshopPorId,
  listarWorkshops,
  removerWorkshopPorId,
  atualizarWorkshopPorId,
  listarWorkshopsPassadosRepository,
} from "../repositories/workshopRepository.js";

async function criarWorkshopService({ titulo, descricao, data, vagas }) {
  return await criarWorkshop({ titulo, descricao, data, vagas });
}

async function buscarWorkshop(id) {
  return await buscarWorkshopPorId(id);
}

async function listarTodosWorkshopsService() {
  return await listarWorkshops();
}

async function atualizarWorkshop(id, dadosAtualizados) {
  return await atualizarWorkshopPorId(id, dadosAtualizados);
}

async function removerWorkshop(id) {
  return await removerWorkshopPorId(id);
}

async function assinarCertificado(id, assinatura) {
  return await marcarCertificadoComoAssinado(id, assinatura);
}

async function listarWorkshopsPassadosService() {
  return await listarWorkshopsPassadosRepository();
}

export {
  criarWorkshopService,
  buscarWorkshop,
  listarTodosWorkshopsService,
  atualizarWorkshop,
  removerWorkshop,
  assinarCertificado,
  listarWorkshopsPassadosService,
};
