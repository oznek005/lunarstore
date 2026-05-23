'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMagnifyingGlass, 
  FaCircleCheck, 
  FaClock, 
  FaTruckFast, 
  FaTriangleExclamation,
  FaSpinner
} from 'react-icons/fa6';

interface OrderResult {
  id: string;
  game: string;
  nominal: string;
  status: 'Pending' | 'Proses' | 'Sukses' | 'Gagal';
  date: string;
}

export default function CheckStatus() {
  const [invoice, setInvoice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<OrderResult | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi loading 1 detik agar terasa seperti mencari di database
    setTimeout(() => {
      setSearchResult({
        id: invoice,
        game: "Roblox",
        nominal: "1000 Robux",
        status: "Proses",
        date: "11 Maret 2026, 15:20 WIB"
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full -z-10 animate-pulse"></div>

      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] text-purple-400 mb-6">
            <FaClock className="animate-spin-slow" /> Real-time Tracking
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-none">
            LACAK <span className="text-purple-500">PESANAN</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-sm mx-auto"> 
            Pantau status transaksi Anda dengan memasukkan nomor invoice resmi dari LunarStore.
          </p>
        </div>

        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="mb-16">
          <div className="relative group mb-6">
            <input 
              type="text" 
              placeholder="CONTOH: LUNAR-12345678"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value.toUpperCase())} // Auto Caps agar rapi
              className="w-full bg-[#0c0c0c] border border-white/5 p-7 rounded-[2.5rem] outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all font-mono text-center tracking-[0.3em] text-purple-400 group-hover:border-white/10 text-lg shadow-2xl"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 text-white font-black uppercase tracking-[0.3em] py-6 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95 text-[11px]"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-lg" />
            ) : (
              <><FaMagnifyingGlass /> Periksa Status</>
            )}
          </button>
        </form>

        {/* Hasil Pencarian */}
        <AnimatePresence>
          {searchResult && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0c0c]/80 border border-white/5 rounded-[3.5rem] p-10 backdrop-blur-3xl relative overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8">
                <div>
                  <h4 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Transaction ID</h4>
                  <p className="font-mono text-white tracking-widest uppercase font-bold text-lg">{searchResult.id}</p>
                </div>
                <div className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 ${
                  searchResult.status === "Sukses" ? "bg-green-500/10 text-green-500 border border-green-500/20" : 
                  searchResult.status === "Proses" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" : 
                  "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse shadow-[0_0_8px_currentColor]"></span>
                  {searchResult.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Game Name</p>
                  <p className="text-md font-black uppercase italic tracking-tighter">{searchResult.game}</p>
                </div>
                <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Item Nominal</p>
                  <p className="text-md font-black uppercase italic tracking-tighter text-purple-400">{searchResult.nominal}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">{searchResult.date}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips / Warning */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-start gap-5 p-8 bg-purple-500/[0.03] border border-purple-500/10 rounded-[2.5rem] backdrop-blur-md"
        >
          <div className="p-3 bg-purple-500/10 rounded-2xl">
            <FaTriangleExclamation className="text-purple-500 text-xl" />
          </div>
          <div>
            <h5 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Butuh Bantuan?</h5>
            <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
              Jika status sudah <span className="text-purple-400 font-bold">SUKSES</span> namun item belum diterima dalam 10 menit, silakan hubungi Customer Service kami di Discord atau WhatsApp.
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}