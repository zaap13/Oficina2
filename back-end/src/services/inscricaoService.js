import Workshop from "../models/workshopModel.js";
import {
  buscarInscricaoPorAlunoEWorkshop,
  inscreverAluno,
  desinscreverAluno,
  listarAlunosPorWorkshop,
} from "../repositories/inscricaoRepository.js";

async function inscreverAlunoNoWorkshop({ alunoId, workshopId }) {
  const inscricaoExistente = await buscarInscricaoPorAlunoEWorkshop(
    alunoId,
    workshopId
  );
  if (inscricaoExistente) {
    throw new Error("Aluno já está inscrito neste workshop");
  }
  return await inscreverAluno({ alunoId, workshopId });
}

async function desinscreverAlunoNoWorkshop({ alunoId, workshopId }) {
  const inscricaoExistente = await buscarInscricaoPorAlunoEWorkshop(
    alunoId,
    workshopId
  );
  if (!inscricaoExistente) {
    throw new Error("Aluno não está inscrito neste workshop");
  }
  return await desinscreverAluno({ alunoId, workshopId });
}

async function listarAlunosPorWorkshopService(workshopId) {
  return await listarAlunosPorWorkshop(workshopId);
}

async function gerarCertificadoService(workshopId, alunoId) {
  const workshop = await Workshop.findById(workshopId);
  if (!workshop) {
    throw new Error("Workshop não encontrado");
  }

  const alunoIndex = workshop.alunosInscritos.findIndex(
    (inscrito) => inscrito.aluno.toString() === alunoId
  );

  if (alunoIndex === -1) {
    throw new Error("Aluno não encontrado no workshop");
  }

  workshop.alunosInscritos[alunoIndex].certificadoGerado = true;
  await workshop.save();
}

async function marcarFaltaService(workshopId, alunoId) {
  const workshop = await Workshop.findById(workshopId);
  if (!workshop) {
    throw new Error("Workshop não encontrado");
  }

  const alunoInscrito = workshop.alunosInscritos.find(
    (inscricao) => inscricao.aluno.toString() === alunoId
  );

  if (!alunoInscrito) {
    throw new Error("Aluno não inscrito");
  }

  alunoInscrito.marcadoFalta = true;
  await workshop.save();
}

export {
  inscreverAlunoNoWorkshop,
  desinscreverAlunoNoWorkshop,
  listarAlunosPorWorkshopService,
  marcarFaltaService
};
