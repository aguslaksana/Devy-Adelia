"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Fredoka, Salsa } from "next/font/google";

const fredoka = Fredoka({ weight: ["400"], subsets: ["latin"] });
const salsa = Salsa({ weight: ["400"], subsets: ["latin"] });

type Keyword = { words: string[]; label: string; };
type GameData = { id: number; title: string; src: string; keywords: Keyword[]; hints: string[]; };

// === DATA GAME LEVEL 2 DENGAN CLUE ===
const LEVEL_2_GAMES: GameData[] = [
  {
    id: 0,
    title: "Tari Piring",
    src: "https://jigex.com/YxUBx",
    keywords: [
      { words: ["tari", "piring"], label: "Tari Piring" },
      { words: ["merah"], label: "Warna Baju" },
      { words: ["piring"], label: "Properti" },
      { words: ["sumatera", "barat", "minang"], label: "Asal" }
    ],
    hints: ["Sebutkan nama tariannya (Piring)", "Apa warna bajunya?", "Properti apa yang dipegang?", "Berasal dari daerah mana? (Minang/Sumatera Barat)"]
  },
  {
    id: 1,
    title: "Rumah Tongkonan",
    src: "https://jigex.com/jMFN6",
    keywords: [
      { words: ["tongkonan"], label: "Rumah Tongkonan" },
      { words: ["toraja", "sulawesi"], label: "Asal" },
      { words: ["kayu"], label: "Bahan" },
      { words: ["lengkung", "tinggi"], label: "Bentuk" }
    ],
    hints: ["Apa nama rumah adat ini?", "Berasal dari mana? (Toraja/Sulawesi)", "Terbuat dari bahan apa? (Kayu)", "Bagaimana bentuk atapnya?"]
  },
  {
    id: 2,
    title: "Pempek Palembang",
    src: "https://jigex.com/6yVue",
    keywords: [
      { words: ["pempek"], label: "Pempek" },
      { words: ["palembang"], label: "Asal" },
      { words: ["telur", "telor"], label: "Isian" },
      { words: ["cuko", "kuah", "hitam", "cokelat"], label: "Kuah" }
    ],
    hints: ["Apa nama makanannya?", "Asal kotanya mana? (Palembang)", "Apa isian di dalamnya? (Telur)", "Sebutkan warna kuahnya!"]
  },
  {
    id: 3,
    title: "Budaya Jakarta",
    src: "https://jigex.com/ZKcte",
    keywords: [
      { words: ["jakarta", "betawi"], label: "Asal" },
      { words: ["kerak", "telor"], label: "Makanan" },
      { words: ["monas"], label: "Ikon" },
      { words: ["jaipong", "tari"], label: "Kesenian" }
    ],
    hints: ["Nama daerah/sukunya? (Betawi/Jakarta)", "Apa makanan khasnya? (Kerak Telor)", "Apa ikon terkenal di sana? (Monas)", "Sebutkan tarian daerahnya!"]
  },
  {
    id: 4,
    title: "Budaya Papua",
    src: "https://jigex.com/yfABx",
    keywords: [
      { words: ["papua"], label: "Asal" },
      { words: ["honai"], label: "Rumah" },
      { words: ["papeda"], label: "Makanan" },
      { words: ["sajojo"], label: "Tarian" }
    ],
    hints: ["Provinsi paling timur Indonesia?", "Apa nama rumah adatnya? (Honai)", "Apa makanan khasnya? (Papeda)", "Sebutkan tarian terkenalnya! (Sajojo)"]
  }
];

