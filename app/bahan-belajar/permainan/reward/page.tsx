"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { Fredoka, Salsa } from "next/font/google";
import { useMusic } from "../../../music-context"; // Pastikan path benar

const fredoka = Fredoka({ weight: ["400", "700"], subsets: ["latin"] });
const salsa = Salsa({ weight: ["400"], subsets: ["latin"] });

const LEVEL_1_GAMES = [
  { id: 0, title: "TANTANGAN 1", src: "https://jigex.com/pF93V", keywords: ["wayang", "kulit", "pipih", "jawa"], hints: ["Bentuk pipih dari kulit", "Berasal dari Jawa"] },
  { id: 1, title: "TANTANGAN 2", src: "https://jigex.com/VHnhs", keywords: ["kecak", "bali", "api", "cak"], hints: ["Tarian khas Bali", "Ada atraksi api"] },
  { id: 2, title: "TANTANGAN 3", src: "https://jigex.com/8egRX", keywords: ["reog", "ponorogo", "merak", "singa"], hints: ["Topeng besar singa", "Hiasan bulu merak"] },
  { id: 3, title: "TANTANGAN 4", src: "https://jigex.com/caQ63", keywords: ["gudeg", "jogja", "nangka", "manis"], hints: ["Kuliner nangka muda", "Rasa manis khas Jogja"] },
  { id: 4, title: "TANTANGAN 5", src: "https://jigex.com/11pss", keywords: ["ondel", "betawi", "jakarta", "raksasa"], hints: ["Boneka raksasa", "Ikon kota Jakarta"] }
];

