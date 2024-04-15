import Coordenador from "../models/coordenadorModel";

async function criarCoordenador(data) {
  return await Coordenador.create(data);
}

export { criarCoordenador };
