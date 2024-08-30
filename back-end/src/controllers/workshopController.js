import fs from "fs";
import {
  atualizarWorkshop,
  buscarWorkshop,
  criarWorkshopService,
  listarTodosWorkshopsService,
  removerWorkshop,
  assinarCertificado,
  gerarCertificadoPDF,
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

async function assinarWorkshop(req, res) {
  try {
    const { workshopId } = req.params;
    const { assinatura } = req.body; 

    const workshopAtualizado = await assinarCertificado(workshopId, assinatura);

    if (!workshopAtualizado) {
      return res.status(404).json({ mensagem: "Workshop não encontrado" });
    }

    res.status(200).json({
      mensagem: "Certificado assinado com sucesso",
      workshopAtualizado,
    });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}

async function gerarCertificado(req, res) {
  try {
    const { workshopId } = req.params;
    const alunoId = req.body.alunoId; 

    const workshop = await buscarWorkshopPorId(workshopId);
    if (!workshop) {
      return res.status(404).json({ mensagem: "Workshop não encontrado" });
    }

    const aluno = await buscarAlunoPorId(alunoId); 
    if (!aluno) {
      return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    const caminhoArquivo = await gerarCertificadoPDF(workshop, aluno);
    
    res.status(200).sendFile(caminhoArquivo, (err) => {
      if (err) {
        res.status(500).json({ mensagem: "Erro ao enviar o arquivo" });
      }
      fs.unlink(caminhoArquivo, (err) => { 
        if (err) console.error("Erro ao remover o arquivo:", err);
      });
    });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
}

export {
  criarNovoWorkshop,
  listarTodosWorkshops,
  buscarWorkshopPorId,
  editarWorkshop,
  deletarWorkshop,
  assinarWorkshop,
  gerarCertificado,
};
