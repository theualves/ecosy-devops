"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Save, X, Loader2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { updateBeneficiario, BeneficiarioDetalhado } from "@/services/beneficiariosService";
import { formSchema, BeneficiarioFormData } from "./schemas";

// --- ESTILOS DE ESTADO ---
const editStyle = "rounded-xl border-2 border-[#4FA26F] focus-visible:ring-0 focus-visible:border-[#266940] bg-white h-[48px]";
const viewStyle = "border-none bg-transparent shadow-none px-0 font-medium text-ecosy-blue text-base h-auto cursor-default focus-visible:ring-0 disabled:opacity-100";

interface Props {
  beneficiario: BeneficiarioDetalhado;
}

export function BeneficiarioEditableForm({ beneficiario }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNÇÕES AUXILIARES PARA PREPARAR OS DADOS ---

  // 1. Separa "Maria Lúcia dos Santos" em "Maria" e "Lúcia dos Santos"
  const splitNomeCompleto = (nomeCompleto: string) => {
    if (!nomeCompleto) return { nome: "", sobrenome: "" };
    const partes = nomeCompleto.split(" ");
    const primeiroNome = partes[0];
    const restoSobrenome = partes.slice(1).join(" ");
    // Se não tiver sobrenome, retorna string vazia (mas o Zod vai reclamar se tentar salvar assim)
    return { nome: primeiroNome, sobrenome: restoSobrenome || "" };
  };

  // 2. Tenta adivinhar o ID do técnico pelo nome (Fallback para o front)
  const getTecnicoIdPorNome = (nome: string) => {
    if (!nome) return "";
    if (nome.includes("Jonas")) return "2"; // ID do Jonas no banco
    if (nome.includes("Carla")) return "3"; // ID da Carla no banco
    return "2"; // Valor padrão
  };

  // 3. Formata o Status para bater com o Select ("ATIVO" -> "Ativo")
  const formatStatus = (status: string) => {
    if (!status) return "Ativo";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Executa a separação do nome
  const { nome: nomeInicial, sobrenome: sobrenomeInicial } = splitNomeCompleto(beneficiario.nome);

  const form = useForm<BeneficiarioFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: nomeInicial,
      sobrenome: sobrenomeInicial,
      cpf: beneficiario.cpf,
      telefone: beneficiario.telefone || "",
      cidade: beneficiario.cidade,
      endereco: beneficiario.endereco,
      cep: beneficiario.cep || "",
      associacao: beneficiario.associacao,
      estado: "PE",
      
      // Mapeia os valores complexos
      tecnicoResponsavel: getTecnicoIdPorNome(beneficiario.tecnicoResponsavel),
      status: formatStatus(beneficiario.status) as any,
    },
  });

  const toggleEdit = () => {
    if (isEditing) {
      form.reset(); // Cancela alterações
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: BeneficiarioFormData) => {
    setIsLoading(true);
    try {
      // Prepara o payload aninhado para o Backend Java
      const payload = {
        nome: `${data.nome} ${data.sobrenome}`, // Junta de volta
        cpf: data.cpf,
        telefone: data.telefone,
        cidade: data.cidade,
        associacao: data.associacao,
        status: data.status.toUpperCase(), // Envia como ENUM (ATIVO)
        
        // Objeto Técnico
        tecnicoResponsavel: { 
          id: Number(data.tecnicoResponsavel) 
        },
        
        // Objeto Endereço
        endereco: {
          rua: data.endereco,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep
        }
      };

      console.log("Enviando Update:", payload);
      await updateBeneficiario(beneficiario.id, payload);
      
      setIsEditing(false);
      router.refresh(); // Atualiza os dados na tela
      alert("Dados atualizados com sucesso!");
      
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar dados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* CABEÇALHO DA SEÇÃO */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold text-ecosy-blue mb-1">
            Dados Cadastrais
          </h2>
          <p className="text-sm text-muted-foreground">
            Informações pessoais e de contato.
          </p>
        </div>
        
        <Button
          variant="ghost"
          onClick={toggleEdit}
          className={isEditing ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-ecosy-blue hover:text-ecosy-green hover:bg-green-50"}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4 mr-2" /> Cancelar Edição
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" /> Editar Dados
            </>
          )}
        </Button>
      </div>
      
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))} className="space-y-6">
          
          {/* GRID DE CAMPOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            
            {/* NOME */}
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-500">Nome</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly={!isEditing} 
                      className={isEditing ? editStyle : viewStyle} 
                    />
                  </FormControl>
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />

            {/* SOBRENOME */}
            <FormField
              control={form.control}
              name="sobrenome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-500">Sobrenome</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly={!isEditing} 
                      className={isEditing ? editStyle : viewStyle} 
                    />
                  </FormControl>
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />

            {/* CPF */}
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-500">CPF</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly={!isEditing} 
                      className={isEditing ? editStyle : viewStyle} 
                    />
                  </FormControl>
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />

            {/* TELEFONE */}
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-500">WhatsApp</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly={!isEditing} 
                      className={isEditing ? editStyle : viewStyle} 
                    />
                  </FormControl>
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />

            {/* TÉCNICO (SELECT ou TEXTO) */}
            <FormField
              control={form.control}
              name="tecnicoResponsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-500">Técnico Responsável</FormLabel>
                  {isEditing ? (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={editStyle}>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">Jonas Pereira</SelectItem>
                        <SelectItem value="3">Carla Medeiros</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    // Modo Leitura: Mostra apenas o texto (o nome do técnico já tratado ou o ID se não tiver map)
                    <div className={viewStyle}>
                       {field.value === "2" ? "Jonas Pereira" : field.value === "3" ? "Carla Medeiros" : field.value}
                    </div>
                  )}
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />

            {/* ASSOCIAÇÃO */}
            <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="associacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-500">Associação</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          readOnly={!isEditing} 
                          className={isEditing ? editStyle : viewStyle} 
                        />
                      </FormControl>
                      {isEditing && <FormMessage />}
                    </FormItem>
                  )}
                />
            </div>

            {/* ENDEREÇO (Span 2 cols) */}
            <div className="md:col-span-2">
                <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-500">Endereço</FormLabel>
                    <FormControl>
                        <Input 
                        {...field} 
                        readOnly={!isEditing} 
                        className={isEditing ? editStyle : viewStyle} 
                        />
                    </FormControl>
                    {isEditing && <FormMessage />}
                    </FormItem>
                )}
                />
            </div>
            
            {/* CIDADE E CEP */}
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-500">Cidade</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly={!isEditing} 
                      className={isEditing ? editStyle : viewStyle} 
                    />
                  </FormControl>
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-500">CEP</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      readOnly={!isEditing} 
                      className={isEditing ? editStyle : viewStyle} 
                    />
                  </FormControl>
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />

          </div>

          {/* BOTÃO SALVAR (Só aparece editando) */}
          {isEditing && (
            <div className="flex justify-end pt-4 animate-in slide-in-from-bottom-2">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#4FA26F] hover:bg-[#266940] text-white font-bold h-[48px] px-8 rounded-xl"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Salvando...</>
                ) : (
                  <><Save className="mr-2 h-4 w-4"/> Salvar Alterações</>
                )}
              </Button>
            </div>
          )}

        </form>
      </Form>
    </div>
  );
}