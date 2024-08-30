import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

async function gerarCertificadoPDF(workshop, aluno) {
  const doc = new PDFDocument();
  const caminhoArquivo = path.join(__dirname, `certificado-${workshop._id}.pdf`);
  
  doc.pipe(fs.createWriteStream(caminhoArquivo));
  
  doc.fontSize(25).text("Certificado de Participação", { align: 'center' });
  doc.moveDown();
  
  doc.fontSize(15).text(`Certificamos que ${aluno.nome} participou do workshop "${workshop.titulo}".`);
  doc.moveDown();
  
  doc.text(`Descrição: ${workshop.descricao}`);
  doc.text(`Data: ${workshop.data.toDateString()}`);
  
  if (workshop.assinaturaProfessor) {
    doc.moveDown();
    doc.text(`Assinatura: ${workshop.assinaturaProfessor}`);
  }

  doc.end();

  return caminhoArquivo;
}

export { gerarCertificadoPDF };
