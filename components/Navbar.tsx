/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaXmark, FaMagnifyingGlass, FaUser, FaRocket, FaGear } from 'react-icons/fa6';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false); // State baru untuk Pop-up
  const pathname = usePathname();

  // Deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      const isOverThreshold = window.scrollY > 20;
      setScrolled((prev) => {
        if (prev !== isOverThreshold) return isOverThreshold;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman
  useEffect(() => {
    setIsOpen((prev) => {
      if (prev === true) return false;
      return prev;
    });
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Roblox', href: '/roblox' },
    { name: 'Free Fire', href: '/freefire' },
    { name: 'Mobile Legends', href: '/mobilelegends' },
    { name: 'Cek Pesanan', href: '/check-status', highlight: true },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled 
          ? 'bg-black/80 backdrop-blur-2xl border-b border-purple-500/20 py-3' 
          : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* --- LOGO SECTION --- */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group relative z-[110]">
                <div className="w-12 h-12 relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-black border border-purple-500/30 rounded-2xl p-1.5 group-hover:border-purple-500 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center justify-center">
                  <Image 
                    src="/logo.png" 
                    alt="LunarStore Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
                    priority
                  />
                  <span className="absolute inset-0 flex items-center justify-center font-black italic text-xl text-purple-500/20 group-hover:text-purple-500/40 transition-colors z-0">L</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter italic uppercase leading-none text-white">
                    LUNAR<span className="text-purple-500">STORE</span>
                  </span>
                  <span className="text-[7px] font-black tracking-[0.4em] text-purple-400/60 uppercase mt-1">Topup Game Tercepat</span>
                </div>
              </Link>
            </div>

            {/* --- DESKTOP MENU --- */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center space-x-1 bg-white/[0.03] border border-white/5 p-1.5 rounded-2xl backdrop-blur-md">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.1em] transition-all rounded-xl flex items-center gap-2 relative group ${
                        isActive 
                        ? "text-white bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
                        : link.highlight 
                          ? "text-purple-400 hover:text-purple-300" 
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.highlight && <FaMagnifyingGlass size={10} className={isActive ? "" : "animate-pulse"} />}
                      {link.name}
                      {!isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-purple-500 transition-all group-hover:w-1/2"></span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="h-8 w-[1px] bg-white/10 mx-3"></div>
              
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-white text-black hover:bg-purple-600 hover:text-white px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all active:scale-95 shadow-xl group"
              >
                <FaUser className="group-hover:rotate-12 transition-transform" />
                LOGIN
              </button>
            </div>

            {/* --- MOBILE BUTTON --- */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/10 transition-all relative z-[110]"
              >
                {isOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-3xl border-b border-purple-500/20 overflow-hidden"
            >
              <div className="px-6 pt-4 pb-8 space-y-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        isActive 
                        ? "bg-purple-600 border-purple-400 text-white" 
                        : "bg-white/5 border-white/5 text-gray-400"
                      }`}
                    >
                      <span className="text-xs font-black uppercase tracking-widest">{link.name}</span>
                      {link.highlight && <FaMagnifyingGlass size={14} className="text-purple-400" />}
                    </Link>
                  );
                })}
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setShowModal(true);
                    }}
                    className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95"
                  >
                    <FaUser /> MASUK KE AKUN
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- POP-UP MODAL (COMING SOON) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-purple-500/30 rounded-[2.5rem] p-8 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)] text-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              
              <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                <FaRocket className="text-purple-500 text-3xl animate-bounce" />
                <FaGear className="absolute -top-1 -right-1 text-purple-400 text-xl animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
                COMING <span className="text-purple-500">SOON!</span>
              </h2>
              
              <p className="text-gray-400 text-xs font-bold leading-relaxed uppercase tracking-widest mb-8">
                Fitur Member sedang dikembangkan. <br />
                <span className="text-purple-400">Tunggu kejutan dari Lunar Store!</span>
              </p>

              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-purple-600 hover:text-white transition-all active:scale-95"
              >
                OKE, SIAP BANG!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;