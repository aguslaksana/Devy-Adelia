"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { Fredoka, Salsa } from "next/font/google";

const fredoka = Fredoka({ weight: ["400", "700"], subsets: ["latin"] });
const salsa = Salsa({ weight: ["400"], subsets: ["latin"] });

type Keyword = { words: string[]; label: string; };
type GameData = { id: number; title: string; src: string; keywords: Keyword[]; hints: string[]; };

const LEVEL_3_GAMES: GameData[] = [
  {
    id: 0,
    title: "Tantangan 1",
    src: "https://jigex.com/3xyUL",
    keywords: [
      { label: "Identitas & Wilayah", words: ["Suku Dayak", "Kalimantan", "etnis", "tradisional", "warisan budaya", "identitas bangsa", "kekayaan nusantara", "pesona Borneo", "nafas borneo", "detak jantung kalimantan", "jejak leluhur", "akar budaya", "khazanah budaya", "pusaka borneo", "autentik"] },
      { label: "Pakaian Adat", words: ["pakaian adat", "baju", "warna hitam", "kain beludru", "rompi hitam", "rok panjang", "King Baba", "King Bibinge", "busana etnik", "busana seremonial", "gaya tradisional", "jubah adat", "beludru hitam pekat", "sarung hitam", "kain tenun doyo", "serat kulit kayu", "busana kehormatan", "busana pesta adat", "busana pengantin dayak"] },
      { label: "Detail & Ornamen", words: ["manik-manik", "motif khas", "burung enggang", "hiasan kepala", "bulu burung", "hiasan perak", "warna merah menyala", "kuning emas", "putih kontras", "pola geometris", "detail rumit", "aksesoris manik", "kalung taring", "gelang perak", "bordir tangan", "tekstur kain", "ornamen", "serat alam", "topi berhias", "perhiasan logam", "motif akar", "flora fauna", "kancing kuningan", "corak naga", "lilitan kain", "ikat kepala rotan", "aksen perak", "hiasan manik payet", "pola rumit", "benang emas", "manik tulang", "ragam hias", "detail manik", "mahkota burung", "gemerincing logam", "motif aso", "motif kalung", "motif pohon hayat", "sulam manik", "kepingan perak", "koin antik", "perhiasan dada", "hiasan telinga panjang", "anting logam", "gelang kaki", "lilitan manik pinggang", "pewarna alami", "hiasan bulu ruai", "bulu enggang putih hitam", "spiral", "kurva", "garis tegas", "kilau manik kaca", "manik keramik", "manik batu", "seni kriya", "anyaman rotan halus"] },
      { label: "Senjata & Atribut Perang", words: ["tameng", "talawang", "mandau", "simbol kekuatan", "atribut perang", "perisai kayu", "ukiran khas", "perisai pelindung", "mandau tajam berukir", "sarung kayu mandau"] },
      { label: "Kegiatan & Suasana", words: ["upacara adat", "sakral", "keindahan", "kearifan lokal", "pesona", "tarian adat", "nilai sejarah", "kebanggaan", "penari Dayak", "ukiran kayu", "megah", "mistis", "estetika", "keagungan", "warisan leluhur", "nuansa magis", "pesona budaya", "ekspresi seni", "estetika visual", "ritual", "wibawa", "tetua adat", "panglima burung", "aura mistis", "magis", "eksotis", "tenun ikat", "keberanian", "kearifan hutan", "tari kancet papatai", "tari gong", "rias wajah tradisional", "tato motif bunga terong", "keanggunan etnik", "gerak gemulai", "filosofi hidup", "harmoni alam", "tradisi lisan", "pesta panen", "gawai dayak", "simbol perlindungan", "tolak bala", "keberuntungan", "kemakmuran", "keperkasaan", "kelembutan", "sampek", "tarian perang", "keagungan borneo", "mahakarya", "gagah berani", "anggun menawan"] }
    ],
    hints: [
      "Sebutkan nama kelompok masyarakat adat dalam gambar dan pulau asalnya.",
      "Amati warna dominan pakaian mereka dan jelaskan detail hiasan kecil yang berkilau di kainnya.",
      "Gambarkan atribut pelindung dan senjata tajam berukir yang mereka bawa.",
      "Jelaskan suasana sakral dari kegiatan yang sedang mereka lakukan."
    ]
  },
  {
    id: 1,
    title: "Tantangan 2",
    src: "https://jigex.com/WuN8v",
    keywords: [
      { label: "Identitas", words: ["Tarian Kuda Lumping", "kuda kepang", "jathilan", "budaya Jawa", "jawa", "kuda", "kesenian rakyat", "warisan leluhur", "identitas lokal", "cikal bakal", "kekayaan nusantara", "bumi jawa", "pesona budaya Indonesia", "kebudayaan"] },
      { label: "Properti & Kostum", words: ["anyaman bambu", "kuda tiruan", "cat warna-warni", "merah", "putih", "kuning", "hitam", "rumbai-rumbai", "pecut", "cambuk", "cemeti", "anyaman rotan", "rambut palsu", "ekor kuda", "hiasan telinga", "lonceng kaki", "kostum prajurit", "celana panji", "rompi berhias", "manik-manik", "payet berkilau", "udeng", "ikat kepala", "kacamata hitam", "kumis tebal"] },
      { label: "Musik & Gerak", words: ["gerak lincah", "dinamis", "ritme cepat", "irama gamelan", "kendang", "saron", "gong", "angklung", "terompet", "gerakan patah-patah", "tarian kolosal", "langkah mantap", "lompatan tinggi", "bunyi gemerincing"] },
      { label: "Suasana & Mistis", words: ["suasana mistis", "kemenyan", "dupa", "aroma mawar", "sesaji", "bunga tujuh rupa", "trance", "kesurupan", "roh halus", "kekuatan magis", "atraksi berbahaya", "makan beling", "kupas kelapa dengan gigi", "bara api", "kekebalan tubuh", "pawang", "penawar roh", "mantra", "doa", "harmoni mistis", "mistis"] },
      { label: "Kesan & Nilai", words: ["semangat perjuangan", "prajurit berkuda", "keberanian", "patriotisme", "tari panggung", "interaksi penonton", "takjub", "memukau", "mempesona", "seru", "terpukau", "menarik", "bagus", "menawan"] }
    ],
    hints: [
      "Identifikasi nama pertunjukan rakyat ini dan asal daerahnya di pulau berpenduduk padat.",
      "Gambarkan benda tiruan dari anyaman yang ditunggangi oleh para pemain.",
      "Sebutkan alat pukul panjang yang digunakan untuk menghasilkan suara menggelegar.",
      "Ceritakan suasana luar biasa dan atraksi berbahaya yang ditunjukkan."
    ]
  },
  {
    id: 2,
    title: "Tantangan 3",
    src: "https://jigex.com/bPT2x",
    keywords: [
      { label: "Objek", words: ["rumah", "Rumah Tongkonan", "Toraja", "Sulawesi"] },
      { label: "Bentuk Atap", words: ["tinggi", "atap", "melengkung", "perahu"] },
      { label: "Bahan Bangunan", words: ["kayu", "papan"] },
      { label: "Jenis", words: ["adat", "tradisional"] }
    ],
    hints: [
      "Jelaskan jenis bangunan apa yang menjadi pusat perhatian dalam gambar tersebut.",
      "Gambarkan keunikan bentuk bagian atas bangunan yang melengkung ke arah langit.",
      "Amati bahan utama pembuatan bangunan tersebut serta hiasan tanduk yang menempel.",
      "Jelaskan mengapa bangunan ini menjadi simbol identitas wilayah asalnya."
    ]
  },
  {
    id: 3,
    title: "Tantangan 4",
    src: "https://jigex.com/XqWWt",
    keywords: [
      { label: "Identitas & Daerah", words: ["Tari Tortor", "suku Batak", "Sumatera Utara", "Tapanuli", "identitas Batak", "tanah batak", "bona pasogit", "batak toba", "khas", "budaya"] },
      { label: "Busana", words: ["kain ulos", "ulos sadum", "ulos ragi hotang", "tenun tangan", "benang merah", "benang hitam", "benang putih", "motif ragi ni huta", "rumbai ulos", "ikat kepala", "sortali", "hiasan kepala emas", "busana adat", "perhiasan emas", "kalung motif", "gelang perak", "tekstur kain tenun", "anyaman mengembang", "baju"] },
      { label: "Gerakan", words: ["manortor", "gerakan tangan", "telapak tangan terbuka", "gerakan bahu", "hentakan kaki", "ritme teratur", "gerakan tenang", "gerak simetris", "posisi tegak", "tatapan lurus", "gerak ritmis", "berbaris", "rapi", "gerakan"] },
      { label: "Musik & Alat", words: ["gondang sabangunan", "ogung", "sarune bolon", "taganing", "hesek", "suara perkusi", "irama", "musik", "lagu", "gamelan"] },
      { label: "Nilai & Acara", words: ["sakral", "upacara adat", "pesta horja", "perkawinan adat", "upacara kematian", "penyambutan tamu", "ungapan syukur", "kearifan lokal", "leluhur", "dalihan na tolu", "rasa hormat", "wibawa", "nuansa magis", "kebersamaan", "pesona danau toba", "indah", "memukau", "tampil"] }
    ],
    hints: [
      "Sebutkan nama tarian sakral ini dan wilayah asalnya di bagian utara pulau besar.",
      "Jelaskan atribut kain tenun khas yang disampirkan di bahu para penari.",
      "Gambarkan posisi telapak tangan dan gerakan hentakan kaki yang dilakukan secara serempak.",
      "Sebutkan kumpulan alat musik perkusi yang mengiringi gerakan mereka."
    ]
  },
  {
    id: 4,
    title: "Tantangan 5",
    src: "https://jigex.com/5JBk7",
    keywords: [
      { label: "Identitas", words: ["Gamelan", "ansambel musik", "tradisional", "Jawa", "Bali", "Sunda", "identitas nusantara", "warisan budaya", "UNESCO", "mahakarya"] },
      { label: "Instrumen", words: ["kendang", "saron", "bonang", "gong ageng", "kempul", "kenong", "slenthem", "gambang", "rebab", "suling", "instrumen perkusi", "bilah logam", "penclon", "alat musik"] },
      { label: "Bahan & Estetika", words: ["perunggu", "kuningan", "kayu ukir", "cat merah emas", "detail ukiran naga", "motif bunga", "prada emas", "kriya logam", "pemukul kayu", "karet"] },
      { label: "Nada & Suara", words: ["pelog", "slendro", "laras", "suara berdengung", "resonansi metallic", "irama ritmis", "tempo cepat", "tempo lambat", "nada diatonis", "tangga nada pentatur", "suara nyaring", "dentuman bas"] },
      { label: "Nuansa & Acara", words: ["mistis", "magis", "hipnotis", "harmoni", "simfoni tradisional", "pagelaran wayang", "upacara adat", "keraton", "sakral", "tenang", "meditatif", "dinamis", "gotong royong", "filosofi kehidupan"] }
    ],
    hints: [
      "Sebutkan nama seperangkat alat musik tradisional ini secara umum.",
      "Jelaskan bahan logam dan kayu yang digunakan untuk membuat alat-alat tersebut.",
      "Gambarkan bunyi resonansi yang dihasilkan serta suasana tenang yang tercipta.",
      "Sebutkan kegiatan tradisional apa yang biasanya diiringi oleh alunan suara ini."
    ]
  }
];

