import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileForm } from "@/features/configuracoes/ProfileForm";

export default function ProfilePage() {
  return (
    <>
      <Header />

      <main className="flex flex-col min-h-[calc(100vh-80px)] p-4 md:p-8 pt-6 bg-[url('/images/bg-alternative2.svg')] bg-cover bg-center">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
          <Card className="border-none shadow-md flex-1">
            <CardContent className="p-8 md:p-12">
              <div className="mb-14">
                <h1 className="text-3xl font-heading font-semibold tracking-tight text-ecosy-blue">
                  Meu Perfil
                </h1>
              </div>
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
