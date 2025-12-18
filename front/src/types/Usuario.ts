export type UserRole = "Gestor" | "Técnico";
export type UserStatus = "Ativo" | "Inativo";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: UserRole;
  status: UserStatus;
  ultimoAcesso?: string;
}