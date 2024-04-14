import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import conectarBanco from "./database/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

conectarBanco();

app.use("/alunos", alunoRouter);

app.post("/professores", async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).send(professor);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/coordenadores", async (req, res) => {
  try {
    const coordenador = new Coordenador(req.body);
    await coordenador.save();
    res.status(201).send(coordenador);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  const { nomeUsuario, senha } = req.body;
  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ nomeUsuario, senha });
    if (!usuario) {
      return res
        .status(401)
        .json({ mensagem: "Nome de usuário ou senha incorretos." });
    }
    const token = jwt.sign(
      { nomeUsuario: usuario.nomeUsuario, tipo: usuario.tipo },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ mensagem: "Token de autenticação não fornecido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ mensagem: "Token de autenticação inválido." });
    }
    req.usuario = decoded;
    next();
  });
}

app.get("/health", (_req, res) => res.send("OK!"));
app.get("/recurso-protegido", verificarToken, (req, res) => {
  res.json({
    mensagem:
      "Este recurso está protegido. Apenas usuários autenticados podem acessá-lo.",
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Servidor rodando na porta 4000"));
