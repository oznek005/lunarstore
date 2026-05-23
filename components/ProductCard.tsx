'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCircleCheck, FaBolt } from 'react-icons/fa6';

interface ProductProps {
  id: string;
  name: string;
  price: string;
  category: string;
  isSelected: boolean;
  onSelect: () => void;
  isPopular?: boolean; // Untuk tanda "Terlaris"
}

export default function ProductCard({ id, name, price, category, isSelected, onSelect, isPopular }: ProductProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative p-5 rounded-[2rem] border-2 transition-all cursor-pointer overflow-hidden group ${
        isSelected 
        ? "border-purple-500 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.25)]" 
        : "border-white/5 bg-white/[0.03] hover:border-white/20"
      }`}
    >
      {/* Efek Cahaya Glow di Pojok (Hanya Muncul saat Dipilih) */}
      {isSelected && (
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500 blur-[40px] opacity-40"></div>
      )}

      {/* Tag Populer / Terlaris */}
      {isPopular && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-[8px] font-black px-2 py-1 rounded-full flex items-center gap-1 text-black uppercase tracking-tighter shadow-lg">
          <FaBolt /> Terlaris
        </div>
      )}

      <div className="flex flex-col gap-1 relative z-10">
        <span className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${isSelected ? "text-purple-400" : "text-gray-500"}`}>
          {category}
        </span>
        
        <h3 className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">
          {name}
        </h3>

        {/* Garis Dekorasi yang Memanjang saat Hover */}
        <div className={`h-[2px] rounded-full my-3 transition-all duration-500 ${isSelected ? "w-full bg-purple-500" : "w-8 bg-white/10 group-hover:w-16"}`}></div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Rp</span>
          <span className={`text-lg font-black tracking-tight ${isSelected ? "text-white" : "text-gray-300"}`}>
            {price}
          </span>
        </div>
      </div>

      {/* Ikon Centang Animasi */}
      {isSelected && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="absolute bottom-4 right-4 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
        >
          <FaCircleCheck size={20} />
        </motion.div>
      )}
    </motion.div>
  );
}