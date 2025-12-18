export type BeneficiarioStatus = "ATIVO" | "INATIVO" | "PENDENTE";

export interface Beneficiario {
  id: string;
  nome: string;
  cpf: string; 
  cidade: string;
  associacao: string;
  tecnicoResponsavel: string;
  status: BeneficiarioStatus;
}