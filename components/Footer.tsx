'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaDiscord, FaInstagram, FaWhatsapp, FaShieldHalved, FaArrowUp } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden relative z-50 mt-auto">
      {/* Background Decor - Glow Ungu di bawah */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-purple-600/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl flex items-center justify-center font-black italic text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] text-white transform group-hover:rotate-12 transition-transform">
                L
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter italic uppercase group-hover:text-purple-400 transition-colors text-white">
                  LUNAR<span className="text-purple-500 group-hover:text-white transition-colors">STORE</span>
                </span>
                <span className="text-[7px] font-black tracking-[0.4em] text-purple-400/50 uppercase">Topup Game Tercepat</span>
              </div>
            </Link>
            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed max-w-sm">
              Platform top-up game tercepat, teraman, dan terpercaya di Indonesia. Otomatisasi 24/7 untuk pengalaman gaming tanpa batas.
            </p>
            <div className="flex items-center gap-4">
              {/* Ganti URL sosmed di sini */}
              <a href="#" target="_blank" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all text-gray-400 border border-white/5">
                <FaInstagram size={18} />
              </a>
              <a href="#" target="_blank" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#5865F2] hover:text-white transition-all text-gray-400 border border-white/5">
                <FaDiscord size={18} />
              </a>
              <a href="#" target="_blank" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all text-gray-400 border border-white/5">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8 border-l-2 border-purple-500 pl-4">Navigasi</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <li><Link href="/" className="hover:text-purple-500 transition-colors">Home</Link></li>
              <li><Link href="/check-status" className="hover:text-purple-500 transition-colors">Lacak Pesanan</Link></li>
              <li><Link href="/terms" className="hover:text-purple-500 transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="relative">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8 border-l-2 border-purple-500 pl-4">Dukungan</h4>
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm relative group">
              <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-4 leading-relaxed">
                Ada kendala? Hubungi Customer Service kami yang siap membantu 24/7.
              </p>
              <a href="https://wa.me/628123456789" target="_blank" className="text-[9px] font-black text-purple-400 hover:text-white transition-all flex items-center gap-2 group/btn">
                WHATSAPP ADMIN <FaWhatsapp className="group-hover/btn:scale-125 transition-transform text-green-500" />
              </a>
            </div>
            
            {/* Scroll to Top Button */}
            <button 
              onClick={scrollToTop}
              className="absolute -top-12 right-0 w-8 h-8 bg-purple-600/10 hover:bg-purple-600 text-purple-500 hover:text-white rounded-lg flex items-center justify-center transition-all border border-purple-500/20 active:scale-90"
              title="Kembali ke atas"
            >
              <FaArrowUp size={12} />
            </button>
          </div>
        </div>

        {/* --- PAYMENT METHODS LOGOS --- */}
        <div className="border-y border-white/5 py-10 mb-10 overflow-hidden bg-black/20">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-10 md:gap-x-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 px-6">
            
            {/* QRIS */}
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" 
              alt="QRIS" width={100} height={30} 
              className="h-6 w-auto object-contain invert brightness-[10]" 
            />
            
            {/* DANA */}
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" 
              alt="DANA" width={85} height={25} 
              className="h-5 w-auto object-contain" 
            />

            {/* GOPAY - Pakai Invert agar tulisan 'gopay' jadi putih */}
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" 
              alt="GOPAY" width={85} height={25} 
              className="h-5 w-auto object-contain invert brightness-200" 
            />

            {/* OVO */}
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg" 
              alt="OVO" width={85} height={25} 
              className="h-5 w-auto object-contain" 
            />

            {/* LINKAJA */}
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/8/85/LinkAja.svg" 
              alt="LinkAja" width={40} height={40} 
              className="h-6 w-auto object-contain" 
            />

            {/* BCA - Pakai brightness tinggi agar logo biru mudanya neon */}
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" 
              alt="BCA" width={85} height={25} 
              className="h-5 w-auto object-contain brightness-[5]" 
            />

            {/* MANDIRI - Pakai invert agar tulisan mandiri jadi putih */}
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" 
              alt="Mandiri" width={85} height={25} 
              className="h-5 w-auto object-contain invert brightness-200" 
            />

            {/* PAYPAL */}
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
              alt="PayPal" width={85} height={25} 
              className="h-6 w-auto object-contain brightness-200" 
            />
          </div>
        </div>

                {/* --- COPYRIGHT SECTION --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] text-center md:text-left leading-relaxed">
                    © {currentYear} LUNAR STORE. ALL RIGHTS RESERVED.
                  </p>
                  <div className="flex items-center gap-2 text-[9px] font-black text-gray-700 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                    <FaShieldHalved className="text-purple-500" /> Secure Payment Gateway
                  </div>
                </div>
              </div>
            </footer>
          );
        };

        export default Footer;