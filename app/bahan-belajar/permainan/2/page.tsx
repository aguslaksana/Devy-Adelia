"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { Fredoka, Salsa } from "next/font/google";

const fredoka = Fredoka({ weight: ["400", "700"], subsets: ["latin"] });
const salsa = Salsa({ weight: ["400"], subsets: ["latin"] });

type GameData = { 
  id: number; 
  title: string; 
  src: string; 
  allKeywords: string[]; 
  hints: string[]; 
};

const LEVEL_2_GAMES: GameData[] = [
  {
    id: 0,
    title: "TANTANGAN 1",
    src: "https://jigex.com/YxUBx",
    allKeywords: ["Tari Piring", "Minangkabau", "Sumatera Barat", "piring", "menari", "kompak", "bersama-sama", "orang", "memainkan", "tari"],
    hints: ["Sebutkan nama tarian ini dan dari wilayah mana asalnya", "Jelaskan benda yang dibawa oleh penari", "Gambarkan kecepatan gerakan dan irama musiknya"]
  },
  {
    id: 1,
    title: "TANTANGAN 2",
    src: "https://jigex.com/jMFN6",
    allKeywords: ["Rumah Tongkonan", "Toraja", "Sulawesi Selatan", "atap", "melengkung", "kerbau", "kayu", "coklat", "hitam", "warga", "desa", "orang"],
    hints: ["Apa nama bangunan tradisional ini dan suku mana yang membangunnya?", "Perhatikan bentuk atapnya yang melengkung!", "Sebutkan hiasan dari hewan ternak di bagian depan rumah."]
  },
  {
    id: 2,
    title: "TANTANGAN 3",
    src: "https://jigex.com/6yVue",
    allKeywords: ["Pempek Palembang", "makanan", "ikan", "sagu", "kenyal", "cuko", "asam", "pedas", "manis", "telur", "piring"],
    hints: ["Sebutkan nama hidangan ini dan asal kotanya", "Terbuat dari bahan dasar apa adonannya?", "Jelaskan tentang cairan pendamping berwarna gelap (cuko)."]
  },
  {
    id: 3,
    title: "TANTANGAN 4",
    src: "https://jigex.com/ZKcte",
    allKeywords: ["Jakarta", "ondel-ondel", "Monas", "Betawi", "kota", "ramai", "macet", "bemo", "tari", "jaipong"],
    hints: ["Sebutkan nama wilayah pusat pemerintahan ini dan simbol bangunannya.", "Perhatikan kesenian berupa boneka raksasa di sana.", "Sebutkan transportasi umum atau suasana kota sibuknya."]
  },
  {
    id: 4,
    title: "TANTANGAN 5",
    src: "https://jigex.com/yfABx",
    allKeywords: ["Papua", "Papua Barat", "papeda", "sagu", "honai", "atap", "jerami", "tifa", "tari", "Sajojo"],
    hints: ["Wilayah manakah yang memiliki rumah adat berbentuk bulat (Honai)?", "Sebutkan makanan pokok tradisional yang teksturnya lengket.", "Sebutkan alat musik pukul khas mereka."]
  }
];

