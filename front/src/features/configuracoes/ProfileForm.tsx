"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Digite sua senha atual"),
  newPassword: z.string().min(6, "A nova senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme a nova senha"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof passwordSchema>;

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    name: "Ana Cecília Lima",
    email: "ana.cecilia@ipa.pe.gov.br",
    role: "Gestor Administrativo",
  };

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("TROCAR SENHA:", data);
    alert("Senha atualizada com sucesso!");
    setIsLoading(false);
    form.reset();
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b">
                <h3 className="text-xl font-bold text-ecosy-blue">Dados da Conta</h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ecosy-blue">
                    Nome Completo
                  </label>
                  <Input 
                    readOnly 
                    value={user.name} 
                    className="bg-[#CCCCCC] cursor-not-allowed border-[#EDEDED]" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ecosy-blue">
                    Email Corporativo
                  </label>
                  <Input 
                    readOnly 
                    value={user.email} 
                    className="bg-[#CCCCCC] cursor-not-allowed border-[#EDEDED]" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ecosy-blue">
                    Cargo / Permissão
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-[#CCCCCC] border border-[#EDEDED] rounded-md text-sm">
                     <span className="font-medium">{user.role}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-xs text-muted-foreground italic">
                    * Para alterar seus dados cadastrais, entre em contato com o administrador do sistema.
                  </p>
                </div>
              </div>
            </div>

            {/* COLUNA 2: SEGURANÇA (Alterar Senha) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b">
                <h3 className="text-lg font-bold text-ecosy-blue">Segurança</h3>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ecosy-blue font-semibold">Senha Atual</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="my-2 bg-transparent" /> {/* Espaço invisível */}

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ecosy-blue font-semibold">Nova Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ecosy-blue font-semibold">Confirmar Nova Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#4FA26F] hover:bg-[#266940] text-white font-semibold h-10"
                  >
                    {isLoading ? "Salvando..." : "Salvar Nova Senha"}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </form>
      </Form>
    </div>
  );
}