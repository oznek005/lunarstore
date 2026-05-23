'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { 
  FaCube, FaFire, FaShieldHalved, FaRocket, FaCheck, 
  FaStar, FaBoltLightning, FaDiscord, FaArrowRight 
} from 'react-icons/fa6';

// --- KOMPONEN RUNNING ORDER (OPTIMIZED) ---
const RunningOrder = () => {
  const orders = [
    "💎 86 Diamonds sukses dikirim ke ID 123*** (2026)",
    "📦 1000 Robux sukses dikirim ke User Lunar***",
    "🔥 355 Diamonds sukses dikirim ke ID 992*** (8821)",
    "💎 706 Diamonds sukses dikirim ke ID 441*** (2102)",
    "📦 500 Robux sukses dikirim ke User Gaming***",
  ];

  return (
    <div className="w-full bg-purple-600/5 backdrop-blur-md border-y border-white/5 py-4 overflow-hidden whitespace-nowrap relative z-20">
      <div className="flex animate-marquee gap-12 items-center">
        {[...orders, ...orders, ...orders].map((order, i) => (
          <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400/80 flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
            {order}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const games = [
    { name: "Roblox", slug: "/roblox", image: "/roblox.png", icon: <FaCube className="text-3xl text-red-500" />, border: "hover:border-red-500/50", desc: "Robux Murah & Legal", badge: "Best Seller" },
    { name: "Free Fire", slug: "/freefire", image: "/ff.png", icon: <FaFire className="text-3xl text-orange-500" />, border: "hover:border-orange-500/50", desc: "Diamond FF Instant 24/7", badge: "Promo" },
    { name: "Mobile Legends", slug: "/mobilelegends", image: "/ml.png", icon: <FaShieldHalved className="text-3xl text-purple-500" />, border: "hover:border-purple-500/50", desc: "Diamond MLBB Hemat", badge: "Populer" }
  ];

  const otherServices = [
    { name: "Valorant", cat: "PC Game", benefit: "Region ID Instant", color: "bg-red-500", link: "https://discord.gg/Ke7dV9xNZX" },
    { name: "Point Blank", cat: "PC Game", benefit: "Stok Selalu Ready", color: "bg-blue-400", link: "https://discord.gg/Ke7dV9xNZX" },
    { name: "Blood Strike", cat: "Mobile", benefit: "Instan via ID", color: "bg-yellow-500", link: "https://discord.gg/Ke7dV9xNZX" },
    { name: "PUBG Mobile", cat: "Mobile", benefit: "UC via ID / Login", color: "bg-green-500", link: "https://discord.gg/Ke7dV9xNZX" },
  ];

  return (
    <>
      {/* Hero Section Padding adjusted for Sticky Navbar */}
      <div className="pt-24 bg-[#050505]">
        <RunningOrder />
      </div>

      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-6 pt-20 relative overflow-hidden">
        
        {/* Ambient Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full -z-10"></div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-8 backdrop-blur-md">
            <FaBoltLightning className="animate-pulse" /> Fast & Automated System
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter uppercase italic leading-[0.85]">
            LUNAR<span className="text-purple-500">STORE</span>
          </h1>
          <p className="text-gray-500 font-bold max-w-xl mx-auto text-xs md:text-sm uppercase tracking-widest leading-relaxed opacity-80">
            Pusat Topup Game Termurah dengan sistem otomatis yang bekerja 24 jam nonstop untuk kenyamanan gaming Anda.
          </p>
        </motion.div>

        {/* --- MAIN GAMES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl relative mb-44 z-10 px-4">
          {games.map((game, index) => (
            <motion.div 
              key={game.slug} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={game.slug} className="group relative block">
                <div className="absolute -top-3 -right-3 z-30 bg-purple-600 text-[10px] font-black px-5 py-2 rounded-xl shadow-2xl uppercase tracking-widest transform group-hover:scale-110 transition-transform">
                  {game.badge}
                </div>
                <div className={`bg-[#0c0c0c]/80 rounded-[3.5rem] border border-white/5 transition-all duration-700 backdrop-blur-xl group-hover:-translate-y-6 overflow-hidden ${game.border} group-hover:shadow-[0_30px_60px_-15px_rgba(168,85,247,0.2)]`}>
                  <div className="w-full h-80 relative overflow-hidden">
                    <Image src={game.image} alt={game.name} fill className="object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 p-5 bg-black/80 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl group-hover:border-purple-500/50 transition-colors">
                      {game.icon}
                    </div>
                  </div>
                  <div className="p-10 pt-6">
                    <h2 className="text-4xl font-black text-white mb-3 uppercase italic group-hover:text-purple-400 transition-colors tracking-tighter">{game.name}</h2>
                    <p className="text-[11px] text-gray-500 mb-10 leading-relaxed font-bold uppercase tracking-widest">{game.desc}</p>
                    <div className="flex items-center gap-3 text-purple-500 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-all">
                      Order Instant <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* --- OTHER SERVICES --- */}
        <section className="w-full max-w-7xl mx-auto px-4 mb-44">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.5em] mb-3">Manual Order</h2>
              <h3 className="text-5xl font-black italic uppercase tracking-tighter">Support <span className="text-white/20">All Games</span></h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {otherServices.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm transition-all hover:bg-purple-600/5 hover:border-purple-500/40">
                  <div className={`${item.color} w-10 h-1 rounded-full mb-6 shadow-[0_0_12px_currentColor]`}></div>
                  <h4 className="text-xl font-black italic uppercase tracking-tighter text-white group-hover:text-purple-400 transition-colors mb-1">{item.name}</h4>
                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-6">{item.cat}</p>
                  <div className="flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                     <span className="text-[9px] font-bold text-gray-400 italic">Manual</span>
                     <FaDiscord size={18} />
                  </div>
                </a>
              </motion.div>
            ))}

            <motion.a 
              href="https://discord.gg/Ke7dV9xNZX" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }} 
              className="lg:col-span-1 group overflow-hidden bg-gradient-to-br from-purple-900/50 to-black p-8 rounded-[2.5rem] flex flex-col justify-center border border-purple-500/20 backdrop-blur-xl relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaDiscord size={80} />
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-black uppercase tracking-tighter italic text-white mb-2 leading-tight">Lainnya?</h4>
                <p className="text-[9px] text-purple-300 font-bold uppercase tracking-[0.2em] underline decoration-purple-500/50 underline-offset-4">
                  Request via Discord
                </p>
              </div>
            </motion.a>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section className="w-full max-w-7xl mx-auto px-4 mb-44">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.5em] mb-4">Vouched & Trusted</h2>
            <h3 className="text-6xl font-black italic uppercase tracking-tighter">Review <span className="text-white/20">Customer</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Arkan ", role: "MLBB Player", text: "Gila sih, baru klik konfirmasi di web, eh 2 menit kemudian Diamond ML langsung masuk. Adminnya juga ramah banget!", color: "text-purple-500", bg: "bg-purple-500/10", initials: "AG" },
              { name: "Bayu", role: "Roblox Trader", text: "Awalnya ragu karena harganya murah banget, ternyata emang legit parah. Robux langsung landing aman bosku!", color: "text-red-500", bg: "bg-red-500/10", initials: "KB" },
              { name: "Fajar", role: "Free Fire", text: "Tampilan webnya simpel dan ga ribet. Pilihan pembayaran QRIS-nya lancar jaya. Langganan terus di LunarStore!", color: "text-orange-500", bg: "bg-orange-500/10", initials: "FF" }
            ].map((testi, index) => (
              <motion.div key={index} whileHover={{ y: -8 }} className="bg-[#0c0c0c] p-12 rounded-[3.5rem] border border-white/5 hover:border-purple-500/20 transition-all relative overflow-hidden group">
                <div className="flex gap-1 mb-8 text-yellow-500/60 group-hover:text-yellow-500 transition-colors">
                  <FaStar size={10} /><FaStar size={10} /><FaStar size={10} /><FaStar size={10} /><FaStar size={10} />
                </div>
                <p className="text-gray-400 text-sm font-medium italic mb-12 leading-relaxed">&quot;{testi.text}&quot;</p>
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 ${testi.bg} rounded-2xl flex items-center justify-center font-black ${testi.color} text-xl border border-white/5`}>{testi.initials}</div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{testi.name}</h4>
                    <p className="text-[8px] text-gray-700 font-black uppercase tracking-[0.3em]">{testi.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}