import { criarNovoAluno } from "../services/alunoService";

async function criarAluno(req, res) {
  try {
    const aluno = await criarNovoAluno(req.body);
    res.status(201).send(aluno);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { criarAluno };
