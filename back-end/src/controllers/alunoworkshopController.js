import { inscreverAlunoNoWorkshop, listarAlunosPorWorkshop } from "../services/alunoWorkshopService.js";

async function inscreverAluno(req, res) {
  try {
    const { alunoId, workshopId } = req.body;
    const inscricao = await inscreverAlunoNoWorkshop({ alunoId, workshopId });
    res.status(201).json({ mensagem: "Aluno inscrito com sucesso", inscricao });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}

async function listarAlunosPorWorkshopId(req, res) {
  try {
    const { workshopId } = req.params;
    const alunos = await listarAlunosPorWorkshop(workshopId);
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar alunos do workshop" });
  }
}

export { inscreverAluno, listarAlunosPorWorkshopId };
