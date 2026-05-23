'use client';

export default function RunningOrder() {
  const orders = [
    "💎 86 Diamonds sukses dikirim ke ID 123*** (2024)",
    "📦 1000 Robux sukses dikirim ke User Lunar***",
    "🔥 355 Diamonds sukses dikirim ke ID 992*** (8821)",
    "💎 706 Diamonds sukses dikirim ke ID 441*** (2102)",
    "📦 500 Robux sukses dikirim ke User Gaming***",
  ];

  return (
    <div className="w-full bg-purple-600/10 border-y border-purple-500/20 py-2 overflow-hidden whitespace-nowrap relative z-40">
      <div className="flex animate-marquee gap-10 items-center">
        {/* Render dua kali agar looping tidak terputus */}
        {[...orders, ...orders].map((order, i) => (
          <span key={i} className="text-[10px] font-black uppercase tracking-widest text-purple-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            {order}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}