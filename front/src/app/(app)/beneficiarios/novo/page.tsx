import { Suspense } from "react"; // <--- 1. Importação Necessária
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { CreateBeneficiarioForm } from "@/features/beneficiarios/CreateBeneficiarioForm";

export default function NewBeneficiarioPage() {
  return (
    <>
      <Header />
      <main className="flex w-full h-[calc(100vh-80px)] items-center justify-center bg-[url('/images/bg-alternative1.svg')] bg-cover bg-center p-4">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
          {/* 2. Envolvendo o formulário com Suspense para o build passar */}
          <Suspense
            fallback={
              <div className="w-full text-center p-10 bg-white rounded-lg">
                Carregando formulário...
              </div>
            }
          >
            <CreateBeneficiarioForm />
          </Suspense>
        </div>
      </main>
    </>
  );
}
