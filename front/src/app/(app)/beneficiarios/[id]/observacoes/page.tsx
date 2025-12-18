import { getBeneficiarioById } from "@/services/beneficiariosService";
import { Separator } from "@/components/ui/separator";
import { CalendarClock } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ObservacoesPage({ params }: PageProps) {
  const { id } = await params;
  const b = await getBeneficiarioById(id);
  
  if (!b) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-heading font-bold text-ecosy-blue mb-1">
          Anotações e Visitas Técnicas
        </h2>
      </div>

      <div className="">
        {b.observacoes.map((obs, index) => (
          <div key={obs.id}>
            <div className="flex gap-4 py-8">
              
              <div className="flex-1 px-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-ecosy-blue text-lg">
                    {obs.tecnico}
                  </span>
                  
                  <span className="text-gray-300 font-light">|</span> 

                  <div className="flex items-center gap-1.5 text-sm text-[#595959]">
                    <span>{obs.data}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 max-w-[600px] leading-relaxed">
                  {obs.texto}
                </p>
              </div>
            </div>

            {index < b.observacoes.length - 1 && (
              <Separator className="bg-gray-200" />
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}