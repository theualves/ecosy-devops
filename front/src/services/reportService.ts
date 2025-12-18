// Dados que vão para o relatório
export interface ReportItem {
  id: string;
  beneficiario: string;
  cidade: string;
  semente: string;
  quantidade: number;
  data: string;
  tecnico: string;
  status: string;
}

export const getRelatorioEntregas = async (): Promise<ReportItem[]> => {
  // Simula um delay de "processamento"
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Retorna 15 itens simulados
  return [
    { id: "1", beneficiario: "Maria Lúcia dos Santos", cidade: "Garanhuns", semente: "Feijão", quantidade: 5, data: "12/10/2025", tecnico: "Jonas Pereira", status: "Entregue" },
    { id: "2", beneficiario: "José Cícero Almeida", cidade: "Garanhuns", semente: "Milho Crioulo", quantidade: 10, data: "12/10/2025", tecnico: "Jonas Pereira", status: "Entregue" },
    { id: "3", beneficiario: "Antônia da Silva", cidade: "Sertânia", semente: "Sorgo", quantidade: 5, data: "11/10/2025", tecnico: "Carla Medeiros", status: "Pendente" },
    { id: "4", beneficiario: "João Batista", cidade: "Ouricuri", semente: "Feijão", quantidade: 5, data: "10/10/2025", tecnico: "Marcos Andrade", status: "Entregue" },
    { id: "5", beneficiario: "Pedro Costa", cidade: "Garanhuns", semente: "Fava", quantidade: 2, data: "09/10/2025", tecnico: "Jonas Pereira", status: "Entregue" },
    { id: "6", beneficiario: "Ana Maria Souza", cidade: "Sertânia", semente: "Milho Crioulo", quantidade: 10, data: "08/10/2025", tecnico: "Carla Medeiros", status: "Entregue" },
    { id: "7", beneficiario: "Carlos Oliveira", cidade: "Garanhuns", semente: "Feijão", quantidade: 5, data: "08/10/2025", tecnico: "Jonas Pereira", status: "Cancelado" },
    { id: "8", beneficiario: "Fernanda Lima", cidade: "Ouricuri", semente: "Sorgo", quantidade: 8, data: "07/10/2025", tecnico: "Marcos Andrade", status: "Entregue" },
    { id: "9", beneficiario: "Ricardo Alves", cidade: "Garanhuns", semente: "Feijão", quantidade: 5, data: "06/10/2025", tecnico: "Jonas Pereira", status: "Entregue" },
    { id: "10", beneficiario: "Juliana Santos", cidade: "Sertânia", semente: "Milho Crioulo", quantidade: 10, data: "05/10/2025", tecnico: "Carla Medeiros", status: "Pendente" },
    { id: "11", beneficiario: "Roberto Gomes", cidade: "Ouricuri", semente: "Jerimum", quantidade: 3, data: "05/10/2025", tecnico: "Marcos Andrade", status: "Entregue" },
    { id: "12", beneficiario: "Amanda Silva", cidade: "Garanhuns", semente: "Feijão", quantidade: 5, data: "04/10/2025", tecnico: "Jonas Pereira", status: "Entregue" },
    { id: "13", beneficiario: "Lucas Pereira", cidade: "Sertânia", semente: "Sorgo", quantidade: 5, data: "03/10/2025", tecnico: "Carla Medeiros", status: "Entregue" },
    { id: "14", beneficiario: "Beatriz Costa", cidade: "Garanhuns", semente: "Milho Crioulo", quantidade: 10, data: "02/10/2025", tecnico: "Jonas Pereira", status: "Entregue" },
    { id: "15", beneficiario: "Gabriel Rocha", cidade: "Ouricuri", semente: "Fava", quantidade: 2, data: "01/10/2025", tecnico: "Marcos Andrade", status: "Entregue" },
  ];
};