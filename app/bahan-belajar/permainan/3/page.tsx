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

// === DATA GAME LEVEL 3 ===
const LEVEL_3_GAMES: GameData[] = [
  {
    id: 0,
    title: "Tantangan 1",
    src: "https://jigex.com/3xyUL", // Link: Suku Dayak
    keywords: [
      { words: ["dayak"], label: "Suku (Dayak)" },
      { words: ["baju", "pakaian"], label: "Objek (Baju Adat)" },
      { words: ["hitam"], label: "Warna (Hitam)" },
      { words: ["manik", "hiasan"], label: "Detail (Manik/Hiasan)" },
      { words: ["unik", "khas"], label: "Sifat (Unik/Khas)" }
    ]
  },
  {
    id: 1,
    title: "Tantangan 2",
    src: "https://jigex.com/bPT2x", // Link: Rumah Adat
    keywords: [
      { words: ["rumah"], label: "Objek (Rumah Adat)" },
      { words: ["tinggi", "atap"], label: "Bentuk (Atap Tinggi)" },
      { words: ["kayu", "rumput"], label: "Bahan (Kayu/Rumput)" },
      { words: ["khas", "adat"], label: "Jenis (Adat/Khas)" }
    ]
  },
  {
    id: 2,
    title: "Tantangan 3",
    src: "https://jigex.com/WuN8v", // Link: Kuda Lumping
    keywords: [
      { words: ["kuda", "lumping"], label: "Tarian (Kuda Lumping)" },
      { words: ["tari", "menari"], label: "Aktivitas (Menari)" },
      { words: ["jawa", "tradisi"], label: "Asal/Jenis (Jawa/Tradisi)" },
      { words: ["warna", "bagus", "menarik"], label: "Visual (Warna-warni)" }
    ]
  },
  {
    id: 3,
    title: "Tantangan 4",
    src: "https://jigex.com/XqWWt", // Link: Tor-tor
    keywords: [
      { words: ["tor", "tortor"], label: "Nama Tari (Tor-tor)" },
      { words: ["batak", "toba", "sumatera", "sumatra"], label: "Asal (Batak/Sumut)" },
      { words: ["tari", "menari", "seni"], label: "Jenis (Tarian/Seni)" },
      { words: ["baris", "berbaris"], label: "Gerakan (Berbaris)" }
    ]
  },
  {
    id: 4,
    title: "Tantangan 5",
    src: "https://jigex.com/5JBk7", // Link: Gamelan
    keywords: [
      { words: ["gamelan"], label: "Nama (Gamelan)" },
      { words: ["musik", "bunyi"], label: "Jenis (Alat Musik)" },
      { words: ["kendang", "angklung"], label: "Instrumen Lain" },
      { words: ["tunjuk", "acara", "iringan"], label: "Fungsi (Pertunjukan)" },
      { words: ["khas", "daerah"], label: "Sifat" }
    ]
  }
];

