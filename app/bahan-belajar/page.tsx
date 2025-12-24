"use client";
import Image from "next/image";
import Link from "next/link";
import { Fredoka, Kalam, Roboto, Salsa } from "next/font/google";
import { useMusic } from "../music-context";

// Konfigurasi Font
const kalam = Kalam({
  weight: "400",
  subsets: ["latin"],
});
const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const salsa = Salsa({
  weight: "400",
  subsets: ["latin"],
});

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
  const { playClickSound } = useMusic();

  // === LOGIKA PREFIX UNTUK GITHUB PAGES ===
  const prefix = process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '';

  // === KOMPONEN TOMBOL ===
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

      <div 
        className={`relative rounded-2xl p-3 md:p-4 flex items-center gap-4 md:gap-5 ${bgGradient} border-[2px] border-white/30 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 shadow-lg`}
      >
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full shadow-inner ${iconBg} border-[3px] border-white/30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
          <span className={`text-white text-xl md:text-2xl font-extrabold ${salsa.className} drop-shadow-sm`}>
            {number}
          </span>
        </div>

        <div className="flex flex-col flex-grow z-10 text-left">
          <h3
            className={`text-xl md:text-2xl font-bold text-white leading-none mb-1 ${salsa.className} drop-shadow-sm`}
          >
            {title}
          </h3>
          <p className="text-white/90 text-[11px] md:text-sm font-medium leading-tight line-clamp-1">
            {desc}
          </p>
        </div>

        <div className="hidden sm:flex opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <div className="bg-white/20 rounded-full p-1.5 md:p-2 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 md:w-5 md:h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <main
      className={`relative w-full min-h-screen flex flex-col items-center ${fredoka.className} py-4 overflow-hidden`}
    >
      {/* BACKGROUND IMAGE DENGAN PREFIX */}
      <Image
        src={`${prefix}/menu.png`}
        alt="Latar Belakang Menu"
        fill
        priority
        className="object-cover -z-10 fixed"
      />

      {/* === TOMBOL POJOK KANAN ATAS DENGAN PREFIX === */}
      <div className="absolute top-4 right-4 z-30 flex flex-row md:flex-col gap-3">
        <Link
          href="/bahan-belajar/identitas-penyusun"
          onClick={playClickSound}
          className="bg-white hover:bg-yellow-50 p-2 md:p-2.5 rounded-xl shadow-md active:scale-95 transition-all border border-orange-200"
          title="Identitas Penyusun"
        >
          <Image 
            src={`${prefix}/identitas.png`} 
            alt="Identitas" 
            width={24} 
            height={24} 
            className="w-5 h-5 md:w-6 md:h-6" 
          />
        </Link>

        <Link
          href="/bahan-belajar/petunjuk-penggunaan"
          onClick={playClickSound}
          className="bg-white hover:bg-yellow-50 p-2 md:p-2.5 rounded-xl shadow-md active:scale-95 transition-all border border-orange-200"
          title="Petunjuk Penggunaan"
        >
          <Image 
            src={`${prefix}/maps.gif`} 
            alt="Petunjuk" 
            width={24} 
            height={24} 
            className="w-5 h-5 md:w-6 md:h-6" 
            unoptimized 
          />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full min-h-[90vh] gap-6 md:gap-8">
        
        <div className="relative z-10 text-center animate-fade-in-down mt-4 md:mt-0">
          <div className="inline-block relative group cursor-default">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-50 transform scale-105 group-hover:scale-110 transition-transform"></div>
            
            <div className="relative bg-[#FF9F1C] border-[4px] border-white shadow-md rounded-full py-2 px-10 md:py-3 md:px-14 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <h1
                className={`text-3xl md:text-5xl font-extrabold text-white tracking-wider ${salsa.className}`}
                style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}
              >
                MAIN MENU
              </h1>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 w-full px-4">
          <MenuButton
            href="/bahan-belajar/cp-dan-tp"
            title="CP dan TP"
            desc="Capaian & Tujuan Pembelajaran"
            number="01"
            bgGradient="bg-gradient-to-r from-[#00C6FF] to-[#0072FF]"
            shadowColor="bg-[#005bb5]"
            iconBg="bg-white/20"
          />

          <MenuButton
            href="/bahan-belajar/video"
            title="Video Materi"
            desc="Tonton video interaktif seru"
            number="02"
            bgGradient="bg-gradient-to-r from-[#FF512F] to-[#DD2476]"
            shadowColor="bg-[#a30f45]"
            iconBg="bg-white/20"
          />

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
    </main>
  );
}