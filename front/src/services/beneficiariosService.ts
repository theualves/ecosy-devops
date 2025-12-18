import { Beneficiario } from "@/types/Beneficiario";

// URL do seu Backend Spring Boot
const API_URL = "http://localhost:8080/api";

// --- TIPOS PARA OS DETALHES ---

export interface HistoricoEntrega {
  id: string;
  data: string;
  semente: string;
  lote: string;
  quantidade: number;
  status: "Entregue" | "Devolvido" | "Pendente";
}

export interface Observacao {
  id: string;
  data: string;
  tecnico: string;
  texto: string;
}

// Tipo completo para a tela de detalhes
export interface BeneficiarioDetalhado extends Beneficiario {
  telefone: string;
  endereco: string;
  cep: string;
  historico: HistoricoEntrega[];
  observacoes: Observacao[];
}

// --- FUNÇÃO 1: LISTAR TODOS (GET REAL) ---
export const getBeneficiarios = async (): Promise<Beneficiario[]> => {
  try {
    const response = await fetch(`${API_URL}/beneficiarios`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();

    return data.map((item: any) => ({
      id: item.id.toString(),
      nome: item.nome,
      cpf: item.cpf,
      cidade: item.endereco?.cidade || "N/A", // Pega do endereço aninhado
      associacao: item.associacao,
      tecnicoResponsavel: item.tecnicoResponsavel?.nome || "Sem técnico",
      status: item.status,
    }));
  } catch (error) {
    console.error("Erro ao buscar lista:", error);
    return [];
  }
};

// --- FUNÇÃO 2: OBTER DETALHES POR ID (GET REAL INTEGRADO) ---
export const getBeneficiarioById = async (id: string): Promise<BeneficiarioDetalhado | null> => {
  try {
    // 1. Buscamos as 3 informações em paralelo para ser rápido
    const [resBeneficiario, resEntregas, resObservacoes] = await Promise.all([
      fetch(`${API_URL}/beneficiarios/${id}`, { cache: "no-store" }),
      fetch(`${API_URL}/entregas/beneficiario/${id}`, { cache: "no-store" }),
      fetch(`${API_URL}/observacoes/beneficiario/${id}`, { cache: "no-store" })
    ]);

    // Se não achar o beneficiário, retorna null (404)
    if (!resBeneficiario.ok) return null;

    const bData = await resBeneficiario.json();
    const entregasData = resEntregas.ok ? await resEntregas.json() : [];
    const obsData = resObservacoes.ok ? await resObservacoes.json() : [];

    // 2. Mapeamento (Adapter) do JSON do Java para o formato do Front
    
    // Mapear Entregas
    const historicoMapeado: HistoricoEntrega[] = entregasData.map((e: any) => ({
      id: e.id.toString(),
      data: e.dataEntrega ? new Date(e.dataEntrega).toLocaleDateString('pt-BR') : "-", 
      semente: e.lote?.tipoSemente || "N/A",
      lote: e.lote?.codigo || "N/A",
      quantidade: e.qtdEntregue || 0,
      status: e.status === "PENDENTE" ? "Pendente" : "Entregue" // Traduzindo Enum
    }));

    // Mapear Observações
    const observacoesMapeadas: Observacao[] = obsData.map((o: any) => ({
      id: o.id.toString(),
      data: new Date(o.dataCriacao).toLocaleDateString('pt-BR'), // Formata data
      tecnico: o.tecnicoAutor?.nome || "Técnico",
      texto: o.texto
    }));

    // 3. Retorna o objeto completo
    return {
      id: bData.id.toString(),
      nome: bData.nome,
      cpf: bData.cpf,
      status: bData.status,
      cidade: bData.endereco?.cidade || "-",
      associacao: bData.associacao || "-",
      tecnicoResponsavel: bData.tecnicoResponsavel?.nome || "-",
      
      // Dados extras do detalhe
      telefone: bData.telefone || "-",
      endereco: bData.endereco?.rua || "-",
      cep: bData.endereco?.cep || "-",
      
      // Listas
      historico: historicoMapeado,
      observacoes: observacoesMapeadas
    };

  } catch (error) {
    console.error("Erro ao buscar detalhes:", error);
    return null;
  }
};

// --- FUNÇÃO 3: CRIAR (POST REAL) ---
export const createBeneficiario = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/beneficiarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erro ao criar");
    return await response.json();
  } catch (error) {
    console.error("Erro no create:", error);
    throw error;
  }
};

export const updateBeneficiario = async (id: string, data: any) => {
  try {
    const response = await fetch(`${API_URL}/beneficiarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erro ao atualizar");
    return await response.json();
  } catch (error) {
    console.error("Erro no update:", error);
    throw error;
  }
};

export const deleteBeneficiario = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/beneficiarios/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir beneficiário");
    }

    return true; // Sucesso (204 No Content)
  } catch (error) {
    console.error("Erro ao excluir:", error);
    return false;
  }
};