"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Fredoka, Salsa } from "next/font/google";
import Link from "next/link";

// Konfigurasi Font
const fredoka = Fredoka({ weight: ["400"], subsets: ["latin"] });
const salsa = Salsa({ weight: ["400"], subsets: ["latin"] });

// Definisi Tipe Data
type Keyword = {
  words: string[];
  label: string;
};

type GameData = {
  id: number;
  title: string;
  src: string;
  keywords: Keyword[];
};

// === DATA GAME ===
const LEVEL_1_GAMES: GameData[] = [
  {
    id: 0,
    title: "PUZZLE WAYANG",
    src: "https://jigex.com/pF93V",
    keywords: [
      { words: ["wayang"], label: "Wayang" },
      { words: ["jawa"], label: "Asal (Jawa)" },
      { words: ["cokelat", "coklat"], label: "Warna" },
      { words: ["kulit"], label: "Bahan" },
      { words: ["kesenian", "seni"], label: "Jenis" },
      { words: ["tradisional", "adat"], label: "Sifat" }
    ]
  },
  {
    id: 1,
    title: "PUZZLE BALI",
    src: "https://jigex.com/VHnhs",
    keywords: [
      { words: ["bali"], label: "Lokasi (Bali)" },
      { words: ["asri", "indah", "alam"], label: "Suasana (Asri)" },
      { words: ["kecak"], label: "Tari Kecak" },
      { words: ["penari", "tari", "menari"], label: "Subjek (Penari)" }
    ]
  },
  {
    id: 2,
    title: "PUZZLE REOG",
    src: "https://jigex.com/8egRX",
    keywords: [
      { words: ["reog"], label: "Reog" },
      { words: ["ponorogo", "jawa timur"], label: "Asal (Ponorogo)" },
      { words: ["topeng", "kepala", "singa", "besar"], label: "Topeng Besar" },
      { words: ["tarian", "menari", "tari"], label: "Aktivitas (Tarian)" }
    ]
  },
  {
    id: 3,
    title: "PUZZLE GUDEG",
    src: "https://jigex.com/caQ63",
    keywords: [
      { words: ["gudeg"], label: "Gudeg" },
      { words: ["jogja", "yogyakarta"], label: "Asal (Jogja)" },
      { words: ["makanan", "kuliner", "khas"], label: "Jenis (Makanan Khas)" },
      { words: ["disajikan", "saji", "kendil"], label: "Penyajian" }
    ]
  },
  {
    id: 4,
    title: "PUZZLE ONDEL-ONDEL",
    src: "https://jigex.com/11pss",
    keywords: [
      { words: ["ondel", "ondel-ondel"], label: "Objek (Ondel-ondel)" },
      { words: ["jakarta", "betawi"], label: "Asal (Jakarta)" },
      { words: ["warni", "warna"], label: "Ciri (Warna-warni)" },
      { words: ["tarian", "tari", "menari"], label: "Aktivitas (Tarian)" },
      { words: ["kesenian", "seni"], label: "Jenis (Kesenian)" },
      { words: ["orang", "banyak", "ramai"], label: "Suasana (Banyak Orang)" }
    ]
  }
];

