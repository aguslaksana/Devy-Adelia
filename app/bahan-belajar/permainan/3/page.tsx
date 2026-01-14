"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Fredoka, Salsa } from "next/font/google";

const fredoka = Fredoka({ weight: ["400"], subsets: ["latin"] });
const salsa = Salsa({ weight: ["400"], subsets: ["latin"] });

type Keyword = { words: string[]; label: string; };
type GameData = { id: number; title: string; src: string; keywords: Keyword[]; hints: string[]; };

// === DATA GAME LEVEL 3 DENGAN CLUE PARAGRAF ===
const LEVEL_3_GAMES: GameData[] = [
  {
    id: 0,
    title: "Suku Dayak",
    src: "https://jigex.com/3xyUL",
    keywords: [
      { words: ["dayak"], label: "Suku" },
      { words: ["baju", "pakaian"], label: "Pakaian Adat" },
      { words: ["hitam"], label: "Warna Dominan" },
      { words: ["manik", "hiasan"], label: "Detail Manik" },
      { words: ["kalimantan"], label: "Asal Daerah" }
    ],
    hints: [
      "Sebutkan nama Suku Dayak dan asal daerahnya (Kalimantan)",
      "Ceritakan warna baju adat yang mereka gunakan (Hitam)",
      "Jelaskan detail hiasan pada bajunya (Manik-manik)",
      "Gunakan kata 'unik' atau 'khas' untuk menutup paragrafmu"
    ]
  },
  {
    id: 1,
    title: "Rumah Adat",
    src: "https://jigex.com/bPT2x",
    keywords: [
      { words: ["rumah"], label: "Objek" },
      { words: ["tinggi", "atap"], label: "Bentuk Atap" },
      { words: ["kayu", "papan"], label: "Bahan Bangunan" },
      { words: ["adat", "tradisional"], label: "Jenis" }
    ],
    hints: [
      "Apa objek utama pada gambar? (Rumah Adat)",
      "Bagaimana bentuk atapnya? (Tinggi/Melengkung)",
      "Terbuat dari bahan apa rumah tersebut? (Kayu/Alam)",
      "Mengapa rumah ini terlihat istimewa?"
    ]
  },
  {
    id: 2,
    title: "Kuda Lumping",
    src: "https://jigex.com/WuN8v",
    keywords: [
      { words: ["kuda", "lumping"], label: "Nama Tarian" },
      { words: ["jawa"], label: "Asal Daerah" },
      { words: ["properti", "anyaman", "bambu"], label: "Alat Tari" },
      { words: ["atraksi", "pertunjukan"], label: "Sifat" }
    ],
    hints: [
      "Nama tarian ini adalah Kuda Lumping dari Jawa",
      "Sebutkan properti yang digunakan (Kuda tiruan dari bambu)",
      "Ceritakan gerakan atau suasana penarinya",
      "Sebutkan bahwa ini adalah tradisi yang seru"
    ]
  },
  {
    id: 3,
    title: "Tari Tor-tor",
    src: "https://jigex.com/XqWWt",
    keywords: [
      { words: ["tor", "tortor"], label: "Nama Tari" },
      { words: ["batak", "sumatera", "toba"], label: "Asal" },
      { words: ["ulos"], label: "Kain Adat" },
      { words: ["baris", "serempak"], label: "Gerakan" }
    ],
    hints: [
      "Sebutkan Suku Batak atau Sumatera Utara sebagai asalnya",
      "Nama tariannya adalah Tor-tor",
      "Sebutkan kain khas yang dipakai (Ulos)",
      "Bagaimana posisi atau gerakan para penarinya?"
    ]
  },
  {
    id: 4,
    title: "Gamelan",
    src: "https://jigex.com/5JBk7",
    keywords: [
      { words: ["gamelan"], label: "Nama Alat" },
      { words: ["musik", "tabuh"], label: "Jenis" },
      { words: ["gong", "kendang", "saron"], label: "Instrumen" },
      { words: ["jawa", "bali"], label: "Budaya" }
    ],
    hints: [
      "Ini adalah seperangkat alat musik Gamelan",
      "Sebutkan salah satu alatnya seperti Gong atau Kendang",
      "Berasal dari kebudayaan daerah mana? (Jawa/Bali)",
      "Kapan biasanya musik ini dimainkan?"
    ]
  }
];

