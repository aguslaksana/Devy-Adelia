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

// === DATA GAME LEVEL 2 ===
const LEVEL_2_GAMES: GameData[] = [
  {
    id: 0,
    title: "Tantangan 1",
    src: "https://jigex.com/YxUBx",
    keywords: [
      { words: ["tari", "piring", "menari"], label: "Tari Piring" },
      { words: ["merah", "baju"], label: "Warna Baju" },
      { words: ["piring"], label: "Properti (Piring)" },
      { words: ["meriah", "ramai"], label: "Suasana" },
      { words: ["kesenian", "daerah"], label: "Jenis (Kesenian)" }
    ]
  },
  {
    id: 1,
    title: "Tantangan 2",
    src: "https://jigex.com/jMFN6",
    keywords: [
      { words: ["tongkonan"], label: "Rumah Tongkonan" },
      { words: ["sulawesi", "selatan", "toraja"], label: "Asal (Sulawesi)" },
      { words: ["rumah", "adat"], label: "Jenis (Rumah Adat)" },
      { words: ["kayu"], label: "Bahan (Kayu)" },
      { words: ["tinggi", "lengkung"], label: "Bentuk (Tinggi)" }
    ]
  },
  {
    id: 2,
    title: "Tantangan 3",
    src: "https://jigex.com/6yVue",
    keywords: [
      { words: ["pempek"], label: "Pempek" },
      { words: ["palembang"], label: "Asal (Palembang)" },
      { words: ["makanan", "khas", "kuliner"], label: "Jenis (Makanan)" },
      { words: ["telur", "telor"], label: "Isian (Telur)" },
      { words: ["coklat", "cokelat", "kuah"], label: "Warna/Kuah" },
      { words: ["enak", "lezat"], label: "Rasa" }
    ]
  },
  {
    id: 3,
    title: "Tantangan 4",
    src: "https://jigex.com/ZKcte",
    keywords: [
      { words: ["jakarta", "betawi", "kota"], label: "Asal (Jakarta)" },
      { words: ["kerak", "telor"], label: "Makanan (Kerak Telor)" },
      { words: ["monas", "tinggi"], label: "Ikon (Monas)" },
      { words: ["jaipong", "tari"], label: "Kesenian (Jaipong)" },
      { words: ["bemo"], label: "Kendaraan (Bemo)" },
      { words: ["indah", "ramai"], label: "Suasana" }
    ]
  },
  {
    id: 4,
    title: "Tantangan 5",
    src: "https://jigex.com/yfABx",
    keywords: [
      { words: ["papua", "barat"], label: "Asal (Papua)" },
      { words: ["honai", "rumah"], label: "Rumah (Honai)" },
      { words: ["papeda"], label: "Makanan (Papeda)" },
      { words: ["sajojo", "tari"], label: "Tarian (Sajojo)" },
      { words: ["adat", "khas"], label: "Ciri Khas" }
    ]
  }
];

