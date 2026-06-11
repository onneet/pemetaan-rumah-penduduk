'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './Navbar';
import Sidebar, { Warga } from './Sidebar';
import Modal from './Modal';

// Load MapComponent dynamically to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium text-xs font-bold uppercase tracking-widest">Memuat Peta...</p>
      </div>
    </div>
  )
});

interface DashboardProps {
  initialWarga: Warga[];
  role: 'admin' | 'visitor';
}

const Dashboard: React.FC<DashboardProps> = ({ initialWarga, role }) => {
  const [selectedWarga, setSelectedWarga] = useState<Warga | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [filterDusun, setFilterDusun] = useState('all');
  const [mapCenter, setMapCenter] = useState<[number, number]>([0.5735, 122.9282]);
  const [mapZoom, setMapZoom] = useState(15);

  const filteredWarga = useMemo(() => {
    return initialWarga.filter(w => {
      const matchesDusun = filterDusun === 'all' || w.alamat.toLowerCase().includes(filterDusun.toLowerCase());
      const matchesSearch = w.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           w.alamat.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDusun && matchesSearch;
    });
  }, [filterDusun, searchTerm, initialWarga]);

  const stats = useMemo(() => {
    const dusunList = ["Basulapa", "Talumedungga", "Hutakiki", "AL"];
    return {
      totalRumah: initialWarga.length,
      totalDusun: dusunList.length,
      totalWarga: initialWarga.length * 4,
    };
  }, [initialWarga]);

  // Phase 1: Only move map and highlight (called from Sidebar)
  const handleSelectWarga = (warga: Warga) => {
    if (warga.lat && warga.lng) {
      setMapCenter([warga.lat, warga.lng]);
      setMapZoom(18);
      setHighlightedId(warga.id);
    }
  };

  // Phase 2: Open modal and fetch full detail (called from Map Popup)
  const handleShowDetail = async (warga: Warga) => {
    if (!warga.deskripsi) {
      setLoadingDetail(true);
      try {
        const res = await fetch(`/api/warga/${warga.id}`);
        const fullData = await res.json();
        setSelectedWarga({ ...warga, deskripsi: fullData.deskripsi });
      } catch (err) {
        console.error("Gagal mengambil detail:", err);
        setSelectedWarga(warga);
      } finally {
        setLoadingDetail(false);
      }
    } else {
      setSelectedWarga(warga);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-900 font-sans">
      <Navbar {...stats} role={role} />
      
      <main className="flex-1 flex pt-20 overflow-hidden">
        <Sidebar 
          wargaList={filteredWarga} 
          onSelectWarga={handleSelectWarga}
          onFilterChange={setFilterDusun}
          selectedDusun={filterDusun}
          onSearchChange={setSearchTerm}
          searchTerm={searchTerm}
        />
        
        <section className="flex-1 relative bg-slate-200">
          <MapComponent 
            wargaList={filteredWarga} 
            onMarkerClick={handleShowDetail}
            selectedWargaId={highlightedId}
            center={mapCenter}
            zoom={mapZoom}
          />
        </section>
      </main>

      <Modal 
        warga={selectedWarga} 
        onClose={() => setSelectedWarga(null)} 
        role={role}
      />

      {loadingDetail && (
        <div className="fixed bottom-8 right-8 z-[3000] bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300">
           <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[11px] font-black uppercase tracking-widest text-indigo-600">Memuat Detail...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
;
