import {
  inscreverAlunoNoWorkshop,
  desinscreverAlunoNoWorkshop,
  listarAlunosPorWorkshopService,
  marcarFaltaService,
} from "../services/inscricaoService.js";

async function inscreverAluno(req, res) {
  try {
    const alunoId = req.usuario.id;
    const { workshopId } = req.params;

    const inscricao = await inscreverAlunoNoWorkshop({ alunoId, workshopId });
    res.status(201).json({ mensagem: "Aluno inscrito com sucesso", inscricao });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}

async function desinscreverAluno(req, res) {
  try {
    const alunoId = req.usuario.id;
    const { workshopId } = req.params;

    await desinscreverAlunoNoWorkshop({ alunoId, workshopId });
    res.status(200).json({ mensagem: "Desinscrição realizada com sucesso" });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}

async function listarAlunosPorWorkshopId(req, res) {
  try {
    const { workshopId } = req.params;
    const alunos = await listarAlunosPorWorkshopService(workshopId);
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar alunos do workshop" });
  }
}

async function marcarFalta(req, res) {
  try {
    const { workshopId, alunoId } = req.params;
    await marcarFaltaService(workshopId, alunoId);
    res.status(200).json({ mensagem: "Falta marcada com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
}

export { inscreverAluno, desinscreverAluno, listarAlunosPorWorkshopId, marcarFalta };
