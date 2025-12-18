"use client";

import { APIProvider } from '@vis.gl/react-google-maps';
import PernambucoMap from './PernambucoMap'; // Importa o componente do mapa

// Sua chave de API do Google Maps (leia do .env)
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Componente Wrapper para fornecer a chave da API e carregar o mapa
export default function MapProviderWrapper() {
  if (!GOOGLE_MAPS_API_KEY) {
    console.error("Google Maps API Key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file.");
    return (
      <div className="h-[350px] w-full bg-red-100 rounded-md flex items-center justify-center text-red-700">
        Erro: Chave de API do Google Maps ausente.
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} language="pt-BR">
      <PernambucoMap />
    </APIProvider>
  );
}