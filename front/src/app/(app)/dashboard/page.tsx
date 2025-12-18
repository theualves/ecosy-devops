import { KpiCard } from "@/features/dashboard/KpiCard";
import { AlertBanner } from "@/features/dashboard/AlertBanner";
import { getGestorDashboardData } from "@/services/dashboardService";
import MapProviderWrapper from "@/features/dashboard/MapProviderWrapper";
import SeedsChart from "@/features/dashboard/SeedsChart";

import {
  BarChart2,
  History,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";

const iconMap = {
  Users: "/icons/users.svg",
  Truck: "/icons/truck.svg",
  Package: "/icons/seed.svg",
};

function GeoMapCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-ecosy-blue">
          Distribuição Geográfica
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <MapProviderWrapper />
      </CardContent>
    </Card>
  );
}

function ChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-ecosy-blue">
          Total Entregue por Semente (Kg)
        </CardTitle>
      </CardHeader>
      <CardContent className="h-80 w-full pl-0 p-4 pb-4">
        <SeedsChart />
      </CardContent>
    </Card>
  );
}

function RecentActivityFeed({ activities }: { activities: any[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-heading text-ecosy-blue">
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex">
            <History className="h-4 w-4 mr-3 mt-1" />
            <div>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: act.text }}
              />
              <p className="text-xs text-muted-foreground">{act.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
// --- Fim dos Componentes Mockados ---

export default async function DashboardPage() {
  // 1. A página (Server Component) busca os dados
  const { kpis, alerts, activities } = await getGestorDashboardData();

  return (
    <>
      <Header />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-[#F4F7F4]">
        <div className="px-6 w-full max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-heading font-medium tracking-tight mb-[28px]">
            Painel de Controle
          </h1>

          {/* Grid Layout para KPIs */}
          <div className="grid gap-8 md:grid-cols-3">
            {kpis.map((kpi) => (
              <KpiCard
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                icon={iconMap[kpi.iconName]} // Passa o componente do ícone
              />
            ))}
          </div>

          {/* Alert Banner */}
          <div className="py-2 my-[24px]">
            <AlertBanner alerts={alerts} />
          </div>

          {/* Main Content Grid (2 colunas) */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <div className="lg:col-span-4 space-y-4">
              <GeoMapCard />
              <ChartCard />
            </div>

            {/* Coluna da Direita (Atividades) */}
            <div className="lg:col-span-3">
              <RecentActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