export default function PermainanPageLevel2() {
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [savedScores, setSavedScores] = useState<{ [key: number]: number }>({});
  const [animatedScores, setAnimatedScores] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [showReward, setShowReward] = useState(false);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [rewardData, setRewardData] = useState<{ 
    icon: string, title: string, badge: string, msg: string, color: string, textColor: string 
  } | null>(null);

  // State untuk Petunjuk Level 2
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    const localData = localStorage.getItem("level2_all_scores");
    if (localData) {
      const parsedScores = JSON.parse(localData);
      setSavedScores(parsedScores);
      setAnimatedScores(parsedScores);
      const completed = LEVEL_2_GAMES.every((_, i) => (parsedScores[i] || 0) >= 100);
      setIsLevelFinished(completed);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentView === "game" && timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [currentView, timeLeft, isSubmitted]);

  const detectedKeywords = useMemo(() => {
    const input = description.toLowerCase();
    if (!input || !LEVEL_2_GAMES[activeGameIndex]) return [];
    return Array.from(new Set(LEVEL_2_GAMES[activeGameIndex].allKeywords.filter(word => 
      input.includes(word.toLowerCase())
    )));
  }, [description, activeGameIndex]);

  const count = detectedKeywords.length;

  const startGame = (index: number) => {
    setActiveGameIndex(index);
    setCurrentView("game");
    setDescription("");
    setScore(0);
    setIsSubmitted(false);
    setShowReward(false);
    setTimeLeft(300);
  };

  const checkAnswer = () => {
    const input = description.trim().toLowerCase();
    if (input.length < 5) return alert("Ayo ceritakan hasil pengamatanmu lebih panjang lagi!");

    let finalScore = count >= 3 ? 100 : Math.round((count / 3) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    setShowReward(true);
    
    const prevBest = savedScores[activeGameIndex] || 0;
    let newScores = { ...savedScores };

    if (finalScore > prevBest) {
      newScores = { ...savedScores, [activeGameIndex]: finalScore };
      setSavedScores(newScores);
      setAnimatedScores(newScores);
      localStorage.setItem("level2_all_scores", JSON.stringify(newScores));
    }

    const isAllDone = LEVEL_2_GAMES.every((_, i) => (newScores[i] || 0) >= 100);
    if (isAllDone) {
      localStorage.setItem("highestLevelCompleted", "2");
      setIsLevelFinished(true);
    }

    if (finalScore === 100) {
      setRewardData({
        icon: "🏆", title: "FANTASTIS!", badge: "DETEKTIF AHLI",
        msg: isAllDone ? "LUAR BIASA! Level 3 kini telah terbuka!" : "Analisis yang luar biasa! Kamu berhasil menemukan poin penting.",
        color: "bg-yellow-400", textColor: "text-yellow-900"
      });
    } else {
      setRewardData({
        icon: "💡", title: "AYO BERUSAHA!", badge: "PENGAMAT",
        msg: `Temukan minimal 3 kata kunci untuk nilai sempurna!`,
        color: "bg-blue-400", textColor: "text-blue-900"
      });
    }
  };

  if (!mounted) return null;

  return (
    <div className={`relative w-full bg-[#E0F7FA] ${fredoka.className} min-h-screen pt-20 pb-10 overflow-hidden`}>
      
      {/* 1. MODAL PETUNJUK LEVEL 2 (OTOMATIS MUNCUL) */}
      {showInstructions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-[6px] border-cyan-500 animate-in zoom-in duration-300">
            {/* Header Modal */}
            <div className="p-5 bg-cyan-600 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <h2 className="text-xl font-bold uppercase tracking-wider">Petunjuk Permainan Level 2</h2>
              </div>
              <button 
                onClick={() => setShowInstructions(false)}
                className="bg-white/20 hover:bg-white/40 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all"
              >✕</button>
            </div>

            {/* Isi Petunjuk (Iframe) */}
            <div className="flex-1 bg-gray-100">
              <iframe
                src="https://drive.google.com/file/d/18U_9KgyC6cPBwgAI3L1L_gXP_2uhS8QM/preview"
                className="w-full h-full border-none"
                title="Petunjuk Level 2"
              />
            </div>

            {/* Footer Modal */}
            <div className="p-5 bg-cyan-50 flex justify-center border-t-2 border-cyan-100">
              <button 
                onClick={() => setShowInstructions(false)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-12 py-3 rounded-full font-black text-lg shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                MENGERTI & MULAI! ✅
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOMBOL PETUNJUK TETAP (POJOK KANAN BAWAH) */}
      <button 
        onClick={() => setShowInstructions(true)}
        className="fixed bottom-6 right-6 z-[90] bg-cyan-500 hover:bg-cyan-600 text-white w-16 h-16 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-white transition-all hover:scale-110 active:scale-95 group"
      >
        <span className="text-2xl group-hover:animate-bounce">📖</span>
        <span className="text-[9px] font-bold uppercase">Petunjuk</span>
      </button>

      {currentView === "selection" ? (
        <div className="container mx-auto px-4 flex flex-col items-center animate-in fade-in duration-500">
          <button onClick={() => router.push("/bahan-belajar/permainan/")} className="md:absolute top-8 left-8 bg-white text-cyan-600 px-6 py-2 rounded-full font-bold shadow-md border-2 border-cyan-500 hover:scale-105 transition-all z-20">⬅ Menu Utama</button>
          
          <h1 className={`text-4xl md:text-5xl text-cyan-700 font-bold mb-2 ${salsa.className}`}>LEVEL 2</h1>
          
          {isLevelFinished ? (
            <div className="bg-green-100 border-2 border-green-400 rounded-full px-8 py-2 mb-8 text-green-800 font-bold shadow-sm flex items-center gap-2">
              <span>🎉 Hebat! Level 3 telah terbuka!</span>
            </div>
          ) : (
            <div className="bg-cyan-100 border-2 border-cyan-300 rounded-full px-8 py-2 mb-8 text-cyan-800 font-bold shadow-sm italic text-sm text-center">
              "Selesaikan semua tantangan (Skor 100) untuk membuka Level 3!"
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mt-5">
            {LEVEL_2_GAMES.map((game, i) => {
              const realScore = savedScores[i] || 0;
              const isPerfect = realScore === 100;
              return (
                <button key={game.id} onClick={() => startGame(i)} className={`group relative bg-white border-4 rounded-[2.5rem] p-8 shadow-xl transition-all hover:-translate-y-2 hover:scale-105 active:scale-95 ${isPerfect ? 'border-yellow-400' : 'border-cyan-200'}`}>
                  {isPerfect && <div className="absolute -top-7 -left-5 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-400 text-4xl animate-bounce z-10">🏆</div>}
                  <h3 className={`text-xl font-bold text-gray-800 mb-1 ${salsa.className}`}>TANTANGAN {i + 1}</h3>
                  <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden mb-2 mt-2 border border-gray-200 shadow-inner">
                    <div className={`h-full transition-all duration-1000 ${isPerfect ? 'bg-yellow-400' : 'bg-blue-400'}`} style={{ width: `${animatedScores[i] || 0}%` }}></div>
                  </div>
                  <div className="text-right text-sm font-black text-cyan-700">{realScore}%</div>
                </button>
              );
            })}
          </div>

          {isLevelFinished && (
            <button onClick={() => router.push("/bahan-belajar/permainan/3/")} className="mt-12 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-black text-xl shadow-2xl animate-pulse transition-all">
              MENUJU LEVEL 3 🚀
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col h-[85vh] container mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[6px] border-cyan-600 relative">
          <div className={`p-4 flex justify-between items-center text-white ${count >= 3 ? 'bg-green-600' : 'bg-cyan-600'}`}>
            <button onClick={() => setCurrentView("selection")} className="bg-white text-cyan-600 px-5 py-1.5 rounded-full font-bold text-xs shadow-md">⬅ Kembali</button>
            <div className="font-mono text-2xl font-bold bg-black/20 px-4 py-1 rounded-2xl">⏰ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
            <div className={`px-6 py-1.5 rounded-full font-black border-2 ${count >= 3 ? 'bg-white text-green-600 border-white animate-pulse' : 'bg-white/20 border-white/30'}`}>POIN: {count}/3</div>
          </div>

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden relative">
            <div className="w-full md:w-3/5 lg:w-2/3 bg-gray-200">
              <iframe src={LEVEL_2_GAMES[activeGameIndex].src} className="w-full h-full border-none" title="Game" />
            </div>

            <div className="w-full md:w-2/5 lg:w-1/3 bg-cyan-50 p-6 flex flex-col overflow-y-auto">
              <div className="bg-white p-4 rounded-3xl border-2 border-cyan-200 mb-4 shadow-sm text-[11px] text-cyan-700">
                <p className="font-bold text-cyan-800 uppercase mb-2">💡 Petunjuk Observasi:</p>
                <ul className="list-disc ml-5 space-y-1">{LEVEL_2_GAMES[activeGameIndex].hints.map((h, idx) => <li key={idx}>{h}</li>)}</ul>
              </div>

              <textarea 
                value={description} 
                onChange={(e) => { setDescription(e.target.value); setIsSubmitted(false); }} 
                disabled={isSubmitted} 
                placeholder="Tuliskan laporan hasil pengamatanmu di sini..." 
                className={`w-full flex-grow p-5 border-4 rounded-[2rem] mb-4 text-sm outline-none transition-all resize-none shadow-inner ${count >= 3 ? 'border-green-400 bg-green-50' : 'border-cyan-200 bg-white'}`} 
              />

              {showReward && rewardData ? (
                <div className={`p-5 rounded-[2rem] border-4 ${rewardData.color} shadow-xl animate-in slide-in-from-bottom duration-500 mb-4`}>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl animate-bounce">{rewardData.icon}</span>
                    <div>
                      <div className={`text-xl font-black ${rewardData.textColor}`}>{rewardData.title}</div>
                      <div className="text-[9px] bg-white/60 px-3 py-0.5 rounded-full font-bold mt-1 inline-block uppercase tracking-wider">{rewardData.badge}</div>
                    </div>
                    <div className="ml-auto text-3xl font-black">{score}%</div>
                  </div>
                  <p className="text-xs font-medium mb-4 italic text-center text-gray-700">{rewardData.msg}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => startGame(activeGameIndex)} className="bg-blue-500 text-white py-3 rounded-2xl font-bold text-xs shadow-md">🔄 Ulangi</button>
                    <button 
                      onClick={() => {
                        if (activeGameIndex < LEVEL_2_GAMES.length - 1) {
                          startGame(activeGameIndex + 1);
                        } else {
                          router.push("/bahan-belajar/permainan/3/");
                        }
                      }} 
                      className="bg-cyan-600 text-white py-3 rounded-2xl font-bold text-xs shadow-md"
                    >
                      {activeGameIndex < LEVEL_2_GAMES.length - 1 ? "Lanjut ➡" : "Ke Level 3 ✨"}
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={checkAnswer} className={`w-full py-5 rounded-[2rem] font-black text-white text-lg shadow-xl transition-all ${description.length >= 5 ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-400 cursor-not-allowed'}`}>KIRIM HASIL 🚀</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}