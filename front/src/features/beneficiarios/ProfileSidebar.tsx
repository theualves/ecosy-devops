"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, History, ClipboardList, Loader2, Settings } from "lucide-react";

interface ProfileSidebarProps {
  beneficiarioId: string;
}

export function ProfileSidebar({ beneficiarioId }: ProfileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const baseUrl = `/beneficiarios/${beneficiarioId}`;

  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const items = [
    { href: baseUrl, label: "Dados Cadastrais", icon: User, exact: true },
    { href: `${baseUrl}/historico`, label: "Histórico", icon: History },
    { href: `${baseUrl}/observacoes`, label: "Observações", icon: ClipboardList },
    { href: `${baseUrl}/configuracoes`, label: "Sobre a conta", icon: Settings }
  ];

  useEffect(() => {
    setLoadingPath(null);
  }, [pathname]);

  const handleNavigation = (href: string) => {
    if (pathname === href) return;

    setLoadingPath(href); 
    router.push(href);   
  };

  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => {
        const isActive = item.exact 
          ? pathname === item.href 
          : pathname.startsWith(item.href);

        const isLoading = loadingPath === item.href;
        const Icon = item.icon;

        return (
          <button
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            disabled={loadingPath !== null}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left",
              isActive
                ? "bg-[#DAF481] text-black" 
                : "hover:bg-[#E5E5E5] text-gray-600",
              loadingPath !== null && "cursor-not-allowed opacity-70"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-ecosy-green" />
            ) : (
              <Icon className={cn("h-4 w-4", isActive ? "text-black" : "text-gray-400")} />
            )}
            
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}