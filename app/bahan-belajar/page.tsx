"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fredoka, Kalam, Roboto, Salsa } from "next/font/google";
import { useMusic } from "../music-context"; 

// Konfigurasi Font
const kalam = Kalam({ weight: "400", subsets: ["latin"] });
const fredoka = Fredoka({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const salsa = Salsa({ weight: "400", subsets: ["latin"] });

interface MenuButtonProps {
  href: string;
  title: string;
  desc: string;
  bgGradient: string;
  shadowColor: string;
  iconBg: string;
  number: string;
}

export default function Home() {
  // Ambil isPlaying dan toggleMusic dari Context
  const { playClickSound, toggleMusic, isPlaying } = useMusic();

  // === LOGIKA DETEKSI LANDSCAPE ===
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(isMobile && portrait);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const prefix = process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '';

  const MenuButton = ({
    href,
    title,
    desc,
    bgGradient,
    shadowColor,
    iconBg,
    number,
  }: MenuButtonProps) => (
    <Link
      href={href}
      onClick={playClickSound}
      className="group relative w-full max-w-[480px] md:max-w-[520px] transform transition-transform active:scale-[0.98]"
    >
      <div className={`absolute inset-0 rounded-2xl translate-y-1.5 md:translate-y-2 ${shadowColor}`}></div>
      <div className={`relative rounded-2xl p-3 md:p-4 flex items-center gap-4 md:gap-5 ${bgGradient} border-[2px] border-white/30 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 shadow-lg`}>
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full shadow-inner ${iconBg} border-[3px] border-white/30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
          <span className={`text-white text-xl md:text-2xl font-extrabold ${salsa.className} drop-shadow-sm`}>{number}</span>
        </div>
        <div className="flex flex-col flex-grow z-10 text-left">
          <h3 className={`text-xl md:text-2xl font-bold text-white leading-none mb-1 ${salsa.className} drop-shadow-sm`}>{title}</h3>
          <p className="text-white/90 text-[11px] md:text-sm font-medium leading-tight line-clamp-1">{desc}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <main className={`relative w-full min-h-screen flex flex-col items-center ${fredoka.className} py-4 overflow-hidden`}>
      
      {/* === PESAN PERINTAH ROTASI HP === */}
      {isPortrait && (
        <div className="fixed inset-0 z-[9999] bg-[#FF9F1C] flex flex-col items-center justify-center p-6 text-center">
          <div className="relative w-24 h-24 mb-6 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l2-2m0 0l-2-2m2 2H10" />
            </svg>
            <div className="absolute inset-0 w-full h-full border-4 border-white/30 rounded-xl rotate-90 scale-75 border-dashed"></div>
          </div>

          <h2 className={`text-3xl md:text-4xl font-extrabold text-white mb-4 ${salsa.className}`}>
            MIRINGKAN LAYARMU!
          </h2>
          
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border-2 border-white/40 shadow-2xl max-w-sm">
            <p className="text-white text-lg font-medium leading-relaxed">
              Hai! Agar belajarnya lebih asyik dan semua tombol terlihat jelas, 
              silakan <span className="text-yellow-200 underline font-bold">aktifkan rotasi layar</span> dan 
              putar HP-mu ke posisi <span className="font-bold text-white">Landscape.</span>
            </p>
          </div>
        </div>
      )}

      {/* BACKGROUND IMAGE */}
      <Image src={`${prefix}/menu.png`} alt="Latar Belakang Menu" fill priority className="object-cover -z-10 fixed" />

      {/* TOMBOL POJOK KANAN ATAS */}
      <div className="absolute top-4 right-4 z-30 flex flex-row md:flex-col gap-3">
        <Link href="/bahan-belajar/identitas-penyusun" onClick={playClickSound} className="bg-white hover:bg-yellow-50 p-2 md:p-2.5 rounded-xl shadow-md active:scale-95 transition-all border border-orange-200">
          <Image src={`${prefix}/identitas.png`} alt="Identitas" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
        </Link>
        <Link href="/bahan-belajar/petunjuk-penggunaan" onClick={playClickSound} className="bg-white hover:bg-yellow-50 p-2 md:p-2.5 rounded-xl shadow-md active:scale-95 transition-all border border-orange-200">
          <Image src={`${prefix}/maps.gif`} alt="Petunjuk" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" unoptimized />
        </Link>
      </div>

      {/* ISI UTAMA */}
      <div className="flex flex-col items-center justify-center w-full min-h-[90vh] gap-6 md:gap-8">
        <div className="relative z-10 text-center animate-fade-in-down">
          <div className="relative bg-[#FF9F1C] border-[4px] border-white shadow-md rounded-full py-2 px-10 md:py-3 md:px-14 transform -rotate-2">
            <h1 className={`text-3xl md:text-5xl font-extrabold text-white tracking-wider ${salsa.className}`}>MAIN MENU</h1>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 w-full px-4">
          {/* Menu 01 */}
          <MenuButton 
            href="/bahan-belajar/cp-dan-tp" 
            title="CP dan TP" 
            desc="Capaian & Tujuan Pembelajaran" 
            number="01" 
            bgGradient="bg-gradient-to-r from-[#00C6FF] to-[#0072FF]" 
            shadowColor="bg-[#005bb5]" 
            iconBg="bg-white/20" 
          />

          {/* Menu 02 - DIUBAH MENJADI MATERI PEMBELAJARAN */}
          <MenuButton 
            href="/bahan-belajar/video" 
            title="Materi Pembelajaran" 
            desc="Video Seru & Materi Interaktif" 
            number="02" 
            bgGradient="bg-gradient-to-r from-[#FF512F] to-[#DD2476]" 
            shadowColor="bg-[#a30f45]" 
            iconBg="bg-white/20" 
          />

          {/* Menu 03 */}
          <MenuButton 
            href="/bahan-belajar/permainan" 
            title="Game" 
            desc="Mainkan misi sambil belajar" 
            number="03" 
            bgGradient="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]" 
            shadowColor="bg-[#320096]" 
            iconBg="bg-white/20" 
          />
        </div>
      </div>

      {/* Tombol Musik */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          playClickSound();
          toggleMusic();
        }} 
        className="absolute bottom-5 right-5 z-50 bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl hover:scale-110 transition-all duration-300 border-2 border-white/30"
      >
        <span className="text-3xl">{isPlaying ? "🔊" : "🔇"}</span>
      </button>
    </main>
  );
}