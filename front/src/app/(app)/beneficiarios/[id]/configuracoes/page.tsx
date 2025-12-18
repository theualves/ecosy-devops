"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { deleteBeneficiario } from "@/services/beneficiariosService";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// O Next.js 15 exige que params seja Promise, mas como é Client Component, 
// usamos o hook useParams() se precisarmos, ou recebemos via props desestruturada com 'use'
// Para simplificar no Client Component, vamos receber via props e tratar a Promise
import { use } from "react"; 

export default function ConfiguracoesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Desembrulha a promise do params (React 19/Next 15)
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    // Chama o Backend
    const success = await deleteBeneficiario(id);

    if (success) {
      // Redireciona para a lista geral
      alert("Beneficiário inativado com sucesso.");
      router.push("/beneficiarios");
      router.refresh(); // Atualiza a lista para sumir o item
    } else {
      alert("Erro ao excluir. Verifique se existem entregas pendentes.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-heading font-bold text-ecosy-blue mb-1">
          Configurações do Beneficiário
        </h2>
        <p className="text-sm text-muted-foreground">
          Gerencie o ciclo de vida e a remoção deste cadastro.
        </p>
      </div>
      <Separator />

      {/* ZONA DE PERIGO */}
      <div className="border border-red-200 rounded-lg bg-red-50 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-red-700 font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Zona de Perigo
            </h3>
            <p className="text-sm text-red-600/80 max-w-md">
              A exclusão deste beneficiário irá arquivá-lo como "Inativo". 
              O histórico de entregas será mantido para fins de auditoria, 
              mas ele não poderá receber novos lotes.
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isDeleting}>
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" /> Excluir Beneficiário
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação irá inativar o beneficiário no sistema. 
                  Ele não aparecerá mais na lista de ativos para distribuição.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Sim, inativar cadastro
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
        </div>
      </div>
    </div>
  );
}