'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaDiscord, FaCircleCheck, 
  FaBoltLightning 
} from 'react-icons/fa6';

interface RobloxItem {
  amount: number;
  price: string;
  bonus: string;
  isPopular: boolean;
  method: string; 
}

export default function RobloxPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backupCodes, setBackupCodes] = useState('');
  const [whatsapp, setWhatsapp] = useState(''); 
  const [selected, setSelected] = useState<number | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const items: RobloxItem[] = [
    { amount: 500, price: 'Rp 85.000', bonus: 'Laris', isPopular: false, method: 'login1' },
    { amount: 1000, price: 'Rp 155.000', bonus: 'Hemat', isPopular: true, method: 'login1' },
    { amount: 1500, price: 'Rp 255.000', bonus: 'Populer', isPopular: false, method: 'login1' },
    { amount: 2000, price: 'Rp 295.000', bonus: 'VVIP', isPopular: false, method: 'login1' },
    { amount: 3000, price: 'Rp 435.000', bonus: 'Whale', isPopular: false, method: 'login1' },
    { amount: 4000, price: 'Rp 575.000', bonus: 'Godly', isPopular: false, method: 'login1' },
    { amount: 5000, price: 'Rp 710.000', bonus: 'Laris', isPopular: false, method: 'login1' },
    
    { amount: 80, price: 'Rp 23.000', bonus: 'Hemat', isPopular: true, method: 'login2' },
    { amount: 160, price: 'Rp 38.000', bonus: 'Populer', isPopular: false, method: 'login2' },
    { amount: 240, price: 'Rp 53.000', bonus: 'VVIP', isPopular: false, method: 'login2' },
    { amount: 320, price: 'Rp 78.000', bonus: 'Whale', isPopular: false, method: 'login2' },
    
    { amount: 450, price: 'Rp 79.000', bonus: 'Hemat', isPopular: true, method: 'premium' },
    { amount: 1000, price: 'Rp 149.000', bonus: 'Populer', isPopular: false, method: 'premium' },
    { amount: 2200, price: 'Rp 295.000', bonus: 'Whale', isPopular: false, method: 'premium' },
  ];

  const filteredItems = loginMethod 
    ? items.filter(i => i.method === loginMethod) 
    : [];

  const handleLoginChange = (id: string) => {
    setLoginMethod(id);
    setSelected(null);
  };

  const loginOptions = [
    { id: 'login1', name: 'Via Login 1' },
    { id: 'login2', name: 'Via Login 2' },
    { id: 'premium', name: 'Via Log Premium' },
  ];

  const paymentMethods = [
    { id: 'qris', name: 'QRIS (ALL PAYMENT)', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg' },
    { id: 'dana', name: 'DANA', image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
    { id: 'gopay', name: 'GOPAY', image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
  ];

  const handlePayment = async () => {
    if (!username || !password || !selected || !payment || !loginMethod || !whatsapp) {
      alert("⚠️ Harap lengkapi Username, Password, WhatsApp, Metode Login, Nominal, dan Pembayaran!");
      return;
    }
    
    setLoading(true);
    const selectedItem = items.find(i => i.amount === selected);

    const fullAccountData = `User: ${username} | Pass: ${password} | Backup: ${backupCodes || '-'}`;
    const selectedMethodName = loginOptions.find(o => o.id === loginMethod)?.name || loginMethod;

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game: 'roblox',
          userId: fullAccountData, 
          zoneId: selectedMethodName, 
          nominal: `${selected} Robux`,
          payment: payment.replace('_', ' ').toUpperCase(),
          whatsapp: whatsapp
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim pesanan");
      }
      
      router.push(`/success?method=${payment.toUpperCase()}&price=${selectedItem?.price}&item=${selected} Robux&game=Roblox&login=${loginMethod}`); 
    } catch (error: any) {
      alert(`⚠️ Terjadi kesalahan: ${error.message || "Silahkan coba lagi."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 pt-28 pb-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl space-y-8">
        
        {/* Banner Game */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
          <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-2 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] relative z-10 shrink-0 bg-[#0c0c0c]">
            <Image src="/roblox.png" alt="Roblox" fill className="object-cover scale-110" />
          </div>
          <div className="text-center md:text-left relative z-10">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              ROB<span className="text-purple-500">LOX</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.4em] mt-3 uppercase flex items-center justify-center md:justify-start gap-2">
              <FaBoltLightning className="text-purple-500 animate-pulse" /> Instant Login & Manual
            </p>
          </div>
        </section>

        {/* STEP 1: Data Akun */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(168,85,247,0.4)]">01</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Data Akun & Kontak</label>
          </div>
          
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username Roblox" 
            className="w-full bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 outline-none text-sm font-bold focus:border-purple-500/50 transition-colors placeholder:text-gray-700" 
          />

          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password Roblox" 
            className="w-full bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 outline-none text-sm font-bold focus:border-purple-500/50 transition-colors placeholder:text-gray-700" 
          />

          <input 
            type="text" 
            value={backupCodes} 
            onChange={(e) => setBackupCodes(e.target.value)} 
            placeholder="Backup Code 1, 2, 3 (Opsional)" 
            className="w-full bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 outline-none text-sm font-bold focus:border-purple-500/50 transition-colors placeholder:text-gray-700" 
          />

          <input 
            type="number" 
            value={whatsapp} 
            onChange={(e) => setWhatsapp(e.target.value)} 
            placeholder="Nomor WhatsApp (Contoh: 081234567xxx)" 
            className="w-full bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 outline-none text-sm font-bold focus:border-purple-500/50 transition-colors placeholder:text-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
          />
          
          <p className="text-[9px] text-gray-500 font-bold italic px-4 pt-1">
            *Pastikan akun sudah terverifikasi email & sediakan backup code jika ada 2FA.
          </p>
        </section>

        {/* STEP 2: Metode Login */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(168,85,247,0.4)]">02</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Metode Login</label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {loginOptions.map((opt) => (
              <button key={opt.id} type="button" onClick={() => handleLoginChange(opt.id)} className={`p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase ${loginMethod === opt.id ? 'border-purple-500 bg-purple-500/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'}`}>
                {opt.name}
              </button>
            ))}
          </div>
        </section>

        {/* STEP 3: Pilih Nominal */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(168,85,247,0.4)]">03</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Pilih Nominal Robux</label>
          </div>
          
          {!loginMethod ? (
            <p className="text-center text-gray-500 text-xs italic font-bold">Pilih metode login di atas untuk melihat daftar harga...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <button key={item.amount} type="button" onClick={() => setSelected(item.amount)} className={`group p-6 rounded-[2.5rem] transition-all border-2 flex flex-col items-center justify-center relative overflow-hidden ${selected === item.amount ? 'border-purple-500 bg-purple-500/10 shadow-lg' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'}`}>
                  {item.isPopular && <div className="absolute top-4 right-4 bg-purple-600 text-[6px] font-black px-2 py-1 rounded-full uppercase">Laris</div>}
                  <div className="text-[8px] text-purple-400 font-black italic mb-1">{item.bonus}</div>
                  <div className="font-black text-2xl italic tracking-tighter mb-1">{item.amount}</div>
                  <div className="text-[7px] text-gray-600 font-black uppercase mb-4">Robux</div>
                  <div className={`text-[9px] text-white font-black w-full py-2 rounded-2xl text-center border ${selected === item.amount ? 'bg-purple-600 border-transparent' : 'bg-white/5 border-white/5'}`}>{item.price}</div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* STEP 4: Metode Bayar */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-xs font-black italic shadow-[0_0_20px_rgba(168,85,247,0.4)]">04</div>
            <label className="text-xs font-black text-white uppercase tracking-[0.2em]">Metode Bayar</label>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((pm) => (
              <button key={pm.id} type="button" onClick={() => setPayment(pm.id)} className={`w-full p-5 rounded-[2rem] flex items-center justify-between border-2 transition-all ${payment === pm.id ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'}`}>
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

        {/* Sticky Action Button */}
        <div className="sticky bottom-8 z-50 px-4">
          <button type="button" onClick={handlePayment} disabled={loading} className={`w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-xs flex items-center justify-center gap-4 transition-all shadow-2xl ${loading ? 'bg-gray-900 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:scale-95'}`}>
            {loading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> : <><FaDiscord size={18} /> BELI SEKARANG</>}
          </button>
        </div>
      </motion.div>
    </main>
  );
}