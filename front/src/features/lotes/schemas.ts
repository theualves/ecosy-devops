import * as z from "zod";

const SEMENTES = ["Milho Crioulo", "Feijão", "Sorgo", "Fava", "Jerimum"] as const;
const STATUS = ["Planejamento", "Em Distribuição", "Concluído"] as const;

export const loteFormSchema = z.object({
  semente: z.string().min(1, "Selecione o tipo de semente"),
  codigo: z.string().min(3, "O código deve ter pelo menos 3 caracteres"),
  // Coerce transforma a string do input em número automaticamente
  quantidade: z.coerce.number().min(1, "A quantidade deve ser maior que 0"),
  origem: z.string().min(3, "Informe de onde veio a semente"),
  dataAquisicao: z.string().min(1, "Selecione a data de aquisição"),
  status: z.string().min(1, "Selecione o status inicial"),
  observacoes: z.string().optional(),
});

export type LoteFormData = z.infer<typeof loteFormSchema>;