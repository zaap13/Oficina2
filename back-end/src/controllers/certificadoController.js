import Workshop from "../models/workshopModel.js";
import Usuario from "../models/usuarioModel.js";
import Certificado from "../models/certificadoModel.js";

import {
  assinarCertificadoService,
  listarCertificadosAlunoService,
  gerarCertificadoService,
} from "../services/certificadoService.js";

async function listarCertificadosPorAluno(req, res) {
  try {
    const certificados = await listarCertificadosAlunoService(req.usuario.id);
    res.status(200).json(certificados);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar certificados" });
  }
}

async function assinarCertificadoWorkshop(req, res) {
  try {
    const { workshopId } = req.params;
    const { alunoId } = req.body;
    const professorId = req.usuario.id;

    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ mensagem: "Workshop não encontrado" });
    }

    const alunoInscrito = workshop.alunosInscritos.find(
      (inscricao) => inscricao.aluno.toString() === alunoId
    );

    if (!alunoInscrito) {
      return res.status(404).json({ mensagem: "Aluno não inscrito" });
    }

    alunoInscrito.certificadoGerado = true;

    const novoCertificado = new Certificado({
      workshop: workshopId,
      aluno: alunoId,
      professorAssinante: professorId,
    });

    await novoCertificado.save();
    await workshop.save();

    res.status(201).json({
      mensagem: "Certificado assinado com sucesso",
      certificado: novoCertificado,
    });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
}

async function baixarCertificado(req, res) {
  try {
    const { certificadoId } = req.params;
    const certificado = await Certificado.findById(certificadoId)
      .populate("workshop")
      .populate("aluno")
      .populate("professorAssinante");

    if (!certificado) {
      return res.status(404).json({ mensagem: "Certificado não encontrado" });
    }

    const caminhoArquivo = await gerarCertificadoPDF(
      certificado.workshop,
      certificado.aluno,
      certificado.professorAssinante
    );

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

async function gerarCertificadoParaAluno(req, res) {
  const { workshopId, alunoId } = req.params;
  try {
    const caminhoArquivo = await gerarCertificadoService(workshopId, alunoId);
    res.status(200).sendFile(caminhoArquivo);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao gerar certificado" });
  }
}

export {
  listarCertificadosPorAluno,
  assinarCertificadoWorkshop,
  gerarCertificadoParaAluno,
  baixarCertificado,
};
