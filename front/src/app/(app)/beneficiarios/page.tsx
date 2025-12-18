import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Imports Específicos desta tela
import { getBeneficiarios } from "@/services/beneficiariosService";
import { BeneficiariosTable } from "@/features/beneficiarios/BeneficiariosTable";

export default async function BeneficiariosPage() {
  const beneficiarios = await getBeneficiarios();

  return (
    <>
      <Header />
      <main className="flex flex-col h-[calc(100vh-80px)] p-4 md:p-4 pt-6 bg-[url('/images/bg-alternative1.svg')] bg-cover bg-center">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
          <Card className="border-none shadow-md flex-1 flex flex-col">
            <CardContent className="py-8 flex-1">
               <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-medium tracking-tight text-ecosy-blue">
                Beneficiários
              </h1>
              <p className="text-sm font-sans mt-1 font-medium text-muted-foreground">
                Gerencie o cadastro dos agricultores familiares.
              </p>
            </div>

            <Button className="font-medium bg-[#4FA26F] hover:bg-[#266940] text-white shadow-sm flex items-center">
              <Link
                href="/beneficiarios/novo"
                className="flex items-center cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                Cadastrar Beneficiário
              </Link>
            </Button>
          </div>
              {/* Área de Filtros */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 flex-1 w-full">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute right-4 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome, CPF ou cidade..."
                      className="pl-4 bg-transparent rounded-3xl border-2 border-[#4FA26F] focus-visible:ring-0 focus-visible:border-[#4FA26F]"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap ml-2">
                    Total: <strong>{beneficiarios.length}</strong> agricultores
                  </div>
                </div>

                {/* Botões de Filtro (Dropdowns) */}
                <div className="flex items-center gap-3">
                  {/* Filtro de Status */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="font-medium text-black border-[#DEDEDE] hover:bg-[#F4F7F4]"
                      >
                        Status
                        <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Todos</DropdownMenuItem>
                      <DropdownMenuItem>Ativo</DropdownMenuItem>
                      <DropdownMenuItem>Pendente</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Inativo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Filtro de Cidade (Novo nesta tela) */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="font-medium text-black border-[#DEDEDE] hover:bg-[#F4F7F4]"
                      >
                        Cidade
                        <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filtrar por Cidade</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Todas</DropdownMenuItem>
                      <DropdownMenuItem>Garanhuns</DropdownMenuItem>
                      <DropdownMenuItem>Sertânia</DropdownMenuItem>
                      <DropdownMenuItem>Ouricuri</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* 3. A Tabela */}
              <BeneficiariosTable data={beneficiarios} />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
