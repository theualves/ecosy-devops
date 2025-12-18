import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileSidebar } from "@/features/beneficiarios/ProfileSidebar";
import { getBeneficiarioById } from "@/services/beneficiariosService";
import { BeneficiarioStatus } from "@/types/Beneficiario";
import { getColorStatus, formatStatus } from "@/lib/beneficiarioUtils";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}



export default async function BeneficiarioLayout({
  children,
  params,
}: LayoutProps) {
  const { id } = await params;
  const beneficiario = await getBeneficiarioById(id);

  if (!beneficiario) return <div>Beneficiário não encontrado</div>;

  return (
    <>
      <Header />
      
      {/* MELHORIA 1: Altura calculada. 
         Adicionei 'py-6' e 'px-4' para criar uma margem de respiro ao redor do card.
         Isso evita que o card cole no Header ou nas bordas laterais.
      */}
      <main className="flex flex-col h-[calc(100vh-80px)] bg-[#F4F7F4] py-6 px-4">
        
        {/* MELHORIA 2: Alinhamento com o Header.
           Adicionei 'max-w-[1200px] mx-auto'. 
           Agora a Sidebar começa exatamente na mesma linha vertical da sua Logo.
        */}
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1 h-full">
          
          {/* MELHORIA 3: Acabamento do Card.
             - 'rounded-xl': Cantos mais suaves.
             - 'overflow-hidden': Garante que a sidebar não "vaze" os cantos arredondados.
             - 'border': Uma borda sutil para destacar do fundo cinza.
          */}
          <Card className="border shadow-sm flex-1 flex flex-col overflow-hidden rounded-xl bg-white">
            <CardContent className="p-0 flex flex-1 h-full">
              
              {/* SIDEBAR */}
              <aside className="w-64 border-r bg-[#F8F9FA] p-6 hidden md:block shrink-0">
                <ProfileSidebar beneficiarioId={id} />
              </aside>

              {/* CONTEÚDO */}
              <div className="flex-1 flex flex-col h-full bg-white min-w-0">
                <div className="p-8 border-b bg-white">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      asChild 
                      className="hover:bg-gray-100 rounded-full -ml-2" 
                    >
                      <Link href="/beneficiarios">
                        <ArrowLeft className="h-6 w-6 text-ecosy-blue" />
                      </Link>
                    </Button>
                    
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-heading font-bold truncate">
                        {beneficiario.nome}
                      </h1>
                      <Badge className={`${getColorStatus(beneficiario.status)} text-black border-none shadow-none text-sm px-3 py-1 shrink-0`}>
                        {formatStatus(beneficiario.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto">
                   <div className="max-w-3xl">
                      {children}
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