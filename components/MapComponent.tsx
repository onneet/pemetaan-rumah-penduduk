'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Warga } from './Sidebar';

// Custom icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ActiveIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapComponentProps {
  wargaList: Warga[];
  onMarkerClick: (warga: Warga) => void;
  selectedWargaId?: number | null;
  center?: [number, number];
  zoom?: number;
}

function MapController({ center, zoom, selectedWargaId, markersRef }: { center: [number, number], zoom: number, selectedWargaId?: number | null, markersRef: React.MutableRefObject<Map<number, L.Marker>> }) {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, { 
      duration: 1,
      easeLinearity: 0.25 
    });
    
    if (selectedWargaId) {
      setTimeout(() => {
        const marker = markersRef.current.get(selectedWargaId);
        if (marker) {
          marker.openPopup();
        }
      }, 1100); 
    }
  }, [center, zoom, map, selectedWargaId, markersRef]);

  return null;
}

const MapComponent: React.FC<MapComponentProps> = ({ wargaList, onMarkerClick, selectedWargaId, center = [0.5735, 122.9282], zoom = 15 }) => {
  const markersRef = React.useRef<Map<number, L.Marker>>(new Map());

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        zoomControl={false}
        preferCanvas={true}
      >
        <MapController center={center} zoom={zoom} selectedWargaId={selectedWargaId} markersRef={markersRef} />
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {wargaList.map((warga) => {
          if (warga.lat && warga.lng) {
            const isActive = selectedWargaId === warga.id;
            return (
              <Marker 
                key={warga.id} 
                position={[warga.lat, warga.lng]}
                icon={isActive ? ActiveIcon : DefaultIcon}
                ref={(el) => {
                  if (el) markersRef.current.set(warga.id, el);
                  else markersRef.current.delete(warga.id);
                }}
              >
                <Popup className="custom-popup" closeButton={false}>
                  <div className="w-64 overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100">
                    <div className="h-36 bg-slate-100 relative">
                      {warga.foto && <img src={`/uploads/${encodeURIComponent(warga.foto)}`} alt={warga.nama} className="w-full h-full object-cover" />}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[9px] font-black text-slate-800 uppercase shadow-sm">
                         Preview Lokasi
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <h4 className="font-black text-slate-800 text-base mb-1 tracking-tight">{warga.nama}</h4>
                      <p className="text-[11px] text-slate-400 font-medium mb-5 line-clamp-1 italic">{warga.alamat}</p>
                      <button 
                        onClick={() => onMarkerClick(warga)}
                        className="w-full bg-slate-900 text-white text-xs py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
                      >
                        Lihat Detail Lengkap
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
      
      <div className="absolute top-8 right-8 z-[1000] bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/50 max-w-[200px]">
        <h4 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em] text-center border-b border-slate-100 pb-3">Legenda Map</h4>
        <div className="space-y-3">
          <LegendItem color="bg-indigo-500" label="Titik Warga" />
          <LegendItem color="bg-rose-500" label="Lokasi Terpilih" />
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-3">
    <span className={`w-3 h-3 rounded-full ${color} shadow-sm ring-4 ring-white`}></span>
    <span className="text-[11px] font-bold text-slate-600 tracking-tight">{label}</span>
  </div>
);

export default MapComponent;
