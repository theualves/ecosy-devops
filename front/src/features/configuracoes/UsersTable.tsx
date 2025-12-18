"use client";

import { Edit, Trash2, Shield, User } from "lucide-react";
import { Usuario } from "@/types/Usuario";
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

interface UsersTableProps {
  data: Usuario[];
}

export function UsersTable({ data }: UsersTableProps) {
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-ecosy-blue">Nome</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Email (Login)</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Cargo</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Status</TableHead>
            <TableHead className="font-bold text-ecosy-blue">Último Acesso</TableHead>
            <TableHead className="text-right font-bold text-ecosy-blue">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50">
              
              {/* Nome com Avatar Simples (Ícone) */}
              <TableCell className="py-4 font-medium flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-ecosy-blue">
                   <User className="w-4 h-4" />
                </div>
                {user.nome}
              </TableCell>
              
              <TableCell className="py-4 text-muted-foreground">{user.email}</TableCell>
              
              <TableCell className="py-4">
                <div className="flex items-center gap-2">
                  {user.cargo === "Gestor" && <Shield className="w-3 h-3 text-ecosy-green" />}
                  {user.cargo}
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <Badge 
                  className={`${
                    user.status === "Ativo" 
                      ? "bg-[#D3EB76] hover:bg-[#c4db6e]" 
                      : "bg-[#FB5555] hover:bg-[#e04d4d] text-white"
                  } text-black border-none`}
                >
                  {user.status}
                </Badge>
              </TableCell>
              
              <TableCell className="py-4 text-sm text-gray-500">
                {user.ultimoAcesso}
              </TableCell>
              
              <TableCell className="text-right py-4">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-ecosy-blue hover:text-ecosy-green hover:bg-green-50"
                    title="Editar Usuário"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  {/* Botão de Excluir/Desativar */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                    title="Desativar Usuário"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}