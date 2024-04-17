import conectarBanco from "./database/db.js";
import Usuario from "./models/usuarioModel.js";
import bcrypt from "bcrypt";

async function seedAdminUser() {
  try {
    await conectarBanco();

    const adminExiste = await Usuario.findOne({ email: "admin@admin.admin" });
    if (adminExiste) {
      console.log("Usuário admin já existe no banco de dados.");
      return;
    }

    const hashedSenha = await bcrypt.hash("admin", 10);

    await Usuario.create({
      nome: "Admin",
      senha: hashedSenha,
      tipo: "admin",
      email: "admin@admin.admin",
    });

    console.log("Usuário admin criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar usuário admin:", error);
  }
}

seedAdminUser();
