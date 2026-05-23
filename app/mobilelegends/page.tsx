'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaDiscord, FaCircleCheck, 
  FaBoltLightning 
} from 'react-icons/fa6';

interface GameItem {
  amount: number;
  price: string;
  bonus: string;
  isPopular: boolean;
  method: string;
}

export default function MobileLegendsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [gameId, setGameId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [whatsapp, setWhatsapp] = useState(''); // Menambahkan state WhatsApp pembeli
  const [loginMethod] = useState<string>('ml_id'); 
  const router = useRouter();

  const items: GameItem[] = [
    { amount: 22, price: 'Rp 7.189', bonus: 'Creep', isPopular: false, method: 'ml_id' },
    { amount: 50, price: 'Rp 14.837', bonus: 'Creep', isPopular: false, method: 'ml_id' },
    { amount: 74, price: 'Rp 21.232', bonus: 'Minion', isPopular: false, method: 'ml_id' },
    { amount: 98, price: 'Rp 28.388', bonus: 'Minion', isPopular: false, method: 'ml_id' },
    { amount: 129, price: 'Rp 36.287', bonus: 'War', isPopular: false, method: 'ml_id' },
    { amount: 241, price: 'Rp 68.375', bonus: 'War', isPopular: true, method: 'ml_id' },
    { amount: 284, price: 'Rp 81.098', bonus: 'King', isPopular: false, method: 'ml_id' },
    { amount: 790, price: 'Rp 217.768', bonus: 'King', isPopular: false, method: 'ml_id' },
    { amount: 1067, price: 'Rp 298.509', bonus: 'Super King', isPopular: false, method: 'ml_id' },
    { amount: 6840, price: 'Rp 1.739.635', bonus: 'Super King', isPopular: true, method: 'ml_id' },
  ];

  const paymentMethods = [
    { id: 'qris', name: 'QRIS (ALL PAYMENT)', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg' },
    { id: 'dana', name: 'DANA', image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
    { id: 'gopay', name: 'GOPAY', image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
  ];

  const handlePayment = async () => {
    if (!gameId || !zoneId || !selected || !payment || !whatsapp) {
      alert("⚠️ Harap lengkapi ID, Zone ID, WhatsApp, Nominal, dan Pembayaran!");
      return;
    }
    
    setLoading(true);
    const selectedItem = items.find(i => i.amount === selected);

    try {
      // Mengirimkan objek data bersih yang dinamis ke API route baru
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: 'mobilelegends',
          userId: gameId,
          zoneId: zoneId,
          nominal: `${selected} Diamonds`,
          payment: payment.replace('_', ' ').toUpperCase(),
          whatsapp: whatsapp
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal kirim pesanan");
      }
      
      // Mengarahkan ke halaman sukses bawaan dengan parameter data
      router.push(`/success?method=${payment.toUpperCase()}&price=${selectedItem?.price}&item=${selected} Diamonds&game=Mobile Legends`); 
    } catch (error: any) {
      alert(`⚠️ Terjadi kesalahan: ${error.message || "Silahkan coba lagi nanti."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 pt-28 pb-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl space-y-8">
        
        {/* Banner Utama */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
          <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-2 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] relative z-10 shrink-0">
            <Image src="/ml.png" alt="MLBB" fill className="object-cover scale-110" />
          </div>
          <div className="text-center md:text-left relative z-10">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">MOBILE <span className="text-purple-500">LEGENDS</span></h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.4em] mt-3 uppercase flex items-center justify-center md:justify-start gap-2">
              <FaBoltLightning className="text-purple-500 animate-pulse" /> Instant & Safe Delivery
            </p>
          </div>
        </section>

        {/* STEP 1: Input Data Akun & WhatsApp */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(168,85,247,0.4)]">01</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Data Akun & Kontak</label>
          </div>
          {loginMethod === 'ml_id' && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <input type="text" value={gameId} onChange={(e) => setGameId(e.target.value)} placeholder="User ID" className="w-1/2 bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 outline-none text-sm font-bold focus:border-purple-500/50 transition-colors" />
                <input type="text" value={zoneId} onChange={(e) => setZoneId(e.target.value)} placeholder="Zone ID" className="w-1/2 bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 outline-none text-sm font-bold focus:border-purple-500/50 transition-colors" />
              </div>
              <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="Nomor WhatsApp (Contoh: 081234567xxx)" className="w-full bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 outline-none text-sm font-bold focus:border-purple-500/50 transition-colors" />
            </div>
          )}
        </section>

        {/* STEP 2: Pilih Nominal */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(168,85,247,0.4)]">02</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Pilih Nominal</label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item) => (
              <button key={item.amount} type="button" onClick={() => setSelected(item.amount)} className={`group p-6 rounded-[2.5rem] transition-all border-2 flex flex-col items-center justify-center relative overflow-hidden ${selected === item.amount ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-white/[0.02]'}`}>
                {item.isPopular && <div className="absolute top-4 right-4 bg-purple-600 text-[6px] font-black px-2 py-1 rounded-full uppercase">Laris</div>}
                <div className="text-[8px] text-purple-400 font-black italic mb-1">{item.bonus}</div>
                <div className="font-black text-2xl italic tracking-tighter mb-1">{item.amount}</div>
                <div className="text-[7px] text-gray-600 font-black uppercase mb-4">Diamonds</div>
                <div className={`text-[9px] text-white font-black w-full py-2 rounded-2xl text-center border ${selected === item.amount ? 'bg-purple-600 border-transparent' : 'bg-white/5 border-white/5'}`}>{item.price}</div>
              </button>
            ))}
          </div>
        </section>

        {/* STEP 3: Metode Bayar */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(168,85,247,0.4)]">03</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Metode Bayar</label>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((pm) => (
              <button key={pm.id} type="button" onClick={() => setPayment(pm.id)} className={`w-full p-5 rounded-[2rem] flex items-center justify-between border-2 transition-all ${payment === pm.id ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/[0.02]'}`}>
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

        {/* Sticky Button Aksi */}
        <div className="sticky bottom-8 z-50 px-4">
          <button type="button" onClick={handlePayment} disabled={loading} className={`w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-xs flex items-center justify-center gap-4 transition-all ${loading ? 'bg-gray-900 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:scale-95'}`}>
            {loading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> : <><FaDiscord size={18} /> BELI SEKARANG</>}
          </button>
        </div>
      </motion.div>
    </main>
  );
}