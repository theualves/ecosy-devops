"use client";

import React, { useState } from 'react';
import { Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';

const locations = [
  { id: 1, city: "Recife", lat: -8.0578381, lng: -34.8828969, beneficiaries: 450 },
  { id: 2, city: "Garanhuns", lat: -8.8911, lng: -36.4958, beneficiaries: 312 },
  { id: 3, city: "Petrolina", lat: -9.3970334, lng: -40.5052951, beneficiaries: 280 },
  { id: 4, city: "Caruaru", lat: -8.2849, lng: -35.9699, beneficiaries: 200 },
];

const pernambucoCenter = { lat: -8.4, lng: -37.0 }; 

export default function PernambucoMap() {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  // Função para gerar o ícone personalizado
  const getCustomPin = () => {
    return {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
      fillColor: "#4D8965",
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: "#FFFFFF",
      rotation: 0,
      scale: 2.5,
      
      // --- A CORREÇÃO ESTÁ AQUI ---
      // Usamos 'as any' para o TypeScript aceitar o objeto literal como um Point
      anchor: { x: 12, y: 22 } as any, 
    };
  };

  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden relative bg-gray-100">
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={pernambucoCenter}
        defaultZoom={7}
        gestureHandling={'cooperative'}
        disableDefaultUI={true}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setSelectedLocation(loc)}
            // Agora o TypeScript não vai reclamar
            icon={getCustomPin()} 
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="p-2 text-black">
              <h3 className="font-bold text-ecosy-blue text-base">{selectedLocation.city}</h3>
              <p className="text-sm mt-1">
                Beneficiários: <span className="font-bold text-[#4D8965]">{selectedLocation.beneficiaries}</span>
              </p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}