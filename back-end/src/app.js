import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import conectarBanco from "./database/db.js";
import usuarioRouter from "./routers/usuarioRouter.js";
import loginRouter from "./routers/loginRouter.js";
import workshopRouter from "./routers/workshopRouter.js";
import certificadoRouter from "./routers/certificadoRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

conectarBanco();

app.use("/usuarios", usuarioRouter);
app.use("/login", loginRouter);
app.use("/workshops", workshopRouter);
app.use("/certificado", certificadoRouter);

app.get("/health", (_req, res) => res.send("OK!"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Servidor rodando na porta 4000"));
export default app;
