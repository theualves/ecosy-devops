"use client";

import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 
import { login } from "@/services/authService"; 
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.string().email({ message: "Insira um email válido." }),
  senha: z.string().min(1, { message: "Digite sua senha." }), 
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", senha: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");

    try {
      const response = await login(values.email, values.senha);

      if (response.success && response.user) {
        Cookies.set("ecosy_token", response.user.token, { expires: 1 }); // Expira em 1 dia
        Cookies.set("ecosy_user", JSON.stringify(response.user), { expires: 1 });

        if (response.user.role === "gestor") {
          router.push("/dashboard");
        } else {
          router.push("/meu-painel");
        }
      } else {
        setError(response.error || "Falha ao entrar.");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-[600px] py-[60px] px-[60px] border border-[#D9D9D9] shadow-lg">
      <CardHeader className="text-center">
        <Logo width={140} height={50} />
        <CardTitle className="text-2xl font-bold text-[#16424A]">
          Acesse sua conta
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-50 text-red-900 border-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="nome@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center mt-[32px] mb-[40px]">
              <Link
                href="/esqueci-minha-senha"
                className="text-sm font-medium text-[#4D8965] hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </CardContent>
          <CardFooter>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full hover:bg-[#407554] bg-[#4D8965] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}