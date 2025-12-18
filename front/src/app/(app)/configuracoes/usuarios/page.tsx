import Link from "next/link";
import { Plus, Search} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { getUsers } from "@/services/userService";
import { UsersTable } from "@/features/configuracoes/UsersTable";

export default async function UsuariosPage() {
  const users = await getUsers();

  return (
    <>
      <Header />

      <main className="flex flex-col h-[calc(100vh-80px)] p-4 md:p-8 pt-6 bg-[url('/images/bg-alternative2.svg')] bg-cover bg-center">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">

          <Card className="border-none shadow-md flex-1 flex flex-col">
            <CardContent className="py-8 flex-1">

              <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <h1 className="text-3xl font-heading font-medium tracking-tight text-ecosy-blue">
                Gestão de Usuários
              </h1>
              <p className="text-sm font-sans mt-1 font-medium text-muted-foreground">
                Administre quem tem acesso ao sistema (Técnicos e Gestores).
              </p>
            </div>

            <Button className="font-medium bg-[#4FA26F] hover:bg-[#266940] text-white shadow-sm flex items-center">
              <Link href="/configuracoes/usuarios/novo" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                 Novo Usuário
              </Link>
            </Button>
          </div>
              
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-4 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    className="pl-4 bg-transparent rounded-3xl border-2 border-[#4FA26F] focus-visible:ring-0 focus-visible:border-[#4FA26F]"
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Total: <strong>{users.length}</strong> usuários
                </div>
              </div>

              <UsersTable data={users} />
              
            </CardContent>
          </Card>

        </div>
      </main>
    </>
  );
}