import {
    assinarCertificadoService,
    listarCertificadosAlunoService,
    gerarCertificadoService,
  } from "../services/certificadoService.js";
  
  async function listarCertificadosPorAluno(req, res) {
    try {
      const certificados = await listarCertificadosAlunoService(req.user.id);
      res.status(200).json(certificados);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao listar certificados" });
    }
  }
  
  async function assinarCertificadoWorkshop(req, res) {
    const { workshopId } = req.params;
    const { alunoId } = req.body;
  
    try {
      await assinarCertificadoService(workshopId, alunoId);
      res.status(200).json({ mensagem: "Certificado assinado com sucesso" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao assinar certificado" });
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
  
  export { listarCertificadosPorAluno, assinarCertificadoWorkshop, gerarCertificadoParaAluno };
  