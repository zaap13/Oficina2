import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import conectarBanco from "./database/db.js";
import alunoRouter from "./routes/alunoRouter.js";
import professorRouter from "./routes/professorRouter.js";
import coordenadorRouter from "./routes/coordenadorRouter.js";
import usuarioRouter from "./routes/usuarioRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

conectarBanco();

app.use("/alunos", alunoRouter);
app.use("/professores", professorRouter);
app.use("/coordenadores", coordenadorRouter);
app.use("/usuarios", usuarioRouter);

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
