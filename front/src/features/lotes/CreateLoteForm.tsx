"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Importe Textarea se tiver, senão use Input
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { loteFormSchema, LoteFormData } from "./schemas";
// import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: 1,
    label: "Dados do Lote",
    fields: ["semente", "codigo", "quantidade"],
  },
  { id: 2, label: "Origem e Data", fields: ["origem", "dataAquisicao"] },
  { id: 3, label: "Finalização", fields: ["status", "observacoes"] },
];

export function CreateLoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("etapa")) || 1;

  const form = useForm({
    resolver: zodResolver(loteFormSchema),
    mode: "onChange",
    defaultValues: {
      status: "Planejamento",
      quantidade: 0,
      semente: "",
      codigo: "",
      origem: "",
      dataAquisicao: "",
      observacoes: "",
    },
  });

  const nextStep = async () => {
    const stepConfig = STEPS.find((s) => s.id === currentStep);
    const isValid = await form.trigger(stepConfig?.fields as any);
    if (isValid) {
      router.push(`?etapa=${currentStep + 1}`);
    }
  };

  const prevStep = () => {
    router.back();
  };

  const onSubmit = (data: LoteFormData) => {
    console.log("LOTE CRIADO:", data);
    alert("Lote cadastrado com sucesso!");
    router.push("/lotes");
  };

  return (
    <Card className="w-full max-w-[600px] mx-auto border-none shadow-md mt-6 h-[680px] relative flex flex-col">
      <CardHeader className="pt-[40px] px-[60px]">
        <Button
          variant="ghost"
          size="icon"
          asChild
          onClick={prevStep}
          className="hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="cursor-pointer p-2 text-ecosy-blue" />
        </Button>

        <CardTitle className="text-2xl font-heading font-bold text-[#16424A]">
          Registrar Novo Lote
        </CardTitle>
        <CardDescription>Passo {currentStep} de 3</CardDescription>
      </CardHeader>

      <CardContent className="py-[20px] px-[60px] pb-[60px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <FormField
                  control={form.control}
                  name="semente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Tipo de Semente</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Milho Crioulo">
                            Milho Crioulo
                          </SelectItem>
                          <SelectItem value="Feijão">Feijão</SelectItem>
                          <SelectItem value="Sorgo">Sorgo</SelectItem>
                          <SelectItem value="Fava">Fava</SelectItem>
                          <SelectItem value="Jerimum">Jerimum</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="codigo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código do Lote</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: FJN-25.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="500"
                          {...field}
                          // Correção do number value
                          value={(field.value as number) ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* ETAPA 2: ORIGEM E DATA */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <FormField
                  control={form.control}
                  name="origem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origem / Fornecedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Banco de Sementes de Sertânia"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataAquisicao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Aquisição</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Inicial</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Planejamento">
                            Planejamento
                          </SelectItem>
                          <SelectItem value="Em Distribuição">
                            Em Distribuição
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Alguma nota sobre este lote..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* --- RODAPÉ DE NAVEGAÇÃO --- */}
            <div className="absolute bottom-[40px] left-[60px] right-[60px] flex justify-between pt-6 mt-8 gap-4">
              {currentStep < 3 ? (
                <Button
                  variant="greenCustom"
                  type="button"
                  onClick={nextStep}
                  className="w-full hover:bg-[#407554]"
                >
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="greenCustom"
                  type="submit"
                  className="w-full hover:bg-[#407554]"
                >
                  <Save className="mr-2 h-4 w-4" /> Criar Lote
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
