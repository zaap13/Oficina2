import {
  atualizarWorkshop,
  buscarWorkshop,
  criarWorkshopService,
  listarTodosWorkshopsService,
  removerWorkshop,
} from "../services/workshopService.js";

async function criarNovoWorkshop(req, res) {
  try {
    const { titulo, descricao, data, vagas } = req.body;
    const novoWorkshop = await criarWorkshopService({ titulo, descricao, data, vagas });
    res.status(201).json({ mensagem: "Workshop criado com sucesso", workshop: novoWorkshop });
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

async function buscarWorkshopPorId(req, res) {
  try {
    const { id } = req.params;
    const workshop = await buscarWorkshop(id);
    if (!workshop) {
      return res.status(404).json({ mensagem: "Workshop não encontrado" });
    }
    res.status(200).json(workshop);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar workshop" });
  }
}

async function editarWorkshop(req, res) {
  try {
    const { workshopId } = req.params;
    const { titulo, descricao, data, vagas } = req.body;
    const workshopAtualizado = await atualizarWorkshop(workshopId, {
      titulo,
      descricao,
      data,
      vagas,
    });
    res.status(200).json({
      mensagem: "Workshop atualizado com sucesso",
      workshopAtualizado,
    });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}

async function deletarWorkshop(req, res) {
  try {
    const { workshopId } = req.params;
    await removerWorkshop(workshopId);
    res.status(200).json({ mensagem: "Workshop deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}

export {
  criarNovoWorkshop,
  listarTodosWorkshops,
  buscarWorkshopPorId,
  editarWorkshop,
  deletarWorkshop,
};