export default function PermainanPageLevel3() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState<"selection" | "game">("selection");
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [rewardData, setRewardData] = useState<{ icon: string, title: string, badge: string, msg: string, color: string } | null>(null);
  const [savedScores, setSavedScores] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(360);

  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    const scores = JSON.parse(localStorage.getItem("level3_all_scores") || "{}");
    setSavedScores(scores);
  }, []);

  useEffect(() => {
    if (currentView !== "game" || timeLeft <= 0 || isSubmitted) return;
    const timer = setInterval(() => { setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1)); }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentView, isSubmitted]);

  // Hitung Total Skor Kumulatif Level 3
  const totalLevelScore = Object.values(savedScores).reduce((acc, curr) => acc + curr, 0);
  const challengesCompleted = Object.keys(savedScores).filter(key => savedScores[Number(key)] >= 100).length;

  const wordsFoundCount = useMemo(() => {
    const input = description.toLowerCase();
    if (!input) return 0;
    const allPossibleWords = LEVEL_3_GAMES[activeGameIndex].keywords.flatMap(k => k.words);
    const matches = allPossibleWords.filter(word => input.includes(word.toLowerCase()));
    return new Set(matches).size;
  }, [description, activeGameIndex]);

  const startGame = (index: number) => {
    setActiveGameIndex(index);
    setCurrentView("game");
    setDescription("");
    setScore(0);
    setIsSubmitted(false);
    setTimeLeft(360);
    setRewardData(null);
  };

  const checkAnswer = () => {
    const input = description.trim().toLowerCase();
    if (input.length < 5 && timeLeft > 0) return alert("Tuliskan deskripsi yang lebih jelas!");

    const finalScore = Math.min(Math.round((wordsFoundCount / 5) * 100), 100);
    
    setScore(finalScore);
    setIsSubmitted(true);
    
    const prevBest = savedScores[activeGameIndex] || 0;
    let newScores = { ...savedScores };
    
    if (finalScore > prevBest) {
      newScores = { ...savedScores, [activeGameIndex]: finalScore };
      setSavedScores(newScores);
      localStorage.setItem("level3_all_scores", JSON.stringify(newScores));
    }

    const isAllDone = LEVEL_3_GAMES.every((_, i) => (newScores[i] || 0) >= 100);
    if (isAllDone) {
      localStorage.setItem("highestLevelCompleted", "3");
    }

    if (finalScore >= 100) {
      setRewardData({ 
        icon: "🏆", title: "LULUS SEMPURNA!", badge: "AHLI BUDAYA", 
        msg: isAllDone && activeGameIndex === LEVEL_3_GAMES.length - 1 
            ? "LUAR BIASA! Kamu telah menuntaskan seluruh tantangan Level 3."
            : `Hebat! Kamu berhasil menemukan ${wordsFoundCount} kata kunci budaya.`, 
        color: "bg-yellow-50 border-yellow-400 text-yellow-700" 
      });
    } else {
      setRewardData({ icon: "💡", title: "COBA LAGI", badge: "PEMBELAJAR", msg: `Baru ${wordsFoundCount} kata kunci ditemukan. Kamu butuh 5 kata kunci untuk skor 100!`, color: "bg-emerald-50 border-emerald-400 text-emerald-700" });
    }
  };

  if (!mounted) return null;

  return (
    <div className={`relative w-full bg-[#F0FDF4] ${fredoka.className} min-h-screen pt-20 pb-10`}>
      
      {showInstructions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-[6px] border-emerald-600 animate-in zoom-in duration-300">
            <div className="p-5 bg-emerald-600 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <h2 className="text-xl font-bold uppercase tracking-wider">Petunjuk Permainan Level 3</h2>
              </div>
              <button onClick={() => setShowInstructions(false)} className="bg-white/20 hover:bg-white/40 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all">✕</button>
            </div>
            <div className="flex-1 bg-gray-100">
              <iframe
                src="https://drive.google.com/file/d/12-6hjJFQohQ_z7qO1P1kgn_eFMpNYKfu/preview"
                className="w-full h-full border-none"
                title="Petunjuk Level 3"
              />
            </div>
            <div className="p-5 bg-emerald-50 flex justify-center border-t-2 border-emerald-100">
              <button onClick={() => setShowInstructions(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-3 rounded-full font-black text-lg shadow-lg hover:scale-105 transition-all">SAYA SIAP BERANALISIS! ✅</button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowInstructions(true)} className="fixed bottom-6 right-6 z-[90] bg-emerald-500 hover:bg-emerald-600 text-white w-16 h-16 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-white transition-all hover:scale-110 active:scale-95 group">
        <span className="text-2xl group-hover:animate-bounce">📖</span>
        <span className="text-[9px] font-bold uppercase">Petunjuk</span>
      </button>

      {currentView === "selection" && (
        <div className="container mx-auto px-4 flex flex-col items-center animate-in fade-in duration-500">
          <button onClick={() => router.push("/bahan-belajar/permainan/")} className="md:absolute top-8 left-8 bg-white text-emerald-600 px-6 py-2 rounded-full font-bold shadow-md border-2 border-emerald-500 active:scale-95 transition-all">⬅ Menu Utama</button>
          
          <h1 className={`text-4xl md:text-5xl text-emerald-700 font-bold mb-2 ${salsa.className}`}>LEVEL 3</h1>
          
          {/* PAPAN SKOR LEVEL 3 */}
          <div className="bg-white border-[3px] border-emerald-400 rounded-[2.5rem] px-10 py-5 mb-8 shadow-xl flex flex-col items-center gap-1 min-w-[320px] animate-in slide-in-from-top duration-700">
            <span className="text-emerald-600 font-black uppercase tracking-widest text-xs">Pencapaian Level 3</span>
            <div className="flex items-end gap-1">
              <span className="text-5xl font-black text-gray-800 leading-none">{totalLevelScore}</span>
              <span className="text-xl font-bold text-gray-400 mb-1">/ 500</span>
            </div>
            <p className="text-[11px] text-emerald-800 font-bold italic mt-1 bg-emerald-50 px-4 py-1 rounded-full">
              {challengesCompleted === 5 ? "🎉 Sempurna! Kamu telah menguasai Level 3" : `Kamu telah menyelesaikan ${challengesCompleted} dari 5 tantangan`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {LEVEL_3_GAMES.map((game, i) => {
              const sVal = savedScores[i] || 0;
              return (
                <button key={i} onClick={() => startGame(i)} className={`group relative bg-white border-4 rounded-[2rem] p-8 shadow-xl transition-all hover:-translate-y-2 ${sVal >= 100 ? 'border-yellow-400' : 'border-emerald-300'}`}>
                  {sVal >= 100 && (
                    <div className="absolute -top-4 -left-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg font-bold border-4 border-yellow-500 text-xl animate-bounce">🏆</div>
                  )}
                  <h3 className={`text-2xl font-bold text-gray-800 mb-1 ${salsa.className}`}>{game.title}</h3>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mt-4 mb-2">
                    <div className="bg-emerald-400 h-full transition-all duration-1000" style={{ width: `${sVal}%` }}></div>
                  </div>
                  <div className="text-right text-sm font-black text-emerald-600">Skor: {sVal}%</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {currentView === "game" && (
        <div className="flex flex-col h-[90vh] container mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] border-emerald-500 animate-in zoom-in duration-300 relative">
          <div className="bg-emerald-500 p-4 flex justify-between items-center text-white border-b-4 border-emerald-600">
            <button onClick={() => setCurrentView("selection")} className="bg-white text-emerald-600 px-5 py-1.5 rounded-full font-bold text-sm shadow-md">⬅ Kembali</button>
            <div className={`font-mono text-2xl font-bold bg-emerald-700 px-4 py-1 rounded-2xl`}>
              ⏰ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className={`px-6 py-1.5 rounded-full font-black border border-white/30 transition-all ${wordsFoundCount >= 5 ? 'bg-yellow-500' : 'bg-white/20'}`}>
              TERDETEKSI: {wordsFoundCount}/5 KATA
            </div>
          </div>

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            <div className="w-full md:w-3/5 lg:w-2/3 bg-gray-200 relative">
              <iframe src={LEVEL_3_GAMES[activeGameIndex].src} className="w-full h-full border-none" title="Puzzle Content" />
            </div>

            <div className="w-full md:w-2/5 lg:w-1/3 bg-emerald-50 p-6 flex flex-col h-full border-l-4 border-emerald-200 overflow-y-auto">
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 mb-4 shadow-sm">
                <p className="text-[11px] font-bold text-emerald-800 uppercase mb-2 italic">Petunjuk Analisis:</p>
                <ul className="text-[11px] text-emerald-700 list-disc ml-5 space-y-1">
                  {LEVEL_3_GAMES[activeGameIndex].hints.map((h, idx) => <li key={idx}>{h}</li>)}
                </ul>
              </div>

              <textarea 
                value={description} 
                onChange={(e) => { setDescription(e.target.value); setIsSubmitted(false); }} 
                disabled={isSubmitted} 
                placeholder="Gunakan minimal 5 kata kunci budaya untuk mendapatkan skor 100!..." 
                className="w-full flex-grow p-5 border-3 border-emerald-200 rounded-[2rem] mb-4 text-sm outline-none bg-white focus:border-emerald-400 transition-all resize-none shadow-inner leading-relaxed" 
              />

              {isSubmitted && rewardData ? (
                <div className={`mb-4 p-5 rounded-[2rem] border-4 ${rewardData.color} shadow-xl animate-in slide-in-from-bottom duration-500`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{rewardData.icon}</span>
                    <div className="text-left">
                      <div className="text-xl font-black">{rewardData.title}</div>
                      <div className="text-[10px] bg-white/60 px-3 py-0.5 rounded-full font-bold mt-1 inline-block uppercase tracking-wider">{rewardData.badge}</div>
                    </div>
                    <div className="ml-auto text-3xl font-black">{score}%</div>
                  </div>
                  <p className="text-xs font-medium mb-4 italic text-center text-gray-700">"{rewardData.msg}"</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => startGame(activeGameIndex)} className="bg-emerald-500 text-white py-3 rounded-2xl font-bold text-xs shadow-md">🔄 Ulangi</button>
                    <button onClick={() => activeGameIndex < LEVEL_3_GAMES.length - 1 ? startGame(activeGameIndex + 1) : router.push("/bahan-belajar/permainan/finish/")} className="bg-emerald-700 text-white py-3 rounded-2xl font-bold text-xs shadow-md">Lanjut ➡</button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={checkAnswer} 
                  className={`w-full py-5 rounded-[2rem] font-black text-white text-lg shadow-xl transition-all active:scale-95 mb-2 ${description.length > 3 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  KIRIM ANALISIS 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}