export default function PermainanPageLevel3() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [rewardData, setRewardData] = useState<{icon: string, title: string, msg: string, color: string} | null>(null);
  const [savedScores, setSavedScores] = useState<{[key: number]: number}>({});

  const GAME_DURATION = 360; // 6 Menit
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("level3_all_scores") || "{}");
    setSavedScores(scores);
    
    // Cek progres level
    const progress = Number(localStorage.getItem('highestLevelCompleted') || 0);
    if (progress < 2) {
      // router.replace('/bahan-belajar/permainan'); // Opsional jika ingin mengunci level
    }
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
    if (!description.trim()) return alert("Tuliskan paragrafmu dulu!");
    
    const currentGame = LEVEL_3_GAMES[activeGameIndex];
    const input = description.toLowerCase();
    let matches = 0;
    currentGame.keywords.forEach((k) => { if (k.words.some((w) => input.includes(w))) matches++; });
    
    const finalScore = Math.round((matches / currentGame.keywords.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    const newScores = { ...savedScores, [activeGameIndex]: finalScore };
    setSavedScores(newScores);
    localStorage.setItem("level3_all_scores", JSON.stringify(newScores));

    if (finalScore >= 90) {
      setRewardData({ icon: "🏆", title: "EMAS SEMPURNA!", msg: "Paragrafmu luar biasa detail! Kamu adalah ahli budaya!", color: "bg-yellow-50 border-yellow-400 text-yellow-700" });
    } else if (finalScore >= 70) {
      setRewardData({ icon: "🥈", title: "PERAK HEBAT!", msg: "Bagus! Paragrafmu sudah menjelaskan keunikan budaya dengan baik.", color: "bg-gray-100 border-gray-400 text-gray-700" });
    } else {
      setRewardData({ icon: "💡", title: "COBA LAGI!", msg: "Gunakan 'Petunjuk' agar paragrafmu lebih lengkap dan detail.", color: "bg-green-50 border-green-400 text-green-700" });
    }
  };

  const nextChallenge = () => {
    if (activeGameIndex < LEVEL_3_GAMES.length - 1) startGame(activeGameIndex + 1);
    else setCurrentView("selection");
  };

  return (
    <div className={`relative w-full bg-[#E8F5E9] ${fredoka.className} min-h-screen pt-10 pb-10`}>

      {/* SELECTION SCREEN */}
      {currentView === "selection" && (
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className={`text-4xl text-green-800 font-bold mb-2 ${salsa.className}`}>LEVEL 3</h1>
          <div className="bg-green-100 border-2 border-green-300 rounded-lg px-6 py-2 mb-8 text-green-900 font-bold shadow-sm">
            ⏳ Waktu Pengerjaan: 6 Menit / Game
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
            {LEVEL_3_GAMES.map((game, i) => {
              const hasScore = savedScores[i] !== undefined;
              return (
                <button key={i} onClick={() => startGame(i)} className={`relative bg-white border-4 rounded-3xl p-6 shadow-lg transition-all hover:scale-105 ${hasScore ? 'border-emerald-400' : 'border-green-300'}`}>
                  {hasScore && (
                    <div className="absolute -top-3 -left-3 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg font-bold border-2 border-white">
                      {savedScores[i] >= 90 ? "🏆" : "🥈"}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-bl-xl text-xs font-bold uppercase">Misi {i + 1}</div>
                  <h3 className={`text-xl font-bold text-gray-800 mb-1 ${salsa.className}`}>{game.title}</h3>
                  <p className="text-gray-500 text-[10px] mb-3 leading-tight text-left italic">Tuliskan 1 paragraf utuh (min. 5 kalimat) tentang budaya ini!</p>
                  {hasScore && <div className="text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg py-1 px-2">Skor Terbaik: {savedScores[i]}</div>}
                </button>
              );
            })}
          </div>
          
          <button onClick={() => { localStorage.setItem("highestLevelCompleted", "3"); router.push("/bahan-belajar/permainan"); }} className="bg-green-600 text-white font-bold py-3 px-10 rounded-full shadow-xl hover:bg-green-700 transition-all border-b-4 border-green-900">✅ Selesai Semua Level</button>
        </div>
      )}

      {/* GAME SCREEN */}
      {currentView === "game" && (
        <div className="flex flex-col h-[90vh] container mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-500 mt-4">
          <div className="bg-green-600 p-4 flex justify-between items-center text-white">
            <button onClick={() => setCurrentView("selection")} className="bg-white text-green-700 px-4 py-1 rounded-full font-bold text-xs shadow-md active:scale-90 transition-all">⬅ Menu</button>
            <div className="font-mono text-lg font-bold bg-white/20 px-4 py-1 rounded-lg">⏰ {formatTime(timeLeft)}</div>
            <div className="bg-green-800 px-4 py-1 rounded-lg font-bold text-sm">Skor: {score}</div>
          </div>

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            {/* Puzzle Area */}
            <div className="w-full md:w-2/3 bg-gray-900 relative">
              <iframe src={LEVEL_3_GAMES[activeGameIndex].src} className="w-full h-full border-none" />
              {timeLeft === 0 && !isSubmitted && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 text-white p-4">
                  <h2 className="text-2xl mb-4 text-red-500 font-bold uppercase">Waktu Habis!</h2>
                  <button onClick={() => startGame(activeGameIndex)} className="bg-green-500 px-8 py-2 rounded-full font-bold hover:scale-110">Coba Lagi</button>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="w-full md:w-1/3 bg-green-50 p-6 flex flex-col h-full border-l-4 border-green-100 overflow-y-auto">
              <div className="bg-white p-3 rounded-2xl border-2 border-green-200 mb-4 shadow-sm">
                <button onClick={() => setShowHint(!showHint)} className="flex items-center justify-between w-full text-[10px] font-bold text-green-800 uppercase mb-1 outline-none">
                  💡 Petunjuk Paragraf {showHint ? "▲" : "▼"}
                </button>
                {showHint && (
                  <ul className="text-[10px] text-green-700 list-disc ml-4 leading-tight italic">
                    {LEVEL_3_GAMES[activeGameIndex].hints.map((h, idx) => <li key={idx} className="mb-1">{h}</li>)}
                  </ul>
                )}
              </div>

              <h2 className={`text-md font-bold text-green-800 mb-2 ${salsa.className}`}>Tulis Paragraf Budaya</h2>
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); setIsSubmitted(false); }}
                disabled={timeLeft === 0 || isSubmitted}
                placeholder="Tuliskan minimal 1 paragraf lengkap di sini..."
                className="w-full flex-grow p-4 border-2 border-green-200 rounded-2xl mb-4 text-sm focus:border-green-500 outline-none shadow-inner bg-white disabled:bg-gray-50 resize-none"
              />

              {isSubmitted && rewardData ? (
                <div className={`mb-4 p-4 rounded-2xl border-2 text-center animate-bounce ${rewardData.color}`}>
                  <div className="text-4xl mb-1">{rewardData.icon}</div>
                  <div className="text-sm font-extrabold uppercase mb-1 tracking-tight">{rewardData.title}</div>
                  <div className="text-[10px] leading-tight mb-3 font-bold italic">"{rewardData.msg}"</div>
                  <button onClick={nextChallenge} className="bg-green-700 text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-green-800 shadow-md">
                    {activeGameIndex < LEVEL_3_GAMES.length - 1 ? "Lanjut Misi Berikutnya ➡" : "Kembali ke Menu"}
                  </button>
                </div>
              ) : (
                <button onClick={checkAnswer} disabled={timeLeft === 0} className="w-full py-3 rounded-2xl font-bold text-white shadow-lg bg-emerald-600 hover:bg-emerald-700 transition-all active:scale-95 disabled:bg-gray-400">
                  Simpan Paragraf
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}