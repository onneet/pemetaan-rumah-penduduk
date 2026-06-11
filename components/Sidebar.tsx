import React from 'react';
import { Info, Search, MapPinned } from 'lucide-react';

export interface Warga {
  id: number;
  nama: string;
  alamat: string;
  lokasi: string;
  deskripsi: string;
  foto: string;
  // Derived fields
  lat?: number;
  lng?: number;
}

interface SidebarProps {
  wargaList: Warga[];
  onSelectWarga: (warga: Warga) => void;
  onFilterChange: (dusun: string) => void;
  selectedDusun: string;
  onSearchChange: (term: string) => void;
  searchTerm: string;
}

const Sidebar: React.FC<SidebarProps> = ({ wargaList, onSelectWarga, onFilterChange, selectedDusun, onSearchChange, searchTerm }) => {
  const [displayLimit, setDisplayMore] = React.useState(50);
  
  // Extract unique dusun
  const dusunList = ["Dusun Basulapa", "Dusun Talumedungga", "Dusun Hutakiki", "Dusun AL"];

  const displayedWarga = wargaList.slice(0, displayLimit);

  return (
    <aside className="w-85 bg-white border-r border-slate-200 flex flex-col z-20 shadow-2xl pt-4">
      <div className="px-5 pb-5 border-b border-slate-100 space-y-4">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text"
            placeholder="Cari nama atau alamat..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Filter Wilayah</label>
          <div className="flex gap-2">
             <select 
              value={selectedDusun}
              onChange={(e) => {
                onFilterChange(e.target.value);
                setDisplayMore(50);
              }}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition appearance-none cursor-pointer"
            >
              <option value="all">Semua Wilayah</option>
              {dusunList.map(dusun => (
                <option key={dusun} value={dusun}>{dusun}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between mt-3 px-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter text-center">Result</p>
            <p className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{wargaList.length} Lokasi</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
        {displayedWarga.map((warga) => (
          <div
            key={warga.id}
            onClick={() => onSelectWarga(warga)}
            className="group bg-white hover:bg-white border border-slate-200 hover:border-indigo-200 p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-50 flex gap-3 items-center"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-indigo-100 transition-colors">
              {warga.foto ? (
                <img src={`/uploads/${encodeURIComponent(warga.foto)}`} alt={warga.nama} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                   <MapPinned className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-slate-700 group-hover:text-indigo-600 transition truncate">
                {warga.nama}
              </h4>
              <p className="text-[10px] text-slate-400 font-medium truncate">{warga.alamat}</p>
            </div>
          </div>
        ))}
        
        {displayLimit < wargaList.length && (
          <button 
            onClick={() => setDisplayMore(prev => prev + 50)}
            className="w-full py-4 text-xs font-black text-indigo-600 bg-white border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/50 transition-all mt-2 uppercase tracking-widest"
          >
            Muat Lebih Banyak
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
