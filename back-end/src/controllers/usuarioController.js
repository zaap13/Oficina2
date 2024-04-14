import { criarNovoUsuario } from "../services/usuarioService";

async function criarUsuario(req, res) {
  try {
    const usuario = await criarNovoUsuario(req.body);
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { criarUsuario };
