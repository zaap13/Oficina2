import request from "supertest";
import app from "../../src/app.js";
import conectarBanco from "../../src/database/db";
import { seedAdminUser } from "../seedData";

beforeAll(async () => {
  await conectarBanco(); 
  await seedAdminUser();
});

describe("Teste de login", () => {
  it("Deve retornar um token JWT válido ao realizar o login", async () => {
    const credenciais = {
      email: "admin@admin.admin",
      senha: "admin",
    };

    const response = await request(app).post("/login").send(credenciais);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
