import { realizarLogin } from "../services/loginService.js";

async function postLogin(req, res) {
  try {
    const { email, senha } = req.body;
    const token = await realizarLogin({ email, senha });
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
}

export { postLogin };
