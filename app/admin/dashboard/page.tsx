'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBox, FaWallet, FaUsers, FaChartLine, 
  FaCheck, FaXmark, FaRotate, FaEllipsisVertical 
} from 'react-icons/fa6';

export default function AdminPro() {
  const [activeTab, setActiveTab] = useState('Semua');

  const stats = [
    { label: 'Total Omzet', value: 'Rp 12.450.000', icon: <FaWallet />, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Pesanan Baru', value: '48', icon: <FaBox />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Total User', value: '1,240', icon: <FaUsers />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Profit (30d)', value: '+24%', icon: <FaChartLine />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  const orders = [
    { id: 'LUNAR-8812', user: 'Reyhan7x', game: 'Roblox', nominal: '1700 Robux', price: 'Rp 260.000', status: 'Pending', time: '5m ago' },
    { id: 'LUNAR-8811', user: 'VinzStore', game: 'Free Fire', nominal: '720 DM', price: 'Rp 100.000', status: 'Proses', time: '12m ago' },
    { id: 'LUNAR-8810', user: 'GamerID', game: 'MLBB', nominal: '257 DM', price: 'Rp 65.000', status: 'Sukses', time: '1h ago' },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 lg:p-12 pt-32 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
            CONTROL <span className="text-purple-500">CENTER</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">LunarStore Management System v2.0</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all">
                <FaRotate className="text-purple-500 animate-spin-slow" />
            </button>
            <button className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-2xl text-[10px] font-black tracking-widest uppercase shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                Download Report
            </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-purple-500/30 transition-all"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${s.bg} blur-[50px] -z-0 opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-6 text-xl`}>
              {s.icon}
            </div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-2xl font-black tracking-tighter italic">{s.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {['Semua', 'Pending', 'Proses', 'Sukses'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all ${
                  activeTab === tab ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
             <input type="text" placeholder="Cari Invoice / User..." className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-bold tracking-widest outline-none focus:border-purple-500 transition-all w-full md:w-64" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 border-b border-white/5">
                <th className="p-8">Transaction</th>
                <th className="p-8">Customer</th>
                <th className="p-8">Product</th>
                <th className="p-8 text-center">Status</th>
                <th className="p-8 text-right">Amount</th>
                <th className="p-8"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-8">
                    <p className="font-mono text-purple-400 font-bold tracking-widest">{order.id}</p>
                    <p className="text-[9px] text-gray-600 font-black uppercase mt-1">{order.time}</p>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-[10px] font-black italic">
                          {order.user.charAt(0)}
                       </div>
                       <span className="text-sm font-bold text-gray-200">{order.user}</span>
                    </div>
                  </td>
                  <td className="p-8">
                    <p className="text-xs font-black uppercase italic tracking-tighter">{order.game}</p>
                    <p className="text-[10px] text-gray-500 font-bold">{order.nominal}</p>
                  </td>
                  <td className="p-8">
                    <div className={`mx-auto w-fit px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                      order.status === 'Sukses' ? 'bg-green-500/10 text-green-500' :
                      order.status === 'Proses' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-current ${order.status === 'Pending' ? 'animate-pulse' : ''}`}></span>
                      {order.status}
                    </div>
                  </td>
                  <td className="p-8 text-right font-black italic text-md text-white">
                    {order.price}
                  </td>
                  <td className="p-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-3 bg-green-600/20 text-green-500 rounded-xl hover:bg-green-600 hover:text-white transition-all"><FaCheck size={12}/></button>
                       <button className="p-3 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"><FaXmark size={12}/></button>
                       <button className="p-3 bg-white/5 text-gray-400 rounded-xl"><FaEllipsisVertical size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <style jsx>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}