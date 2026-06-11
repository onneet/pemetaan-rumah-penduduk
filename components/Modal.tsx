import React from 'react';
import { X, Users, Wallet, Maximize } from 'lucide-react';
import { Warga } from './Sidebar';

interface ModalProps {
  warga: Warga | null;
  onClose: () => void;
  role: 'admin' | 'visitor';
}

const Modal: React.FC<ModalProps> = ({ warga, onClose, role }) => {
  if (!warga) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="relative h-64 bg-slate-100">
          {warga.foto ? (
            <img src={`/uploads/${encodeURIComponent(warga.foto)}`} alt={warga.nama} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              No Image Available
            </div>
          )}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full uppercase">
                {warga.alamat.split(',')[0]}
              </span>
              <h2 className="text-3xl font-bold text-slate-800 mt-2">{warga.nama}</h2>
              <p className="text-slate-500">{warga.alamat}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium">ID Database</p>
              <p className="font-mono font-bold text-slate-800 text-lg">#{warga.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <div className="flex justify-center mb-1"><Users className="w-4 h-4 text-slate-400" /></div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Status</p>
              <p className="text-xl font-bold text-slate-800">Warga</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <div className="flex justify-center mb-1"><Wallet className="w-4 h-4 text-slate-400" /></div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Keterangan</p>
              <p className="text-xl font-bold text-emerald-600">-</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <div className="flex justify-center mb-1"><Maximize className="w-4 h-4 text-slate-400" /></div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Luas</p>
              <p className="text-xl font-bold text-slate-800">-</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Deskripsi</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {warga.deskripsi || "Tidak ada deskripsi tambahan untuk lokasi ini."}
            </p>
          </div>

          <div className="flex gap-3">
            {role === 'admin' && (
              <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                Edit Data
              </button>
            )}
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${warga.lat},${warga.lng}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition text-center"
            >
              Buka di Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
