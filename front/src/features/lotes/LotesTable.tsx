"use client";

import { useState } from "react";
import { Eye, Loader2, Truck } from "lucide-react";
import { Lote, LoteStatus } from "@/types/Lote";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LotesTableProps {
  data: Lote[];
}

const getStatusColor = (status: LoteStatus) => {
  switch (status) {
    case "Planejamento":
      return "bg-[#DEDEDE]";
    case "Em Distribuição":
      return "bg-[#AEDDFF]";
    case "Concluído":
      return "bg-[#EEFFAE]";
    case "Cancelado":
      return "bg-[#FFAEAE]";
    default:
      return "bg-gray-500";
  }
};

export function LotesTable({ data }: LotesTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setLoadingId(id); 
    router.push(`/lotes/${id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-ecosy-blue">Código</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Semente</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Origem</TableHead>
            <TableHead className="font-bold text-ecosy-blue text-right">Qtd. (kg)</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Cadastro</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Status</TableHead>
            <TableHead className="text-right font-bold text-ecosy-blue">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((lote) => {
            const isLoading = loadingId === lote.id;

            return (
              <TableRow
                key={lote.id}
                className="hover:bg-gray-50"
              >
                <TableCell className="font-medium py-4">{lote.codigo}</TableCell>
                <TableCell className="py-4">{lote.semente}</TableCell>
                <TableCell className="py-4">{lote.origem}</TableCell>
                <TableCell className="text-right py-4">
                  {lote.quantidade.toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="py-4">{lote.dataCadastro}</TableCell>
                <TableCell className="py-4">
                  <Badge
                    className={`${getStatusColor(lote.status)} text-[#2F2F2F] border-none`}
                  >
                    {lote.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
                  
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isLoading}
                      className="text-[#4FA26F] cursor-pointer  hover:text-white hover:bg-[#4FA26F] font-medium border border-[#4FA26F] min-w-[130px]"
                      onClick={() => handleRowClick(lote.id)}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Aguarde...
                        </>
                      ) : (
                        <>
                          {lote.status === "Em Distribuição" ? (
                             <Truck className="w-4 h-4 mr-2" />
                          ) : (
                             <Eye className="w-4 h-4 mr-2" />
                          )}
                          Ver Detalhes
                        </>
                      )}
                    </Button>
                  </div>
                  
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}