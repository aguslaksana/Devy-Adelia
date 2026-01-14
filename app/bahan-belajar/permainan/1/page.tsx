"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Fredoka, Salsa } from "next/font/google";

const fredoka = Fredoka({ weight: ["400", "700"], subsets: ["latin"] });
const salsa = Salsa({ weight: ["400"], subsets: ["latin"] });

type Keyword = { words: string[]; label: string; };
type GameData = { id: number; title: string; src: string; keywords: Keyword[]; hints: string[]; };

const LEVEL_1_GAMES: GameData[] = [
  {
    id: 0,
    title: "TANTANGAN 1",
    src: "https://jigex.com/pF93V",
    keywords: [
      { label: "Budaya & Tradisi", words: ["Wayang", "wayang kulit", "tokoh wayang", "seni tradisional", "budaya Indonesia", "warisan budaya bangsa", "kesenian daerah", "pertunjukan wayang", "cerita pewayangan", "kisah Mahabharata", "kisah Ramayana", "tradisi Jawa", "jawa", "budaya nusantara"] },
      { label: "Warna & Nuansa", words: ["cokelat", "cokelat tua", "cokelat muda", "cokelat keemasan", "warna alami", "warna kayu", "warna tanah", "warna gelap", "nuansa tradisional", "nuansa klasik", "antik", "kuno"] },
      { label: "Bentuk & Ukiran", words: ["pipih", "datar", "ukiran halus", "ukiran detail", "motif rumit", "motif tradisional", "hiasan khas", "detail rapi", "tubuh ramping", "tubuh panjang", "wajah khas", "wajah tegas", "hidung panjang", "mata sipit", "mata tajam", "mulut kecil", "ekspresi tenang"] },
      { label: "Pakaian & Aksesoris", words: ["mahkota", "hiasan kepala", "busana tradisional", "pakaian adat", "kain bermotif", "ikat pinggang", "gelang", "kalung", "ornamen"] },
      { label: "Bahan & Ketahanan", words: ["kulit", "kulit sapi", "bahan alami", "permukaan halus", "tekstur keras", "tekstur kaku", "kuat", "awet", "tahan lama"] },
      { label: "Makna & Edukasi", words: ["kerajinan", "buatan tangan", "karya seni", "seni ukir", "bernilai seni", "indah", "menarik", "unik", "artistik", "estetis", "berwibawa", "anggun", "sakral", "bersejarah", "filosofis", "dalang", "hiburan", "pendidikan", "pesan moral", "nilai luhur", "teladan"] }
    ],
    hints: ["Ciri khas bentuknya pipih dan berasal dari kulit", "Sebutkan detail warna dan fisiknya", "Apa nilai seni dan sejarahnya?"]
  },
  {
    id: 1,
    title: "TANTANGAN 2",
    src: "https://jigex.com/VHnhs",
    keywords: [
      { label: "Seni & Bali", words: ["Tari Kecak", "Bali", "seni tradisional", "warisan budaya", "pertunjukan tari", "tarian daerah", "tarian khas"] },
      { label: "Kisah & Tokoh", words: ["Ramayana", "Rama", "Sinta", "Hanoman"] },
      { label: "Irama & Gerak", words: ["penari pria", "duduk melingkar", "serempak", "gerakan tangan", "tanpa alat musik", "cak cak cak", "irama vokal", "suara kompak"] },
      { label: "Kostum & Api", words: ["kotak hitam putih", "kain poleng", "busana tradisional", "hiasan kepala", "ikat kepala", "telanjang dada", "cahaya api", "obor menyala", "api unggun"] },
      { label: "Suasana & Nilai", words: ["malam hari", "latar pura", "panggung terbuka", "sakral", "magis", "khidmat", "tegang", "dramatis", "meriah", "penuh energi", "kebersamaan", "kekompakan", "kerja sama", "keharmonisan", "mempesona", "memukau", "indah", "seru"] }
    ],
    hints: ["Sebutkan suara vokal khas tarian ini", "Jelaskan kostum kotak-kotak dan suasana api", "Sebutkan asal daerah dan nilai kebersamaannya"]
  },
  {
    id: 2,
    title: "TANTANGAN 3",
    src: "https://jigex.com/8egRX",
    keywords: [
      { label: "Identitas Jatim", words: ["Reog", "Ponorogo", "Jawa Timur", "kesenian tradisional", "menarik",  "warisan budaya", "pertunjukan rakyat", "seni pertunjukan", "tarian daerah"] },
      { label: "Atribut Utama", words: ["Singa Barong", "kepala singa", "topeng reog", "dadak merak", "bulu merak", "mengembang", "besar", "megah", "gagah", "berat", "kokoh"] },
      { label: "Penari & Gerak", words: ["penari utama", "warok", "penari jathil", "gerakan kuat", "gerakan tegas", "gerakan dinamis"] },
      { label: "Musik & Busana", words: ["musik tradisional", "gamelan", "kendang", "gong", "irama keras", "irama menghentak", "lantang", "warna-warni", "merah", "hitam", "kuning", "hiasan kepala", "busana tradisional", "kain adat", "ikat pinggang"] },
      { label: "Energi & Keberanian", words: ["ruang terbuka", "lapangan", "panggung", "penonton", "meriah", "semangat", "magis", "sakral", "berani", "heroik", "budaya lokal", "kekuatan", "ketahanan fisik", "keberanian", "kebanggaan", "identitas"] }
    ],
    hints: ["Sebutkan topeng besar berbentuk singa", "Jelaskan tentang bulu merak yang megah", "Gambarkan kekuatan penari dan irama musiknya"]
  },
  {
    id: 3,
    title: "TANTANGAN 4",
    src: "https://jigex.com/caQ63",
    keywords: [
      { label: "Kuliner & Jogja", words: ["Gudeg", "Jogja", "Yogyakarta", "makanan khas", "kuliner tradisional", "masakan daerah", "warisan kuliner", "nusantara"] },
      { label: "Bahan & Bumbu", words: ["nangka muda", "segar", "santan", "santan kental", "bumbu tradisional", "rempah", "gula jawa", "daun jati", "lengkuas", "bawang merah", "bawang putih", "ketumbar"] },
      { label: "Rasa & Tekstur", words: ["harum", "aroma khas", "manis", "gurih", "warna cokelat", "cokelat tua", "cokelat kemerahan", "menggugah selera", "legit", "cita rasa", "tekstur lembut", "empuk", "berserat", "areh"] },
      { label: "Penyajian & Lauk", words: ["disajikan hangat", "piring", "pincuk", "nasi putih", "nasi hangat", "lauk", "ayam kampung", "ayam opor", "ayam bacem", "telur pindang", "telur bacem", "tahu bacem", "tempe bacem", "krecek pedas", "sambal krecek", "cabai merah"] },
      { label: "Sosial & Budaya", words: ["legendaris", "favorit", "digemari", "warung", "kaki lima", "oleh-oleh", "sarapan", "makan siang", "makan malam", "tradisional", "akrab", "nyaman", "kekeluargaan", "mengenyangkan"] }
    ],
    hints: ["Sebutkan bahan utama buah nangka", "Jelaskan rasa manis dan gurihnya", "Apa saja lauk pelengkap dan asal kotanya?"]
  },
  {
    id: 4,
    title: "TANTANGAN 5",
    src: "https://jigex.com/11pss",
    keywords: [
      { label: "Identitas Betawi", words: ["Ondel-ondel", "Betawi", "Jakarta", "seni tradisional", "warisan budaya", " besar", "tinggi", "pertunjukan rakyat", "jalanan"] },
      { label: "Fisik & Wajah", words: ["boneka raksasa", "boneka besar", "boneka tinggi", "tubuh tinggi", "wajah besar", "wajah khas", "tersenyum", "tegas", "ceria", "mata besar", "mata melotot", "alis tebal", "hidung mancung", "bibir tebal", "rambut hitam", "mahkota", "kembang kelapa"] },
      { label: "Busana Betawi", words: ["busana adat", "pakaian tradisional", "baju kurung", "kain batik", "kain sarung", "selendang", "warna cerah", "merah", "kuning", "hijau", "mencolok", "meriah"] },
      { label: "Gerak & Musik", words: ["anyaman bambu", "rangka bambu", "ringan", "penari", "berjalan", "mengayun", "berputar", "musik tradisional", "tanjidor", "gambang kromong", "kendang", "riang", "ceria"] },
      { label: "Konteks Jakarta", words: ["kampung", "acara adat", "perayaan", "pesta rakyat", "festival budaya", "penonton", "anak-anak", "warga", "ramai", "meriah", "gembira", "semarak", "hidup", "akrab", "kebersamaan", "identitas", "kebanggaan", "melestarikan"] }
    ],
    hints: ["Jelaskan boneka raksasa dari bambu ini", "Sebutkan warna-warni hiasan kepalanya", "Apa iringan musik khas dari daerah Jakarta?"]
  }
];