export default function PermainanPageLevel2() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [rewardData, setRewardData] = useState<{icon: string, title: string, msg: string, color: string} | null>(null);
  const [savedScores, setSavedScores] = useState<{[key: number]: number}>({});

  const GAME_DURATION = 300; // 5 Menit
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("level2_all_scores") || "{}");
    setSavedScores(scores);
    
    // Proteksi level
    const progress = Number(localStorage.getItem('highestLevelCompleted') || 0);
    if (progress < 1) router.replace('/bahan-belajar/permainan');
  }, [router]);

  useEffect(() => {
    if (currentView !== "game" || timeLeft <= 0) return;
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
    if (!description.trim()) return alert("Tuliskan deskripsimu dulu!");
    
    const currentGame = LEVEL_2_GAMES[activeGameIndex];
    const input = description.toLowerCase();
    let matches = 0;
    currentGame.keywords.forEach((k) => { if (k.words.some((w) => input.includes(w))) matches++; });
    
    const finalScore = Math.round((matches / currentGame.keywords.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    const newScores = { ...savedScores, [activeGameIndex]: finalScore };
    setSavedScores(newScores);
    localStorage.setItem("level2_all_scores", JSON.stringify(newScores));

    if (finalScore >= 90) {
      setRewardData({ icon: "🏆", title: "MEDALI EMAS!", msg: "Hebat! 4 kalimatmu sangat lengkap dan informatif!", color: "bg-yellow-50 border-yellow-400 text-yellow-700" });
    } else if (finalScore >= 70) {
      setRewardData({ icon: "🥈", title: "MEDALI PERAK!", msg: "Bagus sekali! Sedikit lagi menuju sempurna.", color: "bg-gray-100 border-gray-400 text-gray-700" });
    } else {
      setRewardData({ icon: "💡", title: "SEMANGAT!", msg: "Ayo lebih detil lagi! Lihat 'Petunjuk' di atas untuk membantumu.", color: "bg-cyan-50 border-cyan-400 text-cyan-700" });
    }
  };

  const nextChallenge = () => {
    if (activeGameIndex < LEVEL_2_GAMES.length - 1) startGame(activeGameIndex + 1);
    else setCurrentView("selection");
  };

  return (
    <div className={`relative w-full bg-[#E0F7FA] ${fredoka.className} min-h-screen pt-10 pb-10`}>

      {/* SELECTION SCREEN */}
      {currentView === "selection" && (
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className={`text-4xl text-cyan-800 font-bold mb-2 ${salsa.className}`}>LEVEL 2</h1>
          <div className="bg-cyan-100 border-2 border-cyan-300 rounded-lg px-6 py-2 mb-8 text-cyan-900 font-bold animate-pulse">
            ⏳ 5 Menit Per Tantangan
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
            {LEVEL_2_GAMES.map((game, i) => {
              const hasScore = savedScores[i] !== undefined;
              return (
                <button key={i} onClick={() => startGame(i)} className={`relative bg-white border-4 rounded-3xl p-6 shadow-lg transition-all hover:scale-105 ${hasScore ? 'border-green-400' : 'border-cyan-300'}`}>
                  {hasScore && (
                    <div className="absolute -top-3 -left-3 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg font-bold border-2 border-white">
                      {savedScores[i] >= 90 ? "🏆" : "🥈"}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-cyan-600 text-white px-3 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-widest">Misi {i + 1}</div>
                  <h3 className={`text-xl font-bold text-gray-800 mb-1 ${salsa.className}`}>{game.title}</h3>
                  <p className="text-gray-500 text-[10px] mb-3 leading-tight text-left">Susun puzzle dan buatlah 4 kalimat deskripsi lengkap!</p>
                  {hasScore && <div className="text-xs font-bold text-green-600 bg-green-50 rounded-lg py-1 px-2">Skor Terbaik: {savedScores[i]}</div>}
                </button>
              );
            })}
          </div>
          
          <button onClick={() => { localStorage.setItem("highestLevelCompleted", "2"); router.push("/bahan-belajar/permainan"); }} className="bg-green-600 text-white font-bold py-3 px-10 rounded-full shadow-xl hover:bg-green-700 transition-all border-b-4 border-green-900">✅ Selesai Level 2</button>
        </div>
      )}

      {/* GAME SCREEN */}
      {currentView === "game" && (
        <div className="flex flex-col h-[90vh] container mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-cyan-500 mt-4">
          {/* Header */}
          <div className="bg-cyan-600 p-4 flex justify-between items-center text-white">
            <button onClick={() => setCurrentView("selection")} className="bg-white text-cyan-700 px-4 py-1 rounded-full font-bold text-xs shadow-md transition-all active:scale-90">⬅ Menu</button>
            <div className="font-mono text-lg font-bold bg-white/20 px-4 py-1 rounded-lg tracking-tighter">⏰ {formatTime(timeLeft)}</div>
            <div className="bg-cyan-800 px-4 py-1 rounded-lg font-bold text-sm tracking-tighter">Skor: {score}</div>
          </div>

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            {/* Puzzle Area */}
            <div className="w-full md:w-2/3 bg-gray-900 relative">
              <iframe src={LEVEL_2_GAMES[activeGameIndex].src} className="w-full h-full border-none" />
              {timeLeft === 0 && !isSubmitted && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 text-white p-4">
                  <h2 className="text-2xl mb-4 text-red-500 font-bold uppercase">Waktu Habis!</h2>
                  <button onClick={() => startGame(activeGameIndex)} className="bg-cyan-500 px-8 py-2 rounded-full font-bold hover:scale-110 transition-all">Coba Lagi</button>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="w-full md:w-1/3 bg-cyan-50 p-6 flex flex-col h-full border-l-4 border-cyan-100 overflow-y-auto">
              {/* Hints */}
              <div className="bg-white p-3 rounded-2xl border-2 border-cyan-200 mb-4 shadow-sm">
                <button onClick={() => setShowHint(!showHint)} className="flex items-center justify-between w-full text-[10px] font-bold text-cyan-800 uppercase mb-1">
                  💡 Petunjuk Kata Kunci {showHint ? "▲" : "▼"}
                </button>
                {showHint && (
                  <ul className="text-[10px] text-cyan-700 list-disc ml-4 leading-tight">
                    {LEVEL_2_GAMES[activeGameIndex].hints.map((h, idx) => <li key={idx} className="mb-1">{h}</li>)}
                  </ul>
                )}
              </div>

              <h2 className={`text-md font-bold text-cyan-800 mb-2 ${salsa.className}`}>4 Kalimat Deskripsi</h2>
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); setIsSubmitted(false); }}
                disabled={timeLeft === 0 || isSubmitted}
                placeholder="Tuliskan minimal 4 kalimat deskripsi di sini..."
                className="w-full flex-grow p-4 border-2 border-cyan-200 rounded-2xl mb-4 text-sm focus:border-cyan-500 outline-none shadow-inner bg-white disabled:bg-gray-100 resize-none"
              />

              {/* Reward & Navigation */}
              {isSubmitted && rewardData ? (
                <div className={`mb-4 p-4 rounded-2xl border-2 text-center animate-bounce ${rewardData.color}`}>
                  <div className="text-4xl mb-1">{rewardData.icon}</div>
                  <div className="text-sm font-extrabold uppercase mb-1 tracking-tight">{rewardData.title}</div>
                  <div className="text-[10px] leading-tight mb-3 font-bold">"{rewardData.msg}"</div>
                  <button onClick={nextChallenge} className="bg-cyan-700 text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-cyan-800 shadow-md transition-all">
                    {activeGameIndex < LEVEL_2_GAMES.length - 1 ? "Lanjut Misi Berikutnya ➡" : "Kembali ke Menu"}
                  </button>
                </div>
              ) : (
                <button onClick={checkAnswer} disabled={timeLeft === 0} className="w-full py-3 rounded-2xl font-bold text-white shadow-lg bg-blue-500 hover:bg-blue-600 transition-all active:scale-95 disabled:bg-gray-400">
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