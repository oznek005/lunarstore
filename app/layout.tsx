import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Komponen Global
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Komponen Efek
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LunarStore - Top Up Instant 24/7",
  description: "Layanan Top Up Game Tercepat, Aman, dan Terpercaya dengan proses otomatis 24 jam.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1", // Mencegah zoom otomatis di input iOS
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <body 
        className={`${inter.className} bg-[#050505] text-white antialiased selection:bg-purple-500/30 selection:text-purple-200 min-h-screen relative overflow-x-hidden`}
      >
        {/* 1. Global Custom Cursor */}
        <Cursor />

        {/* 2. Global Overlay & Background Effects */}
        {/* Noise Texture - diletakkan di bawah Navbar agar menu tetap tajam */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[80] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Subtle Ambient Glows - Tetap di background paling belakang (-z-10) */}
        <div className="fixed -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="fixed -top-[5%] -right-[5%] w-[30%] h-[30%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* 3. Main Structure */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Navbar diletakkan di luar PageTransition agar tidak ikut beranimasi saat pindah halaman */}
          <Navbar />
          
          <PageTransition>
            {/* Padding Top disesuaikan agar konten tidak tertutup fixed navbar */}
            <main className="flex-grow pt-4">
              {children}
            </main>
          </PageTransition>

          <Footer />
        </div>

        {/* 4. Background Pattern (Optional - Grid halus agar makin dev-style) */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      </body>
    </html>
  );
}