export default function PermainanPageLevel1() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [rewardData, setRewardData] = useState<{ icon: string, title: string, badge: string, msg: string, color: string } | null>(null);
  const [savedScores, setSavedScores] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(180);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("level1_all_scores") || "{}");
    setSavedScores(scores);
  }, []);

  useEffect(() => {
    if (currentView !== "game") return;
    if (timeLeft <= 0) {
      if (!isSubmitted) checkAnswer();
      return;
    }
    const timer = setInterval(() => { setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1)); }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentView, isSubmitted]);

  const startGame = (index: number) => {
    setActiveGameIndex(index);
    setCurrentView("game");
    setDescription("");
    setScore(0);
    setIsSubmitted(false);
    setTimeLeft(180);
    setRewardData(null);
  };

  const checkAnswer = () => {
    const input = description.trim().toLowerCase();
    if (!input && timeLeft > 0) return alert("Tuliskan deskripsi hasil observasimu dulu!");

    const currentGame = LEVEL_1_GAMES[activeGameIndex];
    const allWords = Array.from(new Set(currentGame.keywords.flatMap(k => k.words)));
    const wordsFound = allWords.filter(word => input.includes(word.toLowerCase()));

    let finalScore = 0;
    if (wordsFound.length >= 3) {
      finalScore = 100;
    } else {
      finalScore = Math.round((wordsFound.length / 3) * 100);
    }

    setScore(finalScore);
    setIsSubmitted(true);
    
    const prevBest = savedScores[activeGameIndex] || 0;
    if (finalScore > prevBest) {
      const newScores = { ...savedScores, [activeGameIndex]: finalScore };
      setSavedScores(newScores);
      localStorage.setItem("level1_all_scores", JSON.stringify(newScores));
    }

    if (finalScore === 100) {
      setRewardData({ icon: "🏆", title: "LULUS!", badge: "PAKAR BUDAYA", msg: `Hebat! Kamu menemukan ${wordsFound.length} kata kunci penting.`, color: "bg-yellow-50 border-yellow-400 text-yellow-700" });
    } else {
      setRewardData({ icon: "💡", title: "COBA LAGI", badge: "PEMBELAJAR", msg: `Baru ditemukan ${wordsFound.length} kata kunci. Butuh minimal 3 untuk lulus.`, color: "bg-blue-50 border-blue-400 text-blue-700" });
    }
  };

  const getLiveMatchCount = () => {
    const input = description.toLowerCase();
    const allWords = LEVEL_1_GAMES[activeGameIndex].keywords.flatMap(k => k.words);
    const uniqueMatches = new Set(allWords.filter(word => input.includes(word.toLowerCase())));
    return uniqueMatches.size;
  };

  const currentCount = getLiveMatchCount();

  return (
    <div className={`relative w-full bg-[#FFF8DC] ${fredoka.className} min-h-screen pt-20 pb-10`}>
      {currentView === "selection" && (
        <div className="container mx-auto px-4 flex flex-col items-center animate-in fade-in duration-500">
          {/* PERBAIKAN: Jalur navigasi ditambah "/" di akhir */}
          <button onClick={() => router.push("/bahan-belajar/permainan/")} className="md:absolute top-0 left-4 mb-6 md:mb-0 bg-white text-orange-600 px-6 py-2 rounded-full font-bold shadow-md border-2 border-orange-500 active:scale-95 transition-all">⬅ Menu Utama</button>
          
          <h1 className={`text-4xl md:text-5xl text-orange-600 font-bold mb-2 ${salsa.className}`}>LEVEL 1</h1>
          <div className="bg-orange-100 border-2 border-orange-300 rounded-full px-8 py-2 mb-8 text-orange-800 font-bold shadow-sm italic text-center">
            "Cukup temukan 3 kata kunci dalam laporanmu untuk skor 100!"
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {LEVEL_1_GAMES.map((game, i) => {
              const sVal = savedScores[i] || 0;
              return (
                <button key={i} onClick={() => startGame(i)} className={`group relative bg-white border-4 rounded-[2rem] p-8 shadow-xl transition-all hover:-translate-y-2 ${sVal >= 100 ? 'border-green-400' : 'border-orange-300'}`}>
                  {sVal >= 100 && (
                    <div className="absolute -top-4 -left-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg font-bold border-4 border-orange-500 text-xl animate-bounce">🏆</div>
                  )}
                  <h3 className={`text-2xl font-bold text-gray-800 mb-1 ${salsa.className}`}>TANTANGAN {i + 1}</h3>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mt-4 mb-2">
                    <div className="bg-orange-400 h-full transition-all duration-1000" style={{ width: `${sVal}%` }}></div>
                  </div>
                  <div className="text-right text-sm font-black text-orange-600">Skor: {sVal}%</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {currentView === "game" && (
        <div className="flex flex-col h-[90vh] container mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] border-orange-500 animate-in zoom-in duration-300">
          <div className="bg-orange-500 p-4 flex justify-between items-center text-white border-b-4 border-orange-600">
            <button onClick={() => setCurrentView("selection")} className="bg-white text-orange-600 px-5 py-1.5 rounded-full font-bold text-sm shadow-md">⬅ Kembali</button>
            <div className={`font-mono text-2xl font-bold bg-orange-700 px-4 py-1 rounded-2xl`}>
              ⏰ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className={`px-6 py-1.5 rounded-full font-black border border-white/30 transition-all ${currentCount >= 3 ? 'bg-green-500' : 'bg-white/20'}`}>
              TERDETEKSI: {currentCount}/3 Kata Kunci
            </div>
          </div>

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            <div className="w-full md:w-3/5 lg:w-2/3 bg-gray-200 relative">
              <iframe src={LEVEL_1_GAMES[activeGameIndex].src} className="w-full h-full border-none" title="Puzzle Content" />
            </div>

            <div className="w-full md:w-2/5 lg:w-1/3 bg-orange-50 p-6 flex flex-col h-full border-l-4 border-orange-200 overflow-y-auto">
              <div className="bg-white p-4 rounded-3xl border-2 border-orange-200 mb-4 shadow-sm">
                <p className="text-[11px] font-bold text-orange-800 uppercase mb-2 italic">Petunjuk Observasi:</p>
                <ul className="text-[11px] text-orange-700 list-disc ml-5 space-y-1">
                  {LEVEL_1_GAMES[activeGameIndex].hints.map((h, idx) => <li key={idx}>{h}</li>)}
                </ul>
              </div>

              <textarea 
                value={description} 
                onChange={(e) => { setDescription(e.target.value); setIsSubmitted(false); }} 
                disabled={isSubmitted} 
                placeholder="Ceritakan apa yang kamu lihat di gambar puzzle tersebut..." 
                className="w-full flex-grow p-5 border-3 border-orange-200 rounded-[2rem] mb-4 text-sm outline-none bg-white focus:border-orange-400 transition-all resize-none shadow-inner leading-relaxed" 
              />

              {isSubmitted && rewardData ? (
                <div className={`mb-4 p-5 rounded-[2rem] border-4 ${rewardData.color} shadow-xl animate-in slide-in-from-bottom duration-500`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{rewardData.icon}</span>
                    <div className="text-left">
                      <div className="text-xl font-black">{rewardData.title}</div>
                      <div className="text-[10px] bg-white/60 px-3 py-0.5 rounded-full font-bold mt-1 inline-block uppercase">{rewardData.badge}</div>
                    </div>
                    <div className="ml-auto text-3xl font-black">{score}%</div>
                  </div>
                  
                  <p className="text-xs font-medium mb-4 italic text-center">"{rewardData.msg}"</p>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => startGame(activeGameIndex)} className="bg-blue-500 text-white py-3 rounded-2xl font-bold text-xs shadow-md">🔄 Ulangi</button>
                    <button onClick={() => activeGameIndex < LEVEL_1_GAMES.length - 1 ? startGame(activeGameIndex + 1) : setCurrentView("selection")} className="bg-orange-600 text-white py-3 rounded-2xl font-bold text-xs shadow-md">Lanjut ➡</button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={checkAnswer} 
                  className={`w-full py-5 rounded-[2rem] font-black text-white text-lg shadow-xl transition-all active:scale-95 mb-2 ${description.length > 5 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  KIRIM JAWABAN 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}