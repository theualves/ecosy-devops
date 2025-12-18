import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ReportItem } from "@/services/reportService";

export const generatePDF = (data: ReportItem[]) => {
  const doc = new jsPDF({ orientation: "portrait" });
  const logoPath = "/logoReport.png";
  const logoWidth = 30; 
  const logoHeight = 12 * (1 / 1);                    
  const logoX = 14;              
  const logoY = 8;

  const title = "Relatório Consolidado de Entregas - Ecosy";
  const subtitle = `Gerado em: ${new Date().toLocaleString("pt-BR")}`;

  doc.addImage(logoPath, "PNG", logoX, logoY, logoWidth, logoHeight);
  const textStartX = logoX + logoWidth + 5; 
  const textStartY = logoY + (logoHeight / 2) - 5;

  doc.setFontSize(18);
  doc.setTextColor("#16424A");
  doc.text(title, textStartX, textStartY); // Ajuste a posição X e Y

  doc.setFontSize(10);
  doc.setTextColor("#666666");
  doc.text(subtitle, textStartX, textStartY + 7);

  // 3. Configurar as Colunas da Tabela
  const tableColumn = [
    "Beneficiário",
    "Cidade",
    "Semente",
    "Qtd (kg)",
    "Data",
    "Técnico",
    "Status",
  ];

  // 4. Mapear os dados para o formato que o jspdf-autotable entende (array de arrays)
  const tableRows = data.map((item) => [
    item.beneficiario,
    item.cidade,
    item.semente,
    item.quantidade,
    item.data,
    item.tecnico,
    item.status,
  ]);

  autoTable(doc, {
    startY: 26, // Começa um pouco abaixo do título
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: "#3B7E55",
      textColor: "#FFFFFF", // Texto branco
      fontStyle: "bold",
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: "#F4F7F4", // Fundo cinza/verde claro alternado
    },
  });

  // 6. Salvar o arquivo (Download automático)
  doc.save("Relatorio_Ecosy_Entregas.pdf");
};