export default function PermainanPageLevel1() {
  const router = useRouter();
  const { playClickSound } = useMusic();

  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedScores, setSavedScores] = useState<{[key: number]: number}>({});
  const [timeLeft, setTimeLeft] = useState(180);
  
  // MODALS
  const [showInstructions, setShowInstructions] = useState(true);
  const [showLevelSummary, setShowLevelSummary] = useState(false);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("level1_all_scores") || "{}");
    setSavedScores(scores);
  }, []);

  useEffect(() => {
    if (currentView !== "game" || isSubmitted) return;
    const timer = setInterval(() => setTimeLeft(p => (p <= 0 ? 0 : p - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentView, isSubmitted]);

  const currentCount = useMemo(() => {
    const input = description.toLowerCase();
    const words = LEVEL_1_GAMES[activeGameIndex].keywords;
    return new Set(words.filter(w => input.includes(w))).size;
  }, [description, activeGameIndex]);

  const startGame = (idx: number) => {
    playClickSound(); setActiveGameIndex(idx); setCurrentView("game");
    setDescription(""); setScore(0); setIsSubmitted(false); setTimeLeft(180);
  };

  const checkAnswer = () => {
    if (description.trim().length < 5) return alert("Ceritakan lebih banyak!");
    const finalScore = currentCount >= 3 ? 100 : Math.round((currentCount / 3) * 100);
    const newScores = { ...savedScores, [activeGameIndex]: finalScore };
    setScore(finalScore); setIsSubmitted(true); setSavedScores(newScores);
    localStorage.setItem("level1_all_scores", JSON.stringify(newScores));
    localStorage.setItem("highestLevelCompleted", "0"); // Menandakan sedang di level 1
  };

  const totalScore = Object.values(savedScores).reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <div className={`min-h-screen bg-[#FFF8DC] ${fredoka.className} pt-20 pb-10`}>
      {/* MODAL PETUNJUK */}
      {showInstructions && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[2rem] border-[6px] border-orange-500 overflow-hidden flex flex-col">
            <div className="p-4 bg-orange-500 text-white font-bold text-center">PETUNJUK LEVEL 1</div>
            <iframe src="https://drive.google.com/file/d/1LN8puhnEelkZtVZKOWAcGFs381QrdLTR/preview" className="flex-1 w-full border-none" />
            <button onClick={() => setShowInstructions(false)} className="m-4 bg-orange-600 text-white py-3 rounded-full font-bold">MULAI BERMAIN ✅</button>
          </div>
        </div>
      )}

      {/* MODAL RAPOR */}
      {showLevelSummary && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] border-[6px] border-orange-500 p-6 text-center">
            <div className="text-5xl mb-2">🏆</div>
            <h2 className={`${salsa.className} text-2xl font-bold mb-4`}>RAPOR LEVEL 1</h2>
            <div className="space-y-2 mb-6 text-left">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="flex justify-between bg-orange-50 p-3 rounded-xl border border-orange-100">
                  <span className="font-bold text-gray-600">Tantangan {i+1}</span>
                  <span className="font-black text-orange-600">{savedScores[i] || 0}%</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-2xl mb-6">
              <p className="text-xs text-orange-400">TOTAL SKOR:</p>
              <p className="text-4xl font-black">{totalScore} / 500</p>
            </div>
            <button onClick={() => { localStorage.setItem("highestLevelCompleted", "1"); router.push("/bahan-belajar/permainan/2/"); }} className="w-full bg-green-500 text-white py-4 rounded-full font-bold">MAJU KE LEVEL 2 🚀</button>
          </div>
        </div>
      )}

      {/* FLOATING HELP */}
      <button onClick={() => setShowInstructions(true)} className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white w-14 h-14 rounded-full border-4 border-white shadow-xl">📖</button>

      {currentView === "selection" ? (
        <div className="container mx-auto px-4 flex flex-col items-center">
          <button onClick={() => router.push("/bahan-belajar/permainan/")} className="md:absolute top-8 left-8 bg-white text-orange-600 px-6 py-2 rounded-full border-2 border-orange-500 font-bold">⬅ Menu Utama</button>
          <h1 className={`${salsa.className} text-5xl text-orange-600 mb-8`}>LEVEL 1</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {LEVEL_1_GAMES.map((g, i) => (
              <button key={i} onClick={() => startGame(i)} className={`p-8 bg-white border-4 rounded-[2rem] shadow-lg ${savedScores[i] >= 100 ? 'border-green-400' : 'border-orange-300'}`}>
                <h3 className="font-bold">TANTANGAN {i+1}</h3>
                <div className="text-orange-600 font-black mt-2">Skor: {savedScores[i] || 0}%</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto h-[85vh] bg-white rounded-[2rem] border-[6px] border-orange-500 flex flex-col overflow-hidden">
          <div className="bg-orange-500 p-4 flex justify-between text-white font-bold items-center">
            <button onClick={() => setCurrentView("selection")} className="bg-white text-orange-600 px-4 py-1 rounded-full text-xs">⬅ Kembali</button>
            <div>⏰ {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
            <div className="bg-orange-700 px-4 py-1 rounded-full text-xs">POIN: {currentCount}/3</div>
          </div>
          <div className="flex flex-col md:flex-row flex-grow">
            <iframe src={LEVEL_1_GAMES[activeGameIndex].src} className="flex-[2] border-none" />
            <div className="flex-1 bg-orange-50 p-6 flex flex-col">
              <textarea value={description} onChange={e => setDescription(e.target.value)} disabled={isSubmitted} className="flex-1 p-4 rounded-xl border-2 mb-4 outline-none resize-none" placeholder="Tulis pengamatanmu..." />
              {isSubmitted ? (
                <div className="bg-white p-4 rounded-xl border-2 border-orange-200">
                  <div className="flex justify-between font-bold mb-3"><span>SKOR:</span> <span>{score}%</span></div>
                  <button onClick={() => { if(activeGameIndex < 4) startGame(activeGameIndex+1); else setShowLevelSummary(true); }} className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold">
                    {activeGameIndex < 4 ? "Tantangan Berikutnya ➡" : "LIHAT RAPOR LEVEL 1 ✨"}
                  </button>
                </div>
              ) : (
                <button onClick={checkAnswer} className="bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg">KIRIM HASIL 🚀</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}