export default function PermainanPageLevel2() {
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

  const GAME_DURATION = 180; 
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  useEffect(() => {
    const highestLevelCompleted = Number(localStorage.getItem('highestLevelCompleted') || 0);
    if (highestLevelCompleted < 1) {
       alert("Selesaikan Level 1 terlebih dahulu!");
       router.replace('/bahan-belajar/permainan');
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

    const currentGame = LEVEL_2_GAMES[activeGameIndex];
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
      setFeedbackMessage("LUAR BIASA! 4 kalimatmu sangat informatif!");
      setIsGameWon(true);
    } else if (finalScore >= 60) {
      setFeedbackMessage("Bagus! Deskripsimu sudah cukup baik.");
    } else {
      setFeedbackMessage("Ayo ceritakan lebih banyak lagi dalam 4 kalimat.");
    }
  };

  const handleCompleteLevel = () => {
    if (typeof window !== "undefined") {
      const currentProgress = Number(localStorage.getItem("highestLevelCompleted") || 0);
      if (currentProgress < 2) {
        localStorage.setItem("highestLevelCompleted", "2");
      }
    }
    router.push("/bahan-belajar/permainan");
  };

  return (
    <div className={`relative w-full bg-[#E0F7FA] ${fredoka.className}`} style={{ minHeight: "100vh", marginTop }}>

      {/* SELECTION SCREEN */}
      {currentView === "selection" && (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <h1 className={`text-4xl text-cyan-700 font-bold mb-2 ${salsa.className}`}>LEVEL 2</h1>
          
          <div className="bg-cyan-100 border-2 border-cyan-300 rounded-lg px-4 py-2 mb-4 text-cyan-800 font-bold">
            ⏳ Waktu Pengerjaan: 3 Menit / Game
          </div>

          <p className="mb-6 text-gray-700">Pilih tantangan puzzle budaya di bawah ini:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
            {LEVEL_2_GAMES.map((game, i) => (
              <button
                key={game.id}
                onClick={() => startGame(i)}
                className="group relative bg-white border-4 rounded-2xl p-6 shadow-lg transition-all text-left hover:shadow-xl hover:scale-105 border-cyan-300"
              >
                <div className="absolute top-0 right-0 bg-cyan-600 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">
                  Misi {i + 1}
                </div>
                <h3 className={`text-2xl font-bold text-gray-800 mb-2 ${salsa.className}`}>
                  {game.title}
                </h3>
                {/* Perubahan Instruksi Level 2 */}
                <p className="text-gray-600 text-sm">Susun puzzle dan buatlah 4 kalimat deskripsi yang lengkap!</p>
              </button>
            ))}
          </div>

          <button
            onClick={handleCompleteLevel}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg border-b-4 border-green-700 hover:scale-105"
          >
            ✅ Selesai Level 2 & Kembali
          </button>
        </div>
      )}

      {/* GAME SCREEN */}
      {currentView === "game" && (
        <div className="flex flex-col h-full">

          <div className="bg-cyan-600 p-3 flex justify-between items-center shadow-md">
            <button onClick={backToSelection} className="bg-white text-cyan-700 px-4 py-1 rounded-full font-bold shadow hover:bg-gray-100 text-sm">
              ⬅ Kembali
            </button>

            <div className={`flex items-center px-4 py-1 rounded bg-white font-mono border-2 font-bold ${
              timeLeft < 30 ? 'border-red-500 text-red-600 animate-pulse' : 'border-cyan-200 text-cyan-600'
            }`}>
              ⏰ {formatTime(timeLeft)}
            </div>

            <div className="bg-white/20 px-4 py-1 rounded text-white font-bold text-sm">Skor: {score}</div>
          </div>

          <div className="flex flex-col md:flex-row w-full overflow-hidden" style={{ height: iframeHeight }}>

            <div className="w-full md:w-2/3 h-1/2 md:h-full bg-gray-900 relative border-r-4 border-cyan-300">
              {LEVEL_2_GAMES[activeGameIndex] && (
                <iframe
                  key={LEVEL_2_GAMES[activeGameIndex].src}
                  src={LEVEL_2_GAMES[activeGameIndex].src}
                  allowFullScreen={true}
                  className="w-full h-full border-none"
                  title="Puzzle Game Level 2"
                />
              )}

              {timeLeft === 0 && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 text-white p-4">
                  <h2 className={`text-3xl mb-4 text-red-500 ${salsa.className}`}>WAKTU HABIS!</h2>
                  <p className="text-center text-sm mb-4">Ayo coba lagi untuk melengkapi deskripsi!</p>
                  <button onClick={backToSelection} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105">
                    Coba Game Lain
                  </button>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/3 h-1/2 md:h-full bg-[#E0F2F1] p-4 overflow-y-auto">
              <div className="bg-white p-4 rounded-xl shadow border-2 flex flex-col h-full border-cyan-200">
                {/* Judul Baru */}
                <h2 className={`text-lg font-bold text-cyan-700 mb-2 ${salsa.className}`}>Tulis Deskripsi Lengkap</h2>
                {/* Instruksi 4 Kalimat */}
                <p className="text-xs text-gray-700 mb-2 font-semibold">
                   Buatlah 4 kalimat deskripsi berdasarkan gambar yang berhasil kamu susun!
                </p>

                <textarea
                  value={description}
                  onChange={(e) => { 
                      setDescription(e.target.value); 
                      if(isSubmitted) setIsSubmitted(false); 
                  }}
                  disabled={timeLeft === 0}
                  // Placeholder dikosongkan dari contoh
                  placeholder="Tuliskan 4 kalimat deskripsi kamu di sini..."
                  className="w-full flex-grow p-3 border rounded mb-3 text-sm resize-none focus:outline-none focus:border-cyan-500 text-gray-800"
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
                    timeLeft === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  Simpan Jawaban
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}