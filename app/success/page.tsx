'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  FaCircleCheck, FaWhatsapp, FaArrowLeft, 
  FaCircleInfo 
} from 'react-icons/fa6';

function SuccessContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'DANA / QRIS';
  const price = searchParams.get('price') || 'Sesuai Nominal';
  const item = searchParams.get('item') || 'Produk';
  const game = searchParams.get('game') || 'Game';
  // Menambahkan pengambilan parameter nama pelanggan
  const customerName = searchParams.get('name') || 'Pelanggan';

  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#a855f7', '#ffffff']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#a855f7', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  // Fungsi pembantu untuk membuat link WA yang mencantumkan nama pembeli
  const getWaLink = (phone: string, adminName: string) => {
    const message = `Halo ${adminName}, saya ${customerName} ingin konfirmasi pembayaran LunarStore.

*Detail Pesanan*:
- Nama: ${customerName}
- Game: ${game}
- Nominal: ${item}
- Harga: ${price}
- Metode: ${method}

Saya telah melakukan pembayaran. Mohon segera diproses.`;
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0d0d0d] w-full max-w-lg rounded-[2.5rem] border border-white/5 p-8 md:p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-3xl"
      >
        {/* --- PROGRESS TRACKER --- */}
        <div className="flex justify-between items-center mb-12 px-4 relative">
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[10px] shadow-[0_0_15px_#22c55e] font-black">1</div>
            <span className="text-[8px] font-black uppercase text-green-500 tracking-tighter">Checkout</span>
          </div>
          <div className="h-[1px] bg-green-500 flex-1 mx-2 mb-6 opacity-30"></div>
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-[10px] animate-bounce shadow-[0_0_15px_#a855f7] font-black">2</div>
            <span className="text-[8px] font-black uppercase text-purple-500 tracking-tighter">Bayar</span>
          </div>
          <div className="h-[1px] bg-gray-800 flex-1 mx-2 mb-6"></div>
          <div className="flex flex-col items-center gap-2 opacity-30 z-10">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-black">3</div>
            <span className="text-[8px] font-black uppercase tracking-tighter">Proses</span>
          </div>
        </div>

        {/* --- CONTENT --- */}
        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
          >
            <FaCircleCheck className="text-green-500 text-4xl" />
          </motion.div>

          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
            Order <span className="text-purple-500">Diterima!</span>
          </h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-10">
            Segera selesaikan pembayaran sebesar: <br/>
            <span className="text-white text-lg mt-2 inline-block bg-white/5 px-4 py-1 rounded-full border border-white/5">{price}</span>
          </p>

          <div className="space-y-4 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 mb-8 text-left">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Metode</label>
              <span className="text-[10px] font-black uppercase text-purple-400">{method}</span>
            </div>
            <div className="h-[1px] bg-white/5 w-full"></div>
            <div>
              <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-4">Scan QRIS Pembayaran</label>
              <div className="bg-white p-4 rounded-3xl flex flex-col items-center border border-white/10">
                <Image src="/qris.png" alt="QRIS" width={200} height={200} className="rounded-2xl" />
                <p className="text-black font-black text-[9px] mt-4 tracking-widest uppercase text-center">Scan untuk membayar<br/>A/N LUNAR STORE</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10 mb-8 text-left">
            <FaCircleInfo className="text-blue-500 mt-1 flex-shrink-0" />
            <p className="text-[9px] text-blue-300/80 font-medium leading-relaxed">
              Setelah transfer, wajib kirim <b>Bukti Pembayaran</b> ke WhatsApp agar pesanan segera diproses sistem kami.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <motion.a 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                href={getWaLink("6281930644172", "Admin 1")}
                target="_blank"
                className="w-full bg-[#25D366]/10 border border-[#25D366] text-[#25D366] font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
              >
                <FaWhatsapp size={16} /> Admin 1
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                href={getWaLink("6283178718514", "Admin 2")}
                target="_blank"
                className="w-full bg-[#25D366]/10 border border-[#25D366] text-[#25D366] font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
              >
                <FaWhatsapp size={16} /> Admin 2
              </motion.a>
            </div>

            <Link href="/" className="flex justify-center items-center gap-2 text-gray-600 hover:text-white text-[9px] font-black transition-colors uppercase tracking-[0.3em] pt-4">
              <FaArrowLeft size={10} /> Kembali Belanja
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-black uppercase tracking-widest animate-pulse">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}