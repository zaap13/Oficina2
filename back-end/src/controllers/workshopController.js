import {
  criarWorkshopService,
  listarTodosWorkshopsService,
} from "../services/workshopService.js";

async function criarNovoWorkshop(req, res) {
  try {
    const { titulo, descricao, data } = req.body;
    const workshop = await criarWorkshopService({ titulo, descricao, data });
    res.status(201).json({ mensagem: "Workshop criado com sucesso", workshop });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}

async function listarTodosWorkshops(req, res) {
  try {
    const workshops = await listarTodosWorkshopsService();
    res.status(200).json(workshops);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar workshops" });
  }
}

export { criarNovoWorkshop, listarTodosWorkshops };
