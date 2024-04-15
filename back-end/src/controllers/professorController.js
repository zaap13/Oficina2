import { criarNovoProfessor } from "../services/professorService.js";

async function criarProfessor(req, res) {
  try {
    const professor = await criarNovoProfessor(req.body);
    res.status(201).send(professor);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { criarProfessor };