export default function PermainanPageLevel1() {
  const router = useRouter();

  // === STATE MANAGEMENT ===
  const [iframeHeight, setIframeHeight] = useState<string>("100vh");
  const [marginTop, setMarginTop] = useState<string>("0px");

  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);

  const [description, setDescription] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  // === TIMER (3 MENIT PER GAME) ===
  const GAME_DURATION = 180; // 3 menit dalam detik
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  // Efek Timer Countdown
  useEffect(() => {
    // Timer HANYA jalan kalau sedang di dalam game ("game") dan waktu belum habis
    if (currentView !== "game") return;
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentView]); // Ditambahkan dependency currentView

  // Efek Waktu Habis
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted && currentView === "game") {
      setFeedbackMessage("Waktu permainan habis!");
      setIsSubmitted(true);
    }
  }, [timeLeft, isSubmitted, currentView]);

  // Efek Layout
  useEffect(() => {
    const calculateLayout = () => {
      const navbar = document.getElementById("navbar");
      const footer = document.getElementById("footer");
      const navbarHeight = navbar ? navbar.clientHeight : 0;
      const footerHeight = footer ? footer.clientHeight : 0;
      
      const availableHeight = window.innerHeight - navbarHeight - footerHeight - 20;
      
      setIframeHeight(`${availableHeight > 0 ? availableHeight : 500}px`);
      setMarginTop(`${navbarHeight}px`);
    };

    setTimeout(calculateLayout, 100);
    window.addEventListener("resize", calculateLayout);
    
    return () => window.removeEventListener("resize", calculateLayout);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`;
  };

  const startGame = (index: number) => {
    setActiveGameIndex(index);
    setCurrentView("game");
    
    // RESET SEMUA STATE SAAT GAME BARU DIMULAI
    setDescription(""); 
    setFeedbackMessage("");
    setScore(0);
    setIsSubmitted(false);
    setIsGameWon(false);
    
    // RESET TIMER KE 3 MENIT
    setTimeLeft(GAME_DURATION);
  };

  const backToSelection = () => {
    setCurrentView("selection");
    // Waktu dihentikan/tidak masalah karena timer hanya jalan di view 'game'
  };

  const checkAnswer = () => {
    if (timeLeft === 0) return;

    if (!description || description.trim().length === 0) {
      setFeedbackMessage("Isi jawaban terlebih dahulu!");
      setIsSubmitted(true);
      return;
    }

    const currentGame = LEVEL_1_GAMES[activeGameIndex];
    if (!currentGame) {
      console.error("Data game tidak ditemukan");
      return;
    }

    const input = description.toLowerCase();
    const keywords = currentGame.keywords;
    let matches = 0;

    keywords.forEach((group) => {
      const found = group.words.some((word) => input.includes(word));
      if (found) matches++;
    });

    const totalKeywords = keywords.length;
    const finalScore = totalKeywords > 0 ? Math.round((matches / totalKeywords) * 100) : 0;
    
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore === 100) {
      setFeedbackMessage("LUAR BIASA! Jawabanmu Sempurna!");
      setIsGameWon(true);
    } else if (finalScore >= 60) {
      setFeedbackMessage("Bagus! Tapi masih ada ciri-ciri yang terlewat.");
    } else {
      setFeedbackMessage("Coba lagi! Perhatikan ciri-cirinya.");
    }
  };

  const handleCompleteLevel = () => {
    if (typeof window !== "undefined") {
      const currentProgress = Number(localStorage.getItem("highestLevelCompleted") || 0);
      if (currentProgress < 1) {
        localStorage.setItem("highestLevelCompleted", "1");
      }
    }
    router.push("/bahan-belajar/permainan");
  };

  return (
    <div className={`relative w-full bg-[#FFF8DC] ${fredoka.className}`} style={{ minHeight: "100vh", marginTop }}>

      {/* SELECTION SCREEN */}
      {currentView === "selection" && (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <h1 className={`text-4xl text-orange-600 font-bold mb-2 ${salsa.className}`}>LEVEL 1</h1>
          
          {/* Info Waktu Statis */}
          <div className="bg-orange-100 border-2 border-orange-300 rounded-lg px-4 py-2 mb-4 text-orange-800 font-bold">
            ⏳ Waktu Pengerjaan: 3 Menit / Game
          </div>

          <p className="mb-6 text-gray-700">Pilih tantangan puzzle di bawah ini:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
            {LEVEL_1_GAMES.map((game, i) => (
              <button
                key={game.id}
                onClick={() => startGame(i)}
                className="group relative bg-white border-4 rounded-2xl p-6 shadow-lg transition-all text-left hover:shadow-xl hover:scale-105 border-orange-300"
              >
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">
                  Misteri {i + 1}
                </div>
                <h3 className={`text-2xl font-bold text-gray-800 mb-2 ${salsa.className}`}>
                  TANTANGAN {i + 1}
                </h3>
                <p className="text-gray-600 text-sm">Susun puzzle dan tebak budaya apa yang muncul!</p>
              </button>
            ))}
          </div>

          <button
            onClick={handleCompleteLevel}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg border-b-4 border-green-700 hover:scale-105"
          >
            ✅ Selesai & Kembali ke Menu Utama
          </button>
        </div>
      )}

      {/* GAME SCREEN */}
      {currentView === "game" && (
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="bg-orange-500 p-3 flex justify-between items-center shadow-md">
            <button onClick={backToSelection} className="bg-white text-orange-600 px-4 py-1 rounded-full font-bold shadow hover:bg-gray-100 text-sm">
              ⬅ Kembali
            </button>

            {/* Timer Ticking */}
            <div className={`flex items-center px-4 py-1 rounded bg-white font-mono border-2 font-bold ${
              timeLeft < 30 ? 'border-red-500 text-red-600 animate-pulse' : 'border-orange-200 text-orange-600'
            }`}>
              ⏰ {formatTime(timeLeft)}
            </div>

            <div className="bg-white/20 px-4 py-1 rounded text-white font-bold text-sm">Skor: {score}</div>
          </div>

          {/* Layout */}
          <div className="flex flex-col md:flex-row w-full overflow-hidden" style={{ height: iframeHeight }}>

            {/* Iframe */}
            <div className="w-full md:w-2/3 h-1/2 md:h-full bg-gray-900 relative border-r-4 border-orange-300">
              {LEVEL_1_GAMES[activeGameIndex] && (
                <iframe
                  key={LEVEL_1_GAMES[activeGameIndex].src}
                  src={LEVEL_1_GAMES[activeGameIndex].src}
                  allowFullScreen={true}
                  className="w-full h-full border-none"
                  title="Puzzle Game"
                />
              )}

              {timeLeft === 0 && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 text-white p-4">
                  <h2 className={`text-3xl mb-4 text-red-500 ${salsa.className}`}>WAKTU HABIS!</h2>
                  <p className="text-center text-sm mb-4">Kesempatan untuk level ini telah berakhir.</p>
                  <button
                    onClick={backToSelection}
                    className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105"
                  >
                    Coba Game Lain
                  </button>
                </div>
              )}

              <div className="absolute top-2 right-2 opacity-50 hover:opacity-100">
                {LEVEL_1_GAMES[activeGameIndex] && (
                    <Link 
                        href={LEVEL_1_GAMES[activeGameIndex].src} 
                        target="_blank" 
                        className="text-[10px] text-white bg-black/50 px-2 py-1 rounded"
                    >
                    Buka Tab Baru
                    </Link>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="w-full md:w-1/3 h-1/2 md:h-full bg-[#F5F5DC] p-4 overflow-y-auto">
              <div className="bg-white p-4 rounded-xl shadow border-2 flex flex-col h-full border-orange-200">
                <h2 className={`text-lg font-bold text-orange-600 mb-2 ${salsa.className}`}>Tebak Gambar</h2>
                <p className="text-xs text-gray-700 mb-2">Sebutkan nama, asal daerah, dan ciri-cirinya!</p>

                <textarea
                  value={description}
                  onChange={(e) => { 
                      setDescription(e.target.value); 
                      if(isSubmitted) setIsSubmitted(false); 
                  }}
                  disabled={timeLeft === 0}
                  placeholder="Contoh: Ini wayang kulit dari Jawa berwarna cokelat..."
                  className="w-full flex-grow p-3 border rounded mb-3 text-sm resize-none focus:outline-none focus:border-orange-500 text-gray-800"
                />

                {isSubmitted && (
                  <div className={`mb-3 p-2 rounded text-center text-xs font-bold ${
                    score >= 80 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    Skor: {score}<br />{feedbackMessage}
                  </div>
                )}

                <button
                  onClick={checkAnswer}
                  disabled={timeLeft === 0}
                  className={`w-full py-2 rounded font-bold text-white shadow transition-colors ${
                    timeLeft === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  Cek Jawaban
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}