"use client";

import { useState } from "react";
import { Eye, Loader2 } from "lucide-react"; 
import { Beneficiario, BeneficiarioStatus } from "@/types/Beneficiario";
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
import { getColorStatus, formatStatus } from "@/lib/beneficiarioUtils";

interface BeneficiariosTableProps {
  data: Beneficiario[];
}


export function BeneficiariosTable({ data }: BeneficiariosTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setLoadingId(id);
    router.push(`/beneficiarios/${id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-ecosy-blue">Nome Completo</TableHead>
            <TableHead className="font-bold text-ecosy-blue">CPF</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Cidade</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Associação</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Técnico</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Status</TableHead>
            <TableHead className="text-right font-bold text-ecosy-blue">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const isLoading = loadingId === item.id;

            return (
              <TableRow 
                key={item.id} 
                className="hover:bg-gray-50"
              >           
                <TableCell className="font-medium py-4">{item.nome}</TableCell>
                <TableCell className="py-4">{item.cpf}</TableCell>             
                <TableCell className="py-4">{item.cidade}</TableCell>              
                <TableCell className="text-muted-foreground py-4">{item.associacao}</TableCell>            
                <TableCell className="py-4">{item.tecnicoResponsavel}</TableCell>               
                <TableCell className="py-4">
                  <Badge className={`${getColorStatus(item.status)} text-black border-none`}>
                    {formatStatus(item.status)}
                  </Badge>
                </TableCell>
                
                <TableCell className="text-right py-4">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isLoading}
                      className="text-[#4FA26F] cursor-pointer hover:text-white hover:bg-[#4FA26F] font-medium border border-[#4FA26F] min-w-[110px]"
                      onClick={() => handleRowClick(item.id)}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Aguarde...
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Ver Perfil
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