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
  
  // State untuk Modal
  const [activeModal, setActiveModal] = useState<"identitas" | "petunjuk" | null>(null);

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

  const prefix = process.env.NODE_ENV === "production" ? "/Devy-Adelia" : "";

  // Komponen Modal yang disesuaikan untuk Embed Dokumen
  const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden border-4 border-[#FF9F1C] animate-in zoom-in duration-300">
        {/* Header Modal */}
        <div className="bg-[#FF9F1C] py-3 px-6 flex justify-between items-center">
          <h2 className={`${salsa.className} text-white text-xl md:text-2xl font-bold`}>{title}</h2>
          <button 
            onClick={() => setActiveModal(null)}
            className="text-white hover:scale-110 transition-transform font-bold text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Area Content (Embed Google Drive) */}
        <div className="flex-grow w-full bg-gray-100 relative">
          {children}
        </div>

        {/* Footer Modal */}
        <div className="p-3 bg-white flex justify-center border-t border-gray-200">
          <Link 
            href="/bahan-belajar" 
            onClick={() => { playClickSound(); setActiveModal(null); }}
            className="bg-[#FF9F1C] hover:bg-[#ff8c00] text-white px-10 py-2 rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm md:text-base"
          >
            Kembali ke Bahan Belajar
          </Link>
        </div>
      </div>
    </div>
  );

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

      {/* Tombol Navigasi Kanan Atas */}
      <div className="absolute top-4 right-4 z-30 flex gap-3">
        <button 
          onClick={() => { playClickSound(); setActiveModal("identitas"); }} 
          className="bg-white p-2 rounded-xl shadow-md hover:scale-110 transition-transform flex items-center gap-2"
        >
          <Image src={`${prefix}/identitas.png`} alt="Identitas" width={24} height={24} />
        </button>
        <button 
          onClick={() => { playClickSound(); setActiveModal("petunjuk"); }} 
          className="bg-white p-2 rounded-xl shadow-md hover:scale-110 transition-transform flex items-center gap-2"
        >
          <Image src={`${prefix}/maps.gif`} alt="Petunjuk" width={24} height={24} unoptimized />
        </button>
      </div>

      {/* Render Modal Berdasarkan State */}
      {activeModal === "identitas" && (
        <Modal title="IDENTITAS PENGEMBANG">
          <iframe 
            src="https://drive.google.com/file/d/1PPJynVku5-ECUJ2FxYojczdeVvq790a1/preview" 
            className="w-full h-full border-none"
            allow="autoplay"
          ></iframe>
        </Modal>
      )}

      {activeModal === "petunjuk" && (
        <Modal title="PETUNJUK PENGGUNAAN">
          <iframe 
            src="https://drive.google.com/file/d/1rVE8Xppqy7aO9z53qYuKMjeleo6igmsM/preview" 
            className="w-full h-full border-none"
            allow="autoplay"
          ></iframe>
        </Modal>
      )}

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