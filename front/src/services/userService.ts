import { Usuario } from "@/types/Usuario";

export const getUsers = async (): Promise<Usuario[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      nome: "Ana Cecília Lima",
      email: "ana.cecilia@ipa.pe.gov.br",
      cargo: "Gestor",
      status: "Ativo",
      ultimoAcesso: "Hoje, 09:15",
    },
    {
      id: "2",
      nome: "Jonas Pereira",
      email: "jonas.pereira@ipa.pe.gov.br",
      cargo: "Técnico",
      status: "Ativo",
      ultimoAcesso: "Ontem, 17:30",
    },
    {
      id: "3",
      nome: "Carla Medeiros",
      email: "carla.medeiros@ipa.pe.gov.br",
      cargo: "Técnico",
      status: "Ativo",
      ultimoAcesso: "10/10/2025",
    },
    {
      id: "4",
      nome: "Marcos Andrade",
      email: "marcos.andrade@ipa.pe.gov.br",
      cargo: "Técnico",
      status: "Inativo", 
      ultimoAcesso: "01/09/2025",
    },
  ];
};