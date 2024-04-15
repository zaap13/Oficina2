import Coordenador from "../models/coordenadorModel.js";

async function criarCoordenador(data) {
  return await Coordenador.create(data);
}

export { criarCoordenador };
