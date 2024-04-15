import { criarNovoUsuario } from "../services/usuarioService.js";

async function criarUsuario(req, res) {
  try {
    const { nome, email } = req.body;
    const senha = await criarNovoUsuario({nome, email});
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", senha });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
  }

export { criarUsuario };
