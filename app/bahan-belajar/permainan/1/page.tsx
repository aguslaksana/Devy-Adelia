"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Fredoka, Salsa } from "next/font/google";

const fredoka = Fredoka({ weight: ["400"], subsets: ["latin"] });
const salsa = Salsa({ weight: ["400"], subsets: ["latin"] });

type Keyword = { words: string[]; label: string; };
type GameData = { id: number; title: string; src: string; keywords: Keyword[]; hints: string[]; };

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
    ],
    hints: ["Sebutkan nama seninya", "Sebutkan asal daerahnya (Jawa)", "Apa warna dominannya?", "Bahan dasarnya apa? (Kulit/Kayu)"]
  },
  {
    id: 1,
    title: "PUZZLE BALI",
    src: "https://jigex.com/VHnhs",
    keywords: [
      { words: ["bali"], label: "Lokasi (Bali)" },
      { words: ["asri", "indah", "alam"], label: "Suasana" },
      { words: ["kecak"], label: "Tari Kecak" },
    ],
    hints: ["Di pulau mana ini?", "Sebutkan nama tariannya (Kecak)", "Bagaimana suasana alamnya?"]
  },
  {
    id: 2,
    title: "PUZZLE REOG",
    src: "https://jigex.com/8egRX",
    keywords: [
      { words: ["reog"], label: "Reog" },
      { words: ["ponorogo"], label: "Asal (Ponorogo)" },
      { words: ["topeng", "singa"], label: "Bentuk" },
    ],
    hints: ["Apa nama kesenian ini?", "Asal kotanya mana? (Ponorogo)", "Bentuk topengnya apa? (Singa)"]
  },
  {
    id: 3,
    title: "PUZZLE GUDEG",
    src: "https://jigex.com/caQ63",
    keywords: [
      { words: ["gudeg"], label: "Gudeg" },
      { words: ["jogja", "yogyakarta"], label: "Asal" },
      { words: ["makanan", "khas"], label: "Jenis" },
    ],
    hints: ["Apa nama makanannya?", "Asal kotanya mana? (Yogyakarta)", "Ini makanan apa? (Makanan khas)"]
  },
  {
    id: 4,
    title: "PUZZLE ONDEL-ONDEL",
    src: "https://jigex.com/11pss",
    keywords: [
      { words: ["ondel"], label: "Ondel-ondel" },
      { words: ["jakarta", "betawi"], label: "Asal" },
      { words: ["ramai", "warna"], label: "Ciri" },
    ],
    hints: ["Sebutkan boneka besar ini", "Dari daerah mana asalnya? (Jakarta)", "Sebutkan warnanya yang ramai"]
  }
];

