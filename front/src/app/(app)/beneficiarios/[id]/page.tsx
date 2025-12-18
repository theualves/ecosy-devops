// src/app/(app)/beneficiarios/[id]/page.tsx

import { getBeneficiarioById } from "@/services/beneficiariosService";
import { BeneficiarioEditableForm } from "@/features/beneficiarios/BeneficiarioEditableForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DadosCadastraisPage({ params }: PageProps) {
  const { id } = await params;
  
  // 1. Busca os dados no servidor (Server Side)
  const b = await getBeneficiarioById(id);
  
  if (!b) return null;

  // 2. Passa os dados para o Componente Cliente que gerencia a Edição
  return <BeneficiarioEditableForm beneficiario={b} />;
}