export default function PermainanPageLevel3() {
  const router = useRouter();

  const [iframeHeight, setIframeHeight] = useState<string>("100vh");
  const [marginTop, setMarginTop] = useState<string>("0px");

  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);

  const [description, setDescription] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  const GAME_DURATION = 240; // 4 menit
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  useEffect(() => {
    const highestLevelCompleted = Number(localStorage.getItem('highestLevelCompleted') || 0);
    if (highestLevelCompleted < 2) {
       // alert("Selesaikan Level 2 terlebih dahulu!");
       // router.replace('/bahan-belajar/permainan');
    }
  }, [router]);

  useEffect(() => {
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
  }, [timeLeft, currentView]);

  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted && currentView === "game") {
      setFeedbackMessage("Waktu permainan habis!");
      setIsSubmitted(true);
    }
  }, [timeLeft, isSubmitted, currentView]);

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
    setDescription(""); 
    setFeedbackMessage("");
    setScore(0);
    setIsSubmitted(false);
    setIsGameWon(false);
    setTimeLeft(GAME_DURATION);
  };

  const backToSelection = () => {
    setCurrentView("selection");
  };

  const checkAnswer = () => {
    if (timeLeft === 0) return;

    if (!description || description.trim().length === 0) {
      setFeedbackMessage("Isi jawaban terlebih dahulu!");
      setIsSubmitted(true);
      return;
    }

    const currentGame = LEVEL_3_GAMES[activeGameIndex];
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
      setFeedbackMessage("LUAR BIASA! Paragrafmu sangat detail dan lengkap!");
      setIsGameWon(true);
    } else if (finalScore >= 60) {
      setFeedbackMessage("Bagus! Paragrafmu sudah menjelaskan keunikan budaya.");
    } else {
      setFeedbackMessage("Ayo, ceritakan lebih banyak lagi dalam 1 paragraf utuh.");
    }
  };

  const handleCompleteLevel = () => {
    if (typeof window !== "undefined") {
      const currentProgress = Number(localStorage.getItem("highestLevelCompleted") || 0);
      if (currentProgress < 3) {
        localStorage.setItem("highestLevelCompleted", "3");
      }
    }
    router.push("/bahan-belajar/permainan");
  };

  return (
    <div className={`relative w-full bg-[#E8F5E9] ${fredoka.className}`} style={{ minHeight: "100vh", marginTop }}>

      {/* SELECTION SCREEN */}
      {currentView === "selection" && (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <h1 className={`text-4xl text-green-800 font-bold mb-2 ${salsa.className}`}>LEVEL 3</h1>
          
          <div className="bg-green-100 border-2 border-green-300 rounded-lg px-4 py-2 mb-4 text-green-800 font-bold">
            ⏳ Waktu Pengerjaan: 4 Menit / Game
          </div>

          <p className="mb-6 text-gray-700 text-center">Tantangan Terakhir: Uji kemampuan menulis paragrafmu!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
            {LEVEL_3_GAMES.map((game, i) => (
              <button
                key={game.id}
                onClick={() => startGame(i)}
                className="group relative bg-white border-4 rounded-2xl p-6 shadow-lg transition-all text-left hover:shadow-xl hover:scale-105 border-green-300"
              >
                <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">
                  Misi {i + 1}
                </div>
                <h3 className={`text-2xl font-bold text-gray-800 mb-2 ${salsa.className}`}>
                  {game.title}
                </h3>
                {/* Perubahan Instruksi Kartu Level 3 */}
                <p className="text-gray-600 text-sm">Susun puzzle dan ceritakan keunikannya dalam 1 paragraf (minimal 5 kalimat)!</p>
              </button>
            ))}
          </div>

          <button
            onClick={handleCompleteLevel}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg border-b-4 border-green-800 hover:scale-105"
          >
            ✅ Selesai Level 3 & Kembali
          </button>
        </div>
      )}

      {/* GAME SCREEN */}
      {currentView === "game" && (
        <div className="flex flex-col h-full">

          <div className="bg-green-600 p-3 flex justify-between items-center shadow-md">
            <button onClick={backToSelection} className="bg-white text-green-700 px-4 py-1 rounded-full font-bold shadow hover:bg-gray-100 text-sm">
              ⬅ Kembali
            </button>

            <div className={`flex items-center px-4 py-1 rounded bg-white font-mono border-2 font-bold ${
              timeLeft < 30 ? 'border-red-500 text-red-600 animate-pulse' : 'border-green-200 text-green-700'
            }`}>
              ⏰ {formatTime(timeLeft)}
            </div>

            <div className="bg-white/20 px-4 py-1 rounded text-white font-bold text-sm">Skor: {score}</div>
          </div>

          <div className="flex flex-col md:flex-row w-full overflow-hidden" style={{ height: iframeHeight }}>

            <div className="w-full md:w-2/3 h-1/2 md:h-full bg-gray-900 relative border-r-4 border-green-400">
              {LEVEL_3_GAMES[activeGameIndex] && (
                <iframe
                  key={LEVEL_3_GAMES[activeGameIndex].src}
                  src={LEVEL_3_GAMES[activeGameIndex].src}
                  allowFullScreen={true}
                  className="w-full h-full border-none"
                  title="Puzzle Game Level 3"
                />
              )}

              {timeLeft === 0 && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 text-white p-4">
                  <h2 className={`text-3xl mb-4 text-red-500 ${salsa.className}`}>WAKTU HABIS!</h2>
                  <p className="text-center text-sm mb-4">Ayo coba lagi untuk menulis paragraf yang sempurna!</p>
                  <button onClick={backToSelection} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105">
                    Coba Game Lain
                  </button>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/3 h-1/2 md:h-full bg-[#F1F8E9] p-4 overflow-y-auto">
              <div className="bg-white p-4 rounded-xl shadow border-2 flex flex-col h-full border-green-200">
                {/* Judul Form Baru */}
                <h2 className={`text-lg font-bold text-green-700 mb-2 ${salsa.className}`}>Tulis Paragraf Budaya</h2>
                {/* Instruksi 1 Paragraf & 5 Kalimat */}
                <p className="text-xs text-gray-700 mb-2 font-semibold">
                   Buatlah 1 paragraf yang terdiri dari minimal 5 kalimat mengenai gambar budaya tersebut!
                </p>

                <textarea
                  value={description}
                  onChange={(e) => { 
                      setDescription(e.target.value); 
                      if(isSubmitted) setIsSubmitted(false); 
                  }}
                  disabled={timeLeft === 0}
                  // Placeholder dikosongkan
                  placeholder="Tuliskan satu paragraf lengkap (minimal 5 kalimat) kamu di sini..."
                  className="w-full flex-grow p-3 border rounded mb-3 text-sm resize-none focus:outline-none focus:border-green-500 text-gray-800"
                />

                {isSubmitted && (
                  <div className={`mb-3 p-2 rounded text-center text-xs font-bold ${
                    score >= 60 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    Skor: {score}<br />{feedbackMessage}
                  </div>
                )}

                <button
                  onClick={checkAnswer}
                  disabled={timeLeft === 0}
                  className={`w-full py-2 rounded font-bold text-white shadow transition-colors ${
                    timeLeft === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  Simpan Paragraf
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}