export default function PermainanPageLevel1() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [rewardData, setRewardData] = useState<{icon: string, title: string, msg: string, color: string} | null>(null);
  const [savedScores, setSavedScores] = useState<{[key: number]: number}>({});

  const GAME_DURATION = 180; 
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  // Load skor yang tersimpan saat pertama kali buka
  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("level1_all_scores") || "{}");
    setSavedScores(scores);
  }, []);

  useEffect(() => {
    if (currentView !== "game") return;
    if (timeLeft <= 0) return;
    const timer = setInterval(() => { setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1)); }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentView]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`;
  };

  const startGame = (index: number) => {
    setActiveGameIndex(index);
    setCurrentView("game");
    setDescription(""); 
    setScore(0);
    setIsSubmitted(false);
    setTimeLeft(GAME_DURATION);
    setRewardData(null);
  };

  const checkAnswer = () => {
    if (!description.trim()) return alert("Tuliskan jawabanmu dulu!");
    
    const currentGame = LEVEL_1_GAMES[activeGameIndex];
    const input = description.toLowerCase();
    let matches = 0;
    currentGame.keywords.forEach((k) => { if (k.words.some((w) => input.includes(w))) matches++; });
    
    const finalScore = Math.round((matches / currentGame.keywords.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    // Simpan Skor ke LocalStorage
    const newScores = { ...savedScores, [activeGameIndex]: finalScore };
    setSavedScores(newScores);
    localStorage.setItem("level1_all_scores", JSON.stringify(newScores));

    if (finalScore >= 90) {
      setRewardData({ icon: "🏆", title: "EMAS!", msg: "Luar biasa! Deskripsimu sempurna.", color: "bg-yellow-50 border-yellow-400 text-yellow-700" });
    } else if (finalScore >= 70) {
      setRewardData({ icon: "🥈", title: "PERAK!", msg: "Bagus! Sedikit lagi mencapai skor maksimal.", color: "bg-gray-100 border-gray-400 text-gray-700" });
    } else {
      setRewardData({ icon: "💡", title: "COBA LAGI", msg: "Gunakan petunjuk kata kunci agar skor lebih tinggi!", color: "bg-blue-50 border-blue-400 text-blue-700" });
    }
  };

  const nextChallenge = () => {
    if (activeGameIndex < LEVEL_1_GAMES.length - 1) {
      startGame(activeGameIndex + 1);
    } else {
      setCurrentView("selection");
    }
  };

  return (
    <div className={`relative w-full bg-[#FFF8DC] ${fredoka.className} min-h-screen pt-20 pb-10`}>

      {/* SELECTION SCREEN */}
      {currentView === "selection" && (
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className={`text-4xl text-orange-600 font-bold mb-2 ${salsa.className}`}>LEVEL 1</h1>
          <div className="bg-orange-100 border-2 border-orange-300 rounded-lg px-6 py-2 mb-8 text-orange-800 font-bold">
            ⏳ 3 Menit Per Game
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
            {LEVEL_1_GAMES.map((game, i) => {
              const hasScore = savedScores[i] !== undefined;
              return (
                <button key={i} onClick={() => startGame(i)} className={`relative bg-white border-4 rounded-3xl p-6 shadow-lg transition-all hover:scale-105 ${hasScore ? 'border-green-400' : 'border-orange-300'}`}>
                  {hasScore && (
                    <div className="absolute -top-3 -left-3 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg font-bold border-2 border-white">
                      {savedScores[i] >= 90 ? "🏆" : "🥈"}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">Misteri {i + 1}</div>
                  <h3 className={`text-2xl font-bold text-gray-800 mb-1 ${salsa.className}`}>{game.title}</h3>
                  <p className="text-gray-500 text-xs mb-3">Tantangan Deskripsi Budaya</p>
                  {hasScore && <div className="text-sm font-bold text-green-600 bg-green-50 rounded-lg py-1">Skor Tertinggi: {savedScores[i]}</div>}
                </button>
              );
            })}
          </div>
          
          <button onClick={() => router.push("/bahan-belajar/permainan")} className="bg-green-600 text-white font-bold py-3 px-10 rounded-full shadow-xl hover:bg-green-700 transition-all border-b-4 border-green-900">✅ Selesai Level 1</button>
        </div>
      )}

      {/* GAME SCREEN */}
      {currentView === "game" && (
        <div className="flex flex-col h-[85vh] container mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-500">
          {/* Header */}
          <div className="bg-orange-500 p-4 flex justify-between items-center text-white">
            <button onClick={() => setCurrentView("selection")} className="bg-white text-orange-600 px-4 py-1 rounded-full font-bold text-sm shadow-md transition-all active:scale-90">⬅ Menu</button>
            <div className="font-mono text-xl font-bold bg-white/20 px-4 py-1 rounded-lg">⏰ {formatTime(timeLeft)}</div>
            <div className="bg-orange-700 px-4 py-1 rounded-lg font-bold">Skor: {score}</div>
          </div>

          <div className="flex flex-col md:flex-row flex-grow">
            {/* Puzzle Area */}
            <div className="w-full md:w-2/3 bg-gray-900 relative">
              <iframe src={LEVEL_1_GAMES[activeGameIndex].src} className="w-full h-full border-none" />
              {timeLeft === 0 && !isSubmitted && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 text-white p-4">
                  <h2 className="text-3xl mb-4 text-red-500 font-bold tracking-tighter uppercase">Waktu Habis!</h2>
                  <button onClick={() => startGame(activeGameIndex)} className="bg-orange-500 px-8 py-2 rounded-full font-bold hover:scale-110 transition-all shadow-xl">Coba Lagi</button>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="w-full md:w-1/3 bg-orange-50 p-6 flex flex-col h-full border-l-4 border-orange-200 overflow-y-auto">
              {/* Hints */}
              <div className="bg-white p-3 rounded-2xl border-2 border-orange-200 mb-4 shadow-sm">
                <p className="text-[10px] font-bold text-orange-800 uppercase mb-2">💡 Petunjuk Kata Kunci:</p>
                <ul className="text-[11px] text-orange-700 list-disc ml-4 leading-tight">
                  {LEVEL_1_GAMES[activeGameIndex].hints.map((h, idx) => <li key={idx} className="mb-1">{h}</li>)}
                </ul>
              </div>

              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); setIsSubmitted(false); }}
                disabled={timeLeft === 0 || isSubmitted}
                placeholder="Tuliskan 2 kalimat deskripsi..."
                className="w-full flex-grow p-4 border-2 border-orange-200 rounded-2xl mb-4 text-sm focus:border-orange-500 outline-none shadow-inner bg-white disabled:bg-gray-100"
              />

              {/* Reward & Navigation */}
              {isSubmitted && rewardData ? (
                <div className={`mb-4 p-4 rounded-2xl border-2 text-center animate-bounce ${rewardData.color}`}>
                  <div className="text-4xl mb-1">{rewardData.icon}</div>
                  <div className="text-sm font-extrabold uppercase mb-1">{rewardData.title}</div>
                  <div className="text-[11px] leading-tight mb-2 font-bold italic">"{rewardData.msg}"</div>
                  <button onClick={nextChallenge} className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-orange-700 shadow-md">
                    {activeGameIndex < LEVEL_1_GAMES.length - 1 ? "Tantangan Berikutnya ➡" : "Kembali ke Menu"}
                  </button>
                </div>
              ) : (
                <button onClick={checkAnswer} disabled={timeLeft === 0} className="w-full py-4 rounded-2xl font-bold text-white shadow-lg bg-blue-500 hover:bg-blue-600 transition-all active:scale-95 disabled:bg-gray-400">
                  Simpan Jawaban
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}