import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadImageWithRetries(url, outputPath, retries = 5, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Tentativa ${attempt} de baixar a imagem...`);
      const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
        timeout: 10000, // Aumenta o tempo limite para 10 segundos
      });

      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    } catch (error) {
      if (attempt === retries) {
        console.error(`Falha ao baixar a imagem após ${retries} tentativas.`);
        throw error;
      }
      console.log(`Tentativa ${attempt} falhou. Tentando novamente em ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay)); // Espera antes de tentar novamente
    }
  }
}

async function gerarCertificadoPDF(workshop, aluno, professor) {
  try {
    const caminhoArquivo = path.join(
      __dirname,
      `certificado-${workshop._id}-${aluno._id}.pdf`
    );

    const doc = new PDFDocument({
      size: 'A4', // Tamanho do certificado
      margins: { top: 50, bottom: 50, left: 72, right: 72 }, // Margens
    });

    const stream = fs.createWriteStream(caminhoArquivo);
    doc.pipe(stream);

    // Cabeçalho do Certificado
    doc.fontSize(25).font("Helvetica-Bold").text("Certificado de Participação", { align: "center" });
    doc.moveDown(1.5);

    // Corpo do Certificado
    doc
      .fontSize(16)
      .font("Helvetica")
      .text(
        `Certificamos que ${aluno.nome} participou do workshop intitulado "${workshop.titulo}".`,
        { align: "center" }
      );
    doc.moveDown();

    // Descrição do Workshop
    doc
      .fontSize(12)
      .text(`Descrição: ${workshop.descricao}`, { align: "center" });
    
    // Data do Workshop formatada para PT-BR
    const dataFormatada = new Date(workshop.data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    doc
      .fontSize(12)
      .text(`Data do Workshop: ${dataFormatada}`, { align: "center" });

    doc.moveDown(2); // Espaçamento antes da assinatura

    // Download da Assinatura do Professor
    let assinaturaPath;

    if (professor.assinatura && professor.assinatura.startsWith("http")) {
      assinaturaPath = path.join(__dirname, `assinatura-${professor._id}.png`);
      try {
        await downloadImageWithRetries(professor.assinatura, assinaturaPath, 5, 2000);
      } catch (error) {
        console.error("Erro ao baixar a assinatura após várias tentativas.", error);
        throw new Error("Não foi possível baixar a assinatura do professor.");
      }
    }

    // Assinatura do Professor e Nome
    if (assinaturaPath) {
      doc
        .image(assinaturaPath, {
          fit: [150, 50],
          align: "center",
        })
        .moveDown();
    }

    doc
      .fontSize(12)
      .text(`Assinatura: ${professor.nome}`, { align: "center" });

    // Finaliza o documento
    doc.end();

    return new Promise((resolve, reject) => {
      stream.on("finish", () => {
        resolve(caminhoArquivo);
      });

      stream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error("Erro na geração do PDF:", error);
    throw error;
  }
}

export { gerarCertificadoPDF };
