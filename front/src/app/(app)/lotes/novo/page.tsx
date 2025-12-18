import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { CreateLoteForm } from "@/features/lotes/CreateLoteForm";
import { Suspense } from "react";

export default function NewLotePage() {
  return (
    <>
      <Header />
      <main className="flex w-full h-[calc(100vh-80px)] items-center justify-center bg-[url('/images/login-bg.svg')] bg-cover bg-center p-4">
        <Suspense
          fallback={
            <div className="w-full text-center p-10 bg-white rounded-lg">
              Carregando formulário...
            </div>
          }
        >
          <CreateLoteForm />
        </Suspense>
      </main>
    </>
  );
}
