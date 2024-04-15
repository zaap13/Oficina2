import { criarNovoCoordenador } from "../services/coordenadorService,js";

async function criarCoordenador(req, res) {
  try {
    const coordenador = await criarNovoCoordenador(req.body);
    res.status(201).send(coordenador);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { criarCoordenador };