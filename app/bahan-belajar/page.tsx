"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fredoka, Salsa } from "next/font/google";
import { useMusic } from "../music-context"; 

const fredoka = Fredoka({ weight: "400", subsets: ["latin"] });
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
  const { playClickSound, toggleMusic, isPlaying } = useMusic();
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
      {isPortrait && (
        <div className="fixed inset-0 z-[9999] bg-[#FF9F1C] flex flex-col items-center justify-center p-6 text-center text-white">
          <h2 className={`text-3xl font-extrabold mb-4 ${salsa.className}`}>MIRINGKAN LAYARMU!</h2>
          <p>Gunakan posisi Landscape untuk tampilan terbaik.</p>
        </div>
      )}

      <Image src={`${prefix}/menu.png`} alt="Menu BG" fill priority className="object-cover -z-10 fixed" />

      <div className="absolute top-4 right-4 z-30 flex gap-3">
        <Link href="/bahan-belajar/identitas-penyusun" onClick={playClickSound} className="bg-white p-2 rounded-xl shadow-md">
          <Image src={`${prefix}/identitas.png`} alt="Identitas" width={24} height={24} />
        </Link>
        <Link href="/bahan-belajar/petunjuk-penggunaan" onClick={playClickSound} className="bg-white p-2 rounded-xl shadow-md">
          <Image src={`${prefix}/maps.gif`} alt="Petunjuk" width={24} height={24} unoptimized />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full min-h-[90vh] gap-6 md:gap-8">
        <div className="relative z-10 text-center">
          <div className="relative bg-[#FF9F1C] border-[4px] border-white shadow-md rounded-full py-2 px-10 transform -rotate-2">
            <h1 className={`text-3xl md:text-5xl font-extrabold text-white tracking-wider ${salsa.className}`}>MAIN MENU</h1>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 w-full px-4">
          <MenuButton href="/bahan-belajar/cp-dan-tp" title="CP dan TP" desc="Capaian & Tujuan Pembelajaran" number="01" bgGradient="bg-gradient-to-r from-[#00C6FF] to-[#0072FF]" shadowColor="bg-[#005bb5]" iconBg="bg-white/20" />
          <MenuButton href="/bahan-belajar/video" title="Materi Pembelajaran" desc="Video & Materi Interaktif" number="02" bgGradient="bg-gradient-to-r from-[#FF512F] to-[#DD2476]" shadowColor="bg-[#a30f45]" iconBg="bg-white/20" />
          <MenuButton href="/bahan-belajar/permainan" title="Game" desc="Mainkan misi sambil belajar" number="03" bgGradient="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]" shadowColor="bg-[#320096]" iconBg="bg-white/20" />
        </div>
      </div>

      <button 
        onClick={() => toggleMusic()} 
        className="absolute bottom-5 right-5 z-50 bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl border-2 border-white/30"
      >
        <span className="text-3xl">{isPlaying ? "🔊" : "🔇"}</span>
      </button>
    </main>
  );
}