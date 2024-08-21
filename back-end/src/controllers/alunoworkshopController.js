import { inscreverAlunoNoWorkshop } from "../services/inscricoesService.js";

async function inscreverAluno(req, res) {
  try {
    const alunoId = req.usuario.id;
    const { workshopId } = req.params;
    console.log("Dados recebidos para inscrição:", { alunoId, workshopId }); // Log para depuração

    if (!alunoId || !workshopId) {
      throw new Error("Dados ausentes: alunoId ou workshopId");
    }

    const inscricao = await inscreverAlunoNoWorkshop({ alunoId, workshopId });
    res.status(201).json({ mensagem: "Aluno inscrito com sucesso", inscricao });
  } catch (error) {
    console.error("Erro no processo de inscrição:", error.message); // Log de erro para depuração
    res.status(400).json({ mensagem: error.message });
  }
}

async function listarAlunosPorWorkshopId(req, res) {
  try {
    const { workshopId } = req.params;
    const alunos = await listarAlunosPorWorkshopId(workshopId);
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar alunos do workshop" });
  }
}

export { inscreverAluno, listarAlunosPorWorkshopId };
