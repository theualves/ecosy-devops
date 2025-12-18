"use client";

import VLibras from "vlibras-nextjs";

export default function VLibrasPlugin() {
  return (
    // forceOnload ajuda a carregar mesmo se o evento de load já tiver passado
    <VLibras forceOnload={true} />
  );
}