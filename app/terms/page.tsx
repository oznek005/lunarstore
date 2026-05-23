'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaShieldHalved, FaArrowLeft, FaCircleCheck } from 'react-icons/fa6';

export default function TermsPage() {
  const router = useRouter();

  const rules = [
    { title: "Proses Pengisian", desc: "Semua pesanan diproses secara manual atau otomatis setelah pembayaran terverifikasi oleh sistem kami." },
    { title: "Tanggung Jawab Data", desc: "Pembeli wajib memastikan data akun (Player ID, Zone ID, Username, Password) ditulis dengan benar. Kesalahan input data oleh pembeli bukan tanggung jawab Lunar Store." },
    { title: "Keamanan Akun (Roblox)", desc: "Untuk top-up via login, pembeli diwajibkan mengamankan akun terlebih dahulu dan disarankan mengubah password setelah proses top-up dinyatakan selesai." },
    { title: "Kebijakan Pengembalian", desc: "Pesanan yang sudah diproses dan masuk ke dalam akun game tidak dapat dibatalkan atau direfund dengan alasan apa pun." }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 pt-28 pb-32 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-8"
      >
        {/* Tombol Kembali */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-purple-500 transition-colors uppercase tracking-widest"
        >
          <FaArrowLeft /> Kembali
        </button>

        {/* HEADER */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center relative z-10 shrink-0">
            <FaShieldHalved className="text-purple-500 text-2xl" />
          </div>
          <div className="text-center sm:text-left relative z-10">
            <h1 className="text-2xl font-black tracking-tight uppercase leading-none">
              Terms & <span className="text-purple-500">Conditions</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mt-2 uppercase">
              Syarat & Ketentuan Layanan Lunar Store
            </p>
          </div>
        </section>

        {/* DAFTAR ATURAN */}
        <section className="bg-[#0c0c0c] rounded-[3rem] border border-white/5 p-8 md:p-10 shadow-xl space-y-6">
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Dengan melakukan transaksi di website **Lunar Store**, Anda dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan layanan di bawah ini:
          </p>

          <div className="space-y-6 pt-4 border-t border-white/5">
            {rules.map((rule, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="mt-1 shrink-0">
                  <FaCircleCheck className="text-purple-500 text-sm" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-200">{rule.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">
            LunarStore • Terakhir diperbarui Mei 2026
          </p>
        </div>
      </motion.div>
    </main>
  );
}