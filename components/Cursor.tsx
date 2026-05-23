/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Posisi kursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Efek pegas supaya gerakannya mulus/smooth
  const springConfig = { damping: 30, stiffness: 500 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Update posisi kursor
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Deteksi elemen di bawah kursor
      const target = e.target as HTMLElement;
      const isClickable = 
        target.closest('button') || 
        target.closest('a') || 
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Penting: Cegah render di server (SSR)
  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        /* Sembunyikan kursor asli secara menyeluruh */
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Container Kursor - Pastikan Z-Index paling tinggi! */}
      <div className="fixed inset-0 pointer-events-none z-[99999]">
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="relative flex items-center justify-center"
        >
          {/* Lingkaran Luar (Bisa membesar saat hover) */}
          <motion.div
            animate={{ 
              width: isHovered ? 60 : 32,
              height: isHovered ? 60 : 32,
              borderColor: isHovered ? '#a855f7' : '#ffffff',
              backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255, 255, 255, 0)'
            }}
            className="rounded-full border border-white/50 flex items-center justify-center transition-colors duration-300"
          >
            {/* Titik Tengah (Crosshair) */}
            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
            
            {/* Garis Horizontal */}
            {!isHovered && <div className="absolute w-4 h-[1px] bg-white/40" />}
            {/* Garis Vertikal */}
            {!isHovered && <div className="absolute h-4 w-[1px] bg-white/40" />}
          </motion.div>
          
          {/* Efek Cahaya (Glow) */}
          <motion.div 
             animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.6 : 0.3 }}
             className="absolute w-8 h-8 bg-purple-500 blur-xl rounded-full -z-10"
          />
        </motion.div>
      </div>
    </>
  );
}