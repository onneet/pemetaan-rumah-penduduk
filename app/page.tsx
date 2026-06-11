import React from 'react';
import Link from 'next/link';
import { Map, ArrowRight, ShieldCheck, Database, Search, Phone, Mail, MapPin, ChevronRight, Globe2, BarChart3, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900 scroll-smooth">
      {/* Navigation */}
      <nav className="h-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 flex items-center justify-between px-6 sm:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 group-hover:-translate-y-0.5 transition-all">
            <Map className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 leading-none tracking-tight">
              GeoDesa <span className="text-indigo-600">Smart</span>
            </h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
              Tabongo Timur
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="#kontak"
            className="hidden sm:block text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider"
          >
            Hubungi Kami
          </Link>
          <Link 
            href="/login"
            className="bg-slate-900 text-white px-5 sm:px-7 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-slate-300 flex items-center gap-2 hover:-translate-y-0.5 active:scale-95"
          >
            Masuk <ArrowRight className="w-4 h-4 hidden sm:block" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-32 px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/60 to-violet-100/60 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
          Sistem Terintegrasi v1.0
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Pemetaan Data Warga <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Cerdas & Presisi
          </span>
        </h2>
        
        <p className="mt-8 text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Sistem Informasi Geografis modern yang dirancang untuk mempermudah visualisasi, pencarian, dan pengelolaan data kependudukan Desa Tabongo Timur dalam satu platform terpusat.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full sm:w-auto">
          <Link 
            href="/login"
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 group"
          >
            <Map className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Mulai Eksplorasi Peta
          </Link>
          <Link 
            href="#kontak"
            className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl text-base font-bold hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Dapatkan Akses Login
          </Link>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-slate-400">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
             <ShieldCheck className="w-4 h-4 text-emerald-500" /> Akses Terproteksi
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
             <Globe2 className="w-4 h-4 text-indigo-500" /> Akses Web 24/7
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
             <Database className="w-4 h-4 text-rose-500" /> Data Real-time
          </div>
        </div>
      </header>

      {/* Quick Stats Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          <div className="text-center px-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-4xl font-black text-slate-800">4</h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">Dusun Terpetakan</p>
          </div>
          <div className="text-center px-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-4xl font-black text-slate-800">200+</h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">Data Warga</p>
          </div>
          <div className="text-center px-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h4 className="text-4xl font-black text-slate-800">100%</h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">Digitalisasi</p>
          </div>
          <div className="text-center px-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h4 className="text-4xl font-black text-slate-800">24/7</h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">Akses Sistem</p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-slate-50 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Fitur Unggulan</h3>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Semua yang Anda butuhkan untuk manajemen wilayah yang efisien.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Map className="w-6 h-6 text-indigo-600" />}
            bg="bg-indigo-50"
            border="border-indigo-100"
            title="Visualisasi Peta Interaktif"
            description="Lihat sebaran lokasi rumah warga secara presisi melalui integrasi peta digital yang responsif dan mudah digunakan."
          />
          <FeatureCard 
            icon={<Search className="w-6 h-6 text-violet-600" />}
            bg="bg-violet-50"
            border="border-violet-100"
            title="Pencarian Cepat"
            description="Temukan lokasi atau data spesifik warga berdasarkan nama atau nama dusun dalam hitungan detik melalui bilah pencarian cerdas."
          />
          <FeatureCard 
            icon={<Database className="w-6 h-6 text-emerald-600" />}
            bg="bg-emerald-50"
            border="border-emerald-100"
            title="Data Terpusat & Sinkron"
            description="Seluruh informasi demografis dan koordinat geografis disimpan dalam satu basis data yang rapi dan terorganisir dengan baik."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-amber-600" />}
            bg="bg-amber-50"
            border="border-amber-100"
            title="Otentikasi Multi-Level"
            description="Keamanan terjamin dengan sistem login. Hanya pengguna terdaftar (Admin dan Visitor) yang dapat mengakses informasi pemetaan."
          />
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px] -z-10"></div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Siap mengeksplorasi data desa Anda?</h3>
            <p className="text-slate-300 font-medium max-w-lg mb-8">Dapatkan wawasan yang lebih baik tentang sebaran penduduk dan bantu pengambilan keputusan yang lebih tepat sasaran di Desa Tabongo Timur.</p>
            <Link 
              href="/login"
              className="inline-flex w-fit bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-400 transition-all flex items-center gap-2"
            >
              Mulai Sekarang <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 sm:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Globe2 className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Tentang GeoDesa Smart</h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            GeoDesa Smart dibangun dengan visi untuk mendigitalisasi dan memodernisasi tata kelola data kependudukan dan kewilayahan di tingkat desa. Dengan memadukan teknologi pemetaan terkini dan basis data relasional, aplikasi ini diharapkan dapat menjadi alat bantu utama bagi perangkat desa dalam merencanakan pembangunan, mendistribusikan bantuan, serta memberikan pelayanan publik yang lebih transparan dan efisien.
          </p>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer id="kontak" className="bg-slate-900 pt-20 pb-10 px-6 sm:px-12 text-slate-400 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center">
                <Map className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">GeoDesa</h2>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              Sistem Informasi Geografis dan Pemetaan Warga Desa Tabongo Timur. Modern, Cerdas, dan Terintegrasi.
            </p>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6">Belum memiliki akses?</h3>
            <p className="text-sm font-medium mb-6 leading-relaxed">
              Demi keamanan dan privasi data kependudukan, akses ke dalam sistem (*dashboard*) pemetaan memerlukan akun otentikasi. Silakan hubungi operator atau admin Desa Tabongo Timur untuk mengajukan permohonan pembuatan akun Visitor.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                </div>
                <span>Kantor Desa Tabongo Timur, Gorontalo</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <span>+62 812-3456-7890 (Admin Desa)</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-rose-400" />
                </div>
                <span>pemdes@tabongotimur.desa.id</span>
              </div>
            </div>

            <a 
              href="mailto:pemdes@tabongotimur.desa.id?subject=Permohonan Akses GeoDesa Smart"
              className="mt-8 w-full bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group border border-slate-600"
            >
              Kirim Email Permohonan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
          <p>&copy; {new Date().getFullYear()} Desa Tabongo Timur. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privasi</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, description, bg, border }: { icon: React.ReactNode, title: string, description: string, bg: string, border: string }) {
  return (
    <div className={`bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 group`}>
      <div className={`w-14 h-14 ${bg} ${border} border rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium text-sm">{description}</p>
    </div>
  );
}
