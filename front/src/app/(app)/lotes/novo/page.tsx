import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { CreateLoteForm } from "@/features/lotes/CreateLoteForm";

export default function NewLotePage() {
  return (
    <>
      <Header />
      <main className="flex w-full h-[calc(100vh-80px)] items-center justify-center bg-[url('/images/login-bg.svg')] bg-cover bg-center p-4">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
          <CreateLoteForm />
        </div>
      </main>
    </>
  );
}
