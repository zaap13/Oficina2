import request from "supertest";
import app from "../../src/app.js";
import conectarBanco from "../../src/database/db.js";
import { seedAdminUser } from "../seedData.js";
import Usuario from "../../src/models/usuarioModel.js";

beforeAll(async () => {
  await conectarBanco();
  await seedAdminUser();
});

afterEach(async () => {
  await Usuario.deleteOne({ email: "novo@example.com" });
});

describe("Testes do controlador de usuários", () => {
  it("Deve criar um novo usuário", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ email: "admin@admin.admin", senha: "admin" });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Novo Usuário",
        email: "novo@example.com",
        tipo: "admin",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "mensagem",
      "Usuário cadastrado com sucesso"
    );
  });
  it("Deve retornar um erro ao criar um usuário com tipo inválido", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ email: "admin@admin.admin", senha: "admin" });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Novo Usuário",
        email: "usuario_tipo_invalido@example.com",
        tipo: "tipo_invalido",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "mensagem",
      "Usuario validation failed: tipo: `tipo_invalido` is not a valid enum value for path `tipo`."
    );
  });

  it("Deve retornar um erro ao criar um usuário sem nome", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ email: "admin@admin.admin", senha: "admin" });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "usuario_sem_nome@example.com",
        tipo: "admin",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("mensagem", "Usuario validation failed: nome: Path `nome` is required.");
  });
});
