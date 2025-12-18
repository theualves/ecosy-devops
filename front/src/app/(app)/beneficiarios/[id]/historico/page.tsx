// src/app/(app)/beneficiarios/[id]/historico/page.tsx
import { getBeneficiarioById } from "@/services/beneficiariosService";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// 1. CORREÇÃO NA INTERFACE (Promise)
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HistoricoPage({ params }: PageProps) {
  // 2. CORREÇÃO NO CODIGO (Await)
  const { id } = await params;
  
  const b = await getBeneficiarioById(id);
  
  if (!b) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-heading font-bold text-ecosy-blue mb-1">Sementes Recebidas por Safra</h2>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-ecosy-blue">Data</TableHead>
              <TableHead className="font-bold text-ecosy-blue">Semente</TableHead>
              <TableHead className="font-bold text-ecosy-blue">Lote</TableHead>
              <TableHead className="font-bold text-ecosy-blue">Qtd.</TableHead>
              <TableHead className="font-bold text-ecosy-blue">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {b.historico.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.data}</TableCell>
                <TableCell className="font-medium">{item.semente}</TableCell>
                <TableCell className="text-muted-foreground">{item.lote}</TableCell>
                <TableCell>{item.quantidade} kg</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none">
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}