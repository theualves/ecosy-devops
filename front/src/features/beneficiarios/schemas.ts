import * as z from "zod";

const STATUS_VALUES = ["Ativo", "Pendente", "Inativo"] as const;

export const formSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  sobrenome: z.string().min(2, "Sobrenome é obrigatório"),
  cpf: z.string().min(11, "CPF incompleto"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().min(5, "Endereço é obrigatório"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  estado: z.string().length(2, "Use a sigla (ex: PE)"),
  cep: z.string().min(8, "CEP inválido"),
  associacao: z.string().optional(),
  tecnicoResponsavel: z.string().min(1, "Selecione um técnico"),
  status: z.string()
    .min(1, "Selecione um status") // Garante que não está vazio
    .refine((val) => STATUS_VALUES.includes(val as any), {
      message: "Selecione um status válido (Ativo, Pendente ou Inativo)",
    }),
});

// Tipo inferido do Zod
export type BeneficiarioFormData = z.infer<typeof formSchema>;