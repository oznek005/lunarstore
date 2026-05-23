'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaDiscord, FaShieldHalved, FaCircleCheck, 
  FaBoltLightning, FaIdCard 
} from 'react-icons/fa6';

interface GameItem {
  amount: number;
  price: string;
  bonus: string;
  isPopular: boolean;
  method: string;
}

export default function FreeFirePage() {
  const [id, setId] = useState('');
  const [whatsapp, setWhatsapp] = useState(''); // State baru untuk nomor kontak WhatsApp
  const [selected, setSelected] = useState<number | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const items: GameItem[] = [
    // SMALL PACK
    { amount: 70, price: 'Rp 9.872', bonus: 'Small', isPopular: false, method: 'ff_id' },
    { amount: 80, price: 'Rp 11.746', bonus: 'Small', isPopular: false, method: 'ff_id' },
    { amount: 100, price: 'Rp 15.495', bonus: 'Small', isPopular: false, method: 'ff_id' },
    { amount: 120, price: 'Rp 17.370', bonus: 'Small', isPopular: false, method: 'ff_id' },
    
    // MEDIUM PACK
    { amount: 140, price: 'Rp 20.244', bonus: 'Medium', isPopular: true, method: 'ff_id' },
    { amount: 190, price: 'Rp 27.742', bonus: 'Medium', isPopular: false, method: 'ff_id' },
    { amount: 400, price: 'Rp 57.732', bonus: 'Medium', isPopular: false, method: 'ff_id' },
    { amount: 500, price: 'Rp 68.041', bonus: 'Medium', isPopular: true, method: 'ff_id' },
    
    // BIGGEST PACK
    { amount: 720, price: 'Rp 97.220', bonus: 'Big', isPopular: false, method: 'ff_id' },
    { amount: 1000, price: 'Rp 134.708', bonus: 'Big', isPopular: false, method: 'ff_id' },
    { amount: 1450, price: 'Rp 192.814', bonus: 'Big', isPopular: false, method: 'ff_id' },
    { amount: 2180, price: 'Rp 288.409', bonus: 'Big', isPopular: true, method: 'ff_id' },
    { amount: 3640, price: 'Rp 479.598', bonus: 'Godly', isPopular: false, method: 'ff_id' },
  ];
  
  const paymentMethods = [
    { id: 'qris', name: 'QRIS (ALL PAYMENT)', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg' },
    { id: 'dana', name: 'DANA', image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
    { id: 'gopay', name: 'GOPAY', image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
  ];

  const handlePayment = async () => {
    if (!id || !selected || !payment || !whatsapp) {
      alert("⚠️ Harap lengkapi Player ID, WhatsApp, Nominal, dan Pembayaran!");
      return;
    }
    
    setLoading(true);
    const selectedItem = items.find(i => i.amount === selected);

    try {
      // Mengirimkan payload bersih universal ke API send-order
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: 'freefire',
          userId: id,
          zoneId: '-', // Free Fire tidak menggunakan Zone ID, diisi tanda strip agar valid
          nominal: `${selected} Diamonds`,
          payment: payment.replace('_', ' ').toUpperCase(),
          whatsapp: whatsapp
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim pesanan");
      }

      // Redirect ke Halaman Sukses bawaan
      router.push(`/success?method=${payment.toUpperCase()}&price=${selectedItem?.price}&item=${selected} Diamonds&game=Free Fire`); 
    } catch (error: any) {
      alert(`⚠️ Terjadi kesalahan: ${error.message || "Silahkan coba lagi."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 pt-28 pb-32 relative overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-orange-600/10 blur-[150px] rounded-full -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-8"
      >
        {/* HEADER */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
          
          <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-2 border-orange-500/30 relative z-10 shrink-0 bg-[#0c0c0c]">
            <Image 
              src="/ff.png" 
              alt="Free Fire" 
              fill 
              className="object-cover"
            />
          </div>

          <div className="text-center md:text-left relative z-10">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              FREE <span className="text-orange-500">FIRE</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.4em] mt-3 uppercase flex items-center justify-center md:justify-start gap-2">
              <FaBoltLightning className="text-orange-500 animate-pulse" /> Instant & Safe Delivery
            </p>
          </div>
        </section>

        {/* STEP 1: PLAYER ID & WHATSAPP */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(249,115,22,0.4)]">01</div>
              <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Data Akun & Kontak</label>
            </div>
          </div>
          
          <div className="relative group">
            <input 
              type="number" 
              value={id} 
              onChange={(e) => setId(e.target.value)} 
              placeholder="Masukkan Player ID" 
              className="w-full bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 focus:border-orange-500/50 outline-none text-sm transition-all font-bold tracking-[0.2em] placeholder:text-gray-800" 
            />
            <FaIdCard className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within:text-orange-500" />
          </div>

          <input 
            type="text" 
            value={whatsapp} 
            onChange={(e) => setWhatsapp(e.target.value)} 
            placeholder="Nomor WhatsApp (Contoh: 081234567xxx)" 
            className="w-full bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 focus:border-orange-500/50 outline-none text-sm transition-all font-bold placeholder:text-gray-800" 
          />
        </section>

        {/* STEP 2: NOMINAL */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(249,115,22,0.4)]">02</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Pilih Nominal</label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item) => (
              <button 
                key={item.amount} 
                type="button"
                onClick={() => setSelected(item.amount)} 
                className={`group p-6 rounded-[2.5rem] transition-all border-2 flex flex-col items-center justify-center relative overflow-hidden ${
                  selected === item.amount 
                  ? 'border-orange-500 bg-orange-500/10 shadow-lg' 
                  : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
              >
                {item.isPopular && (
                  <div className="absolute top-3 right-3 bg-orange-600 text-[6px] font-black px-2 py-1 rounded-full uppercase">Hot</div>
                )}
                <div className="text-[8px] text-orange-400 font-black italic mb-1 uppercase">{item.bonus}</div>
                <div className="font-black text-2xl italic tracking-tighter mb-1">{item.amount}</div>
                <div className="text-[7px] text-gray-600 font-black uppercase mb-4">Diamonds</div>
                <div className={`text-[9px] text-white font-black w-full py-2 rounded-2xl text-center border ${
                  selected === item.amount ? 'bg-orange-600 border-transparent' : 'bg-white/5 border-white/5'
                }`}>
                  {item.price}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* STEP 3: PEMBAYARAN */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(249,115,22,0.4)]">03</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Metode Bayar</label>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setPayment(pm.id)}
                className={`w-full p-5 rounded-[2rem] flex items-center justify-between border-2 transition-all ${
                  payment === pm.id 
                  ? 'border-green-500 bg-green-500/10' 
                  : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-9 bg-white rounded-xl p-2 flex items-center justify-center shadow-md">
                    <img src={pm.image} alt={pm.name} className="w-full h-full object-contain max-h-6" />
                  </div>
                  <span className="font-black text-[10px] tracking-widest text-gray-300 uppercase">{pm.name}</span>
                </div>
                {payment === pm.id && <FaCircleCheck className="text-green-500 text-xl" />}
              </button>
            ))}
          </div>
        </section>

        {/* STICKY BUTTON */}
        <div className="sticky bottom-8 z-50 px-4">
          <button 
            type="button"
            onClick={handlePayment} 
            disabled={loading} 
            className={`w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-xs flex items-center justify-center gap-4 transition-all shadow-2xl group relative overflow-hidden ${
              loading ? 'bg-gray-900 cursor-not-allowed text-gray-600' : 'bg-orange-600 hover:bg-orange-700 active:scale-95 text-white'
            }`}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <FaDiscord size={18} /> BELI SEKARANG
              </>
            )}
          </button>
        </div>

        <div className="text-center py-4">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
            <FaShieldHalved className="text-orange-500" /> Secure Payment & Trusted Service
          </p>
        </div>
      </motion.div>
    </main>
  );
}