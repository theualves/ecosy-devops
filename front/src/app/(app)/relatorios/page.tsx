"use client"; // 1. Transformar em Client Component

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Calendar, Loader2 } from "lucide-react";

import { getRelatorioEntregas } from "@/services/reportService";
import { generatePDF } from "@/lib/pdfGenerator";

export default function RelatoriosPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);

    try {
      const data = await getRelatorioEntregas();

      generatePDF(data);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro ao gerar o relatório. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col h-[calc(100vh-80px)] p-4 md:p-4 pt-6 bg-[url('/images/bg-alternative2.svg')] bg-cover bg-center">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
          <Card className="shadow-md flex-1 flex flex-col overflow-hidden border border-[#9C9C9C]">
            <CardContent className="p-8 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-12 shrink-0">
                <div>
                  <h1 className="text-3xl font-heading font-medium tracking-tight text-ecosy-blue">
                    Relatórios e Auditoria
                  </h1>
                  <p className="text-sm font-sans mt-1 font-medium text-muted-foreground">
                    Gere relatórios detalhados para prestação de contas.
                  </p>
                </div>
              </div>
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-lg font-heading font-semibold text-ecosy-blue">
                    Configurar Novo Relatório
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border rounded-xl bg-gray-50/50">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ecosy-blue">
                      Tipo de Relatório
                    </label>
                    <Select defaultValue="entregas">
                      <SelectTrigger className="bg-white border-gray-300 h-[40px] rounded-lg">
                        <SelectValue placeholder="Selecione o tipo..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entregas">
                          Consolidado de Entregas
                        </SelectItem>
                        <SelectItem value="beneficiarios">
                          Lista de Beneficiários
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ecosy-blue">
                      Período
                    </label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-300 h-[40px] rounded-lg">
                        <SelectValue placeholder="Selecione o período..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safra_atual">
                          Safra Atual (2025)
                        </SelectItem>
                        <SelectItem value="30_dias">Últimos 30 Dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ecosy-blue">
                      Região / Cidade
                    </label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-300 h-[40px] rounded-lg">
                        <SelectValue placeholder="Todas as regiões" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas as Regiões</SelectItem>
                        <SelectItem value="garanhuns">Garanhuns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-3 flex justify-end gap-4 mt-2">
                    {/* BOTÃO DESATIVADO
                    <Button
                      variant="outline"
                      className="h-[48px] border-[#4FA26F] text-[#4FA26F] hover:bg-green-50 px-6"
                    >
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar
                      Planilha (.CSV)
                    </Button>
                    */}

                    <Button
                      onClick={handleGeneratePDF}
                      disabled={isGenerating}
                      className="h-[40px] bg-[#4FA26F] hover:bg-[#266940] px-8 text-white"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Gerando PDF...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Gerar Relatório PDF
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/*HISTÓRICO RECENTE (Visual Apenas) */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-lg font-heading font-semibold text-ecosy-blue">
                    Gerados Recentemente
                  </h2>
                </div>

                <div className="border rounded-xl overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-100 p-4 text-sm font-bold text-ecosy-blue border-b">
                    <div className="col-span-5">Nome do Arquivo</div>
                    <div className="col-span-3">Data de Geração</div>
                    <div className="col-span-2">Formato</div>
                    <div className="col-span-2 text-right">Ação</div>
                  </div>

                  {/* Item Mockado 1 */}
                  <div className="grid grid-cols-12 p-4 text-sm items-center hover:bg-gray-50 border-b last:border-0">
                    <div className="col-span-5 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                        PDF
                      </div>
                      Relatorio_Entregas_Setembro_2025.pdf
                    </div>
                    <div className="col-span-3 text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> 12/10/2025
                    </div>
                    <div className="col-span-2">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                        4.2 MB
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-ecosy-blue"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
