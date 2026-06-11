import React from 'react';
import { Map as MapIcon, Download, Home, MapPin, Users, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  totalRumah: number;
  totalDusun: number;
  totalWarga: number;
  role: 'admin' | 'visitor';
}

const Navbar: React.FC<NavbarProps> = ({ totalRumah, totalDusun, totalWarga, role }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-[1000] flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3">
          <MapIcon className="h-7 w-7 text-white -rotate-3" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 leading-none tracking-tight">
            GeoDesa <span className="text-indigo-600">Smart</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">
            Manajemen Data Spasial
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <StatCard icon={<Home className="w-4 h-4" />} label="Total Rumah" value={totalRumah} color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard icon={<MapPin className="w-4 h-4" />} label="Total Dusun" value={totalDusun} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard icon={<Users className="w-4 h-4" />} label="Total Warga" value={totalWarga} color="text-amber-600" bg="bg-amber-50" />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block mr-2 text-right">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Akses</p>
          <p className="text-sm font-bold text-slate-700 capitalize">{role}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-rose-100 text-rose-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-rose-200 transition-all active:scale-95 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </nav>
  );
};

const StatCard = ({ icon, label, value, color, bg }: { icon: any, label: string, value: number, color: string, bg: string }) => (
  <div className={`flex items-center gap-4 px-5 py-2.5 ${bg} rounded-2xl border border-white shadow-sm`}>
    <div className={`w-8 h-8 rounded-xl bg-white flex items-center justify-center ${color} shadow-sm`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">{label}</p>
      <p className={`text-lg font-black ${color} leading-none`}>{value.toLocaleString()}</p>
    </div>
  </div>
);

export default Navbar;
