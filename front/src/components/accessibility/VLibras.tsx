"use client";

import { useEffect } from "react";

export function VLibras() {
  useEffect(() => {
    // Verifica se o script já foi adicionado para não duplicar
    const existingScript = document.getElementById("vlibras-script");
    if (existingScript) return;

    // 1. Cria a tag script manualmente
    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;

    // 2. Quando o script carregar, inicia o Widget
    script.onload = () => {
      // @ts-ignore
      if (window.VLibras) {
        // @ts-ignore
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };

    // 3. Adiciona ao corpo da página
    document.body.appendChild(script);
  }, []);

  return (
    // Estrutura HTML obrigatória (com o fix de typescript)
    <div {...({ "vw": "true" } as any)} className="enabled">
      <div {...({ "vw-access-button": "true" } as any)} className="active"></div>
      <div {...({ "vw-plugin-wrapper": "true" } as any)}>
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}