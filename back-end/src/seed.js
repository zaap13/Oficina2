import conectarBanco from "./database/db.js";
import Usuario from "./models/usuarioModel.js";
import Workshop from "./models/workshopModel.js";
import bcrypt from "bcrypt";

async function seedUsersAndWorkshops() {
  try {
    await conectarBanco();

    const adminExiste = await Usuario.findOne({ email: "admin@admin.admin" });
    if (adminExiste) {
      console.log("Usuário admin já existe no banco de dados.");
    } else {
      const hashedSenhaAdmin = await bcrypt.hash("admin", 10);
      await Usuario.create({
        nome: "Admin",
        senha: hashedSenhaAdmin,
        tipo: "admin",
        email: "admin@admin.admin",
      });
      console.log("Usuário admin criado com sucesso.");
    }

    const alunoExiste = await Usuario.findOne({ email: "aluno@aluno.aluno" });
    if (alunoExiste) {
      console.log("Usuário aluno já existe no banco de dados.");
    } else {
      const hashedSenhaAluno = await bcrypt.hash("aluno", 10);
      await Usuario.create({
        nome: "Aluno",
        senha: hashedSenhaAluno,
        tipo: "aluno",
        email: "aluno@aluno.aluno",
      });
      console.log("Usuário aluno criado com sucesso.");
    }

    const workshopsExistentes = await Workshop.find();
    if (workshopsExistentes.length > 0) {
      console.log("Workshops já existem no banco de dados.");
    } else {
      const workshops = [
        {
          titulo: "Workshop de JavaScript",
          descricao: "Aprenda JavaScript do zero ao avançado.",
          data: new Date("2024-09-01"),
          vagas: 20,
        },
        {
          titulo: "Workshop de React",
          descricao: "Domine React e crie aplicações modernas.",
          data: new Date("2024-10-01"),
          vagas: 15,
        },
        {
          titulo: "Workshop de Node.js",
          descricao: "Desenvolva back-ends robustos com Node.js.",
          data: new Date("2024-11-01"),
          vagas: 25,
        },
      ];

      await Workshop.insertMany(workshops);
      console.log("Workshops criados com sucesso.");
    }

  } catch (error) {
    console.error("Erro ao criar usuários e workshops:", error);
  }
}

seedUsersAndWorkshops();
