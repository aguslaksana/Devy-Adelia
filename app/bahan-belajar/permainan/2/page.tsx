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
    allKeywords: [
      "Tari Piring", "tarian tradisional Minangkabau", "tarian khas Sumatera Barat", "budaya Minang", "seni tradisional", "warisan budaya Indonesia", "pertunjukan tari daerah", "tarian rakyat", "penari pria dan wanita", "gerakan cepat", "gerakan lincah", "gerakan dinamis", "gerakan serempak", "gerakan berputar", "gerakan mengayun tangan", "piring di kedua tangan", "piring kecil", "piring putih", "piring berhias", "piring berkilau", "bunyi piring beradu", "suara gemerincing", "teknik menari piring", "keseimbangan tangan", "ketangkasan penari", "kelincahan penari", "keterampilan tinggi", "busana adat Minangkabau", "pakaian tradisional", "baju kurung", "songket Minang", "kain songket", "warna cerah", "warna emas", "warna merah", "warna hitam", "hiasan kepala", "suntiang kecil", "ikat kepala", "selendang", "tampilan anggun", "tampilan menarik", "tampilan memukau", "iringan musik tradisional Minang", "talempong", "gendang", "saluang", "irama cepat", "irama bersemangat", "tempo menghentak", "pertunjukan di panggung", "pertunjukan di acara adat", "acara perayaan", "pesta rakyat", "penyambutan tamu", "pertunjukan budaya", "disaksikan banyak penonton", "penonton terpukau", "suasana ramai", "suasana meriah", "suasana semarak", "suasana penuh energi", "suasana ceria", "suasana bersemangat", "suasana hidup", "suasana tradisional", "nuansa Minangkabau", "pertunjukan unik", "pertunjukan menarik", "pertunjukan menghibur", "nilai budaya", "nilai kebersamaan", "kerja sama penari", "kekompakan gerak", "simbol rasa syukur", "ungkapan kegembiraan", "kebanggaan daerah", "identitas budaya Sumatera Barat", "mudah dikenali", "mencerminkan keindahan seni tradisi", "piring", "membawa piring", "topi kerucut", "senang", "gembira", "bersorak", "baju warna warni", "merah", "kuning", "menari", "khas", "memukau", "menempel", "tangan", "kompak", "bersama-sama", "orang", "memainkan", "tari"
    ],
    hints: [
      "Sebutkan nama tarian ini dan dari wilayah mana asalnya", 
      "Jelaskan benda yang dibawa oleh penari di kedua telapak tangannya", 
      "Gambarkan bagaimana kecepatan gerakan dan irama musik pengiringnya"
    ]
  },
  {
    id: 1,
    title: "TANTANGAN 2",
    src: "https://jigex.com/jMFN6",
    allKeywords: [
        "Rumah Tongkonan", "rumah", "bangunan", "besar", "kayu", "ukiran", "unik", "bagus", "tinggi", "atap", "melengkung", "kerbau", "rumah adat Toraja", "rumah adat Sulawesi Selatan", "budaya Toraja", "arsitektur tradisional", "warisan budaya Indonesia", "bangunan tradisional", "rumah panggung", "bangunan bertiang", "bangunan simetris", "bentuk memanjang", "bentuk persegi panjang", "struktur kokoh", "struktur kuat", "atap melengkung ke atas", "atap menyerupai perahu", "atap melengkung seperti tanduk", "atap tinggi", "atap besar", "atap bertingkat", "ujung atap runcing", "rangka atap kayu", "bahan kayu pilihan", "kayu keras", "kayu tahan weather", "dinding papan kayu", "sambungan kayu tradisional", "lantai panggung tinggi", "kolong rumah terbuka", "kolong rumah untuk menyimpan barang", "tangga kayu di bagian depan", "pintu kecil", "jendela kecil", "bukaan terbatas", "ukiran khas Toraja", "ukiran timbul", "motif geometris", "motif alam", "motif simbolik", "warna merah", "hitam", "kuning", "putih", "pola ukiran rapi", "hiasan dinding", "deretan tanduk kerbau di bagian depan", "tanduk kerbau tersusun vertikal", "simbol status sosial", "simbol kehormatan keluarga", "orientasi rumah menghadap utara", "deretan tongkonan saling berhadapan", "susunan bangunan teratur", "halaman adat di tengah", "lingkungan perkampungan adat", "menyatu dengan alam sekitar", "latar pegunungan", "udara sejuk", "cahaya matahari menyinari atap", "bayangan bangunan di tanah", "suasana tenang", "suasana sakral", "suasana tradisional", "suasana khidmat", "nuansa adat Toraja", "tempat berkumpul keluarga", "pusat kegiatan adat", "tempat musyawarah", "tempat pelaksanaan upacara adat", "identitas masyarakat Toraja", "kebanggaan daerah", "mudah dikenali", "mencerminkan kekayaan arsitektur tradisional Sulawesi Selatan", "rumah adat", "khas", "ciri khas", "besar", "tinggi", "terbuat", "kayu", "coklat", "hitam", "warga", "desa", "orang", "atap"
    ],
    hints: [
      "Apa nama bangunan tradisional ini dan suku mana yang membangunnya?", 
      "Perhatikan bentuk atapnya yang melengkung, menyerupai apa bentuk tersebut?", 
      "Sebutkan hiasan dari hewan ternak yang tersusun di bagian depan rumah sebagai simbol kehormatan"
    ]
  },
  {
    id: 2,
    title: "TANTANGAN 3",
    src: "https://jigex.com/6yVue",
    allKeywords: [
        "Pempek Palembang","pempek", "palembang", "makanan", "lezat", "digemari", "enak", "coklat", "toping", "makanan daerah",  "makanan khas Palembang", "kuliner khas Sumatera Selatan", "masakan tradisional", "warisan kuliner Indonesia", "hidangan khas daerah", "berbahan dasar ikan", "ikan tenggiri", "ikan gabus", "daging ikan halus", "tepung sagu", "adonan kenyal", "adonan lembut", "adonan elastis", "dibentuk lonjong", "dibentuk bulat", "dibentuk panjang", "bentuk kapal selam", "pempek kapal selam", "pempek lenjer", "pempek adaan", "pempek kulit", "pempek kecil", "pempek besar", "warna putih keabu-abuan", "tekstur kenyal", "tekstur lembut", "digoreng", "direbus", "digoreng hingga kecokelatan", "aroma ikan", "aroma gurih", "rasa gurih", "rasa lezat", "rasa khas Palembang", "cita rasa tradisional", "disajikan dengan kuah cuko", "cuko hitam", "kuah cuko kental", "kuah cuko asam", "kuah cuko pedas", "kuah cuko manis", "gula aren", "cabai", "bawang putih", "asam jawa", "kuah menyegarkan", "disajikan hangat", "disajikan di piring", "dipotong kecil", "ditata rapi", "pelengkap makan", "mi kuning", "irisan timun", "taburan ebi", "saus cuko melimpah", "makanan populer", "makanan legendaris", "banyak digemari", "mudah ditemukan", "dijual di warung pempek", "dijual di rumah makan", "dijadikan oleh-oleh", "cocok untuk camilan", "cocok untuk makan siang", "cocok untuk makan malam", "suasana santai", "suasana hangat", "suasana sederhana", "suasana khas Palembang", "menggugah selera", "mengenyangkan", "mudah dikenali", "mencerminkan identitas kuliner Palembang", "telur", "tepung", "kenyal", "kuah", "ikan", "berwarna coklat", "enak", "ciri khas", "khas", "enak", "lezat", "kuah", "berkuah", "rasanya", "nikmat", "piring", "keluarga"
    ],
    hints: [
      "Sebutkan nama hidangan ini dan asal kotanya", 
      "Terbuat dari bahan dasar apa adonannya dan bagaimana tekstur saat dimakan?", 
      "Jelaskan tentang cairan pendamping berwarna gelap yang memiliki rasa asam, pedas, dan manis"
    ]
  },
  {
    id: 3,
    title: "TANTANGAN 4",
    src: "https://jigex.com/ZKcte",
    allKeywords: [
        "Jakarta", "ondel-ondel",  "ibu kota Indonesia", "DKI Jakarta", "kota metropolitan", "kota besar", "kota indah", "pusat pemerintahan", "pusat ekonomi", "pusat bisnis", "kota modern", "kota berkembang", "gedung pencakar langit", "gedung tinggi", "perkantoran modern", "pusat perbelanjaan", "jalan raya lebar", "jalan raya ramai", "lalu lintas padat", "kendaraan bermotor", "bemo", "angkutan kota", "bus TransJakarta", "kereta commuter line", "aktivitas masyarakat", "suasana kota sibuk", "suasana ramai", "suasana dinamis", "suasana perkotaan", "Monumen Nasional", "Monas", "tugu tinggi menjulang", "simbol Jakarta", "simbol kebanggaan nasional", "lapangan Monas luas", "taman kota", "ruang terbuka hijau", "pemandangan indah", "kota tertata", "Bundaran HI", "Tugu Selamat Datang", "air mancur", "kawasan ikonik", "Kota Tua Jakarta", "bangunan bersejarah", "gedung kolonial", "museum", "suasana klasik", "suasana bersejarah", "budaya Betawi", "suku Betawi", "kesenian Betawi", "ondel-ondel", "boneka raksasa", "tari jaipong", "tarian daerah", "gerakan lincah", "iringan musik tradisional", "pertunjukan seni", "pakaian adat Betawi", "baju sadariah", "kebaya encim", "rumah adat Betawi", "rumah kebaya", "rumah panggung", "bentuk atap lipat", "teras luas", "jendela besar", "halaman depan", "makanan khas Jakarta", "kuliner Betawi", "kerak telor", "soto Betawi", "nasi uduk", "roti buaya", "jajanan tradisional", "pedagang kaki lima", "pasar tradisional", "pusat kuliner", "suasana hangat", "suasana akrab", "suasana meriah", "masyarakat beragam", "suku beragam", "budaya beragam", "kota multikultural", "kota penuh warna", "keindahan kota", "keindahan budaya", "identitas Jakarta", "mudah dikenali", "mencerminkan kehidupan kota besar Indonesia", "tari", "tarian", "jaipong", "yaipong", "bemo", "macet", "khas", "kota", "prtunjukan", "besar", "ramai"
    ],
    hints: [
      "Sebutkan nama wilayah pusat pemerintahan ini dan simbol bangunan yang menjulang tinggi di tengahnya", 
      "Perhatikan kesenian berupa boneka raksasa atau transportasi umum yang sering terlihat di sana", 
      "Sebutkan kuliner khas yang sering dijajakan oleh pedagang kaki lima di kota metropolitan ini"
    ]
  },
  {
    id: 4,
    title: "TANTANGAN 5",
    src: "https://jigex.com/yfABx",
    allKeywords: [
        "Papua","papeda", "tepung", "Papua Barat", "orang", "pakaian", "atap", "rumput", "unik", "khas",  "tanah Papua", "wilayah timur Indonesia", "budaya Papua", "budaya Papua Barat", "suku-suku Papua", "masyarakat adat Papua", "warisan budaya Indonesia", "keanekaragaman budaya", "kehidupan tradisional", "alam Papua", "alam Papua Barat", "pegunungan", "hutan lebat", "lembah hijau", "pantai indah", "laut biru", "pemandangan alam menakjubkan", "suasana alami", "suasana sejuk", "suasana tenang", "suasana damai", "rumah honai", "rumah adat Papua", "bangunan tradisional", "rumah berbentuk bulat", "atap jerami tebal", "atap rendah", "dinding kayu", "bangunan sederhana", "bangunan kokoh", "hangat di dalam", "tahan dingin", "terletak di dataran tinggi", "lingkungan perkampungan adat", "kehidupan masyarakat", "aktivitas sehari-hari", "makanan khas Papua", "papeda", "makanan tradisional", "bubur sagu", "sagu asli Papua", "tekstur lengket", "tekstur kenyal", "warna putih bening", "rasa tawar", "disajikan hangat", "disajikan bersama ikan kuah kuning", "kuah rempah", "cita rasa khas", "kuliner tradisional", "tari Sajojo", "tarian tradisional Papua", "tarian pergaulan", "gerakan lincah", "gerakan ceria", "gerakan dinamis", "gerakan berulang", "iringan musik tradisional", "tifa", "lagu daerah", "suasana gembira", "suasana meriah", "suasana kebersamaan", "suasana penuh semangat", "pakaian adat Papua", "busana tradisional", "hiasan kepala bulu burung", "kalung", "gelang", "rok rumbai", "warna alami", "warna cerah", "pertunjukan budaya", "upacara adat", "festival budaya", "nilai kebersamaan", "nilai gotong royong", "nilai tradisi", "identitas Papua", "identitas Papua Barat", "kebanggaan masyarakat", "mudah dikenali", "mencerminkan kekayaan budaya Papua dan Papua Barat", "rumah", "tari", "berkulit", "gelap", "tradisi", "orang"
    ],
    hints: [
      "Wilayah manakah yang memiliki rumah adat berbentuk bulat dengan atap rendah dari jerami?", 
      "Sebutkan makanan pokok tradisional dari wilayah timur ini yang memiliki tekstur lengket", 
      "Sebutkan tarian pergaulan atau alat musik pukul yang sering dimainkan dalam upacara adat mereka"
    ]
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
    icon: string, title: string, badge: string, msg: string, color: string, textColor: string, tips?: string[] 
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    const localData = localStorage.getItem("level2_all_scores");
    if (localData) {
      const parsedScores = JSON.parse(localData);
      setSavedScores(parsedScores);
      setTimeout(() => setAnimatedScores(parsedScores), 500);

      // Cek apakah semua tantangan sudah 100
      const completed = LEVEL_2_GAMES.every((_, i) => parsedScores[i] >= 100);
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
    const matches = LEVEL_2_GAMES[activeGameIndex].allKeywords.filter(word => 
      input.includes(word.toLowerCase())
    );
    return Array.from(new Set(matches));
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

    let finalScore = 0;
    if (count >= 3) {
      finalScore = 100;
    } else {
      finalScore = Math.round((count / 3) * 100);
    }

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

    // LOGIKA PEMBUKA LEVEL 3
    const isAllDone = LEVEL_2_GAMES.every((_, i) => newScores[i] >= 100);
    if (isAllDone) {
      localStorage.setItem("level_3_unlocked", "true");
      setIsLevelFinished(true);
    }

    if (finalScore === 100) {
        setRewardData({
          icon: "🏆", title: "FANTASTIS!", badge: "DETEKTIF AHLI",
          msg: isAllDone ? "LUAR BIASA! Kamu telah menaklukkan semua tantangan Level 2. Level 3 kini terbuka!" : "Analisis yang luar biasa! Kamu berhasil menemukan poin penting.",
          color: "bg-yellow-400", textColor: "text-yellow-900"
        });
      } else {
        setRewardData({
          icon: count > 0 ? "💡" : "🔎", 
          title: "AYO BERUSAHA!",
          badge: "PENGAMAT",
          msg: `Kamu menemukan ${count} poin penting. Butuh 3 poin untuk piala emas!`,
          color: "bg-blue-400", textColor: "text-blue-900",
          tips: ["Baca kembali petunjuk observasi."]
        });
      }
  };

  if (!mounted) return <div className="min-h-screen bg-[#E0F7FA]" />;

  return (
    <div className={`relative w-full bg-[#E0F7FA] ${fredoka.className} min-h-screen pt-20 pb-10 overflow-hidden`}>
      
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
              "Selesaikan semua tantangan dengan skor 100 untuk membuka Level 3!"
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mt-5">
            {LEVEL_2_GAMES.map((game, i) => {
              const realScore = savedScores[i] || 0;
              const displayScore = animatedScores[i] || 0;
              const isPerfect = realScore === 100;

              return (
                <button key={game.id} onClick={() => startGame(i)} className={`group relative bg-white border-4 rounded-[2.5rem] p-8 shadow-xl transition-all hover:-translate-y-2 hover:scale-105 active:scale-95 ${isPerfect ? 'border-yellow-400' : 'border-cyan-200'}`}>
                  
                  {isPerfect && (
                    <div className="absolute -top-7 -left-5 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-400 text-4xl animate-bounce z-10">
                      <span className="animate-pulse">🏆</span>
                    </div>
                  )}

                  <h3 className={`text-xl font-bold text-gray-800 mb-1 ${salsa.className}`}>TANTANGAN {i + 1}</h3>
                  <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden mb-2 mt-2 border border-gray-200 shadow-inner">
                    <div 
                        className={`h-full transition-all duration-[1500ms] ease-out ${isPerfect ? 'bg-yellow-400' : 'bg-blue-400'}`} 
                        style={{ width: `${displayScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-wider">Terbaik:</span>
                    <span className="text-sm font-black text-cyan-700">{realScore}%</span>
                  </div>
                </button>
              );
            })}
          </div>

          {isLevelFinished && (
            <button 
              onClick={() => router.push("/bahan-belajar/permainan/level-3")} 
              className="mt-12 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-black text-xl shadow-2xl animate-pulse transition-all"
            >
              MENUJU LEVEL 3 🚀
            </button>
          )}
        </div>
      ) : (
        /* GAME VIEW */
        <div className="flex flex-col h-[85vh] container mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[6px] border-cyan-600 relative">
          <div className={`p-4 flex justify-between items-center text-white transition-colors duration-500 ${count >= 3 ? 'bg-green-600' : 'bg-cyan-600'}`}>
            <button onClick={() => setCurrentView("selection")} className="bg-white text-cyan-600 px-5 py-1.5 rounded-full font-bold text-xs shadow-md">⬅ Kembali</button>
            <div className="font-mono text-2xl font-bold bg-black/20 px-4 py-1 rounded-2xl">
              ⏰ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className={`px-6 py-1.5 rounded-full font-black border-2 transition-all ${count >= 3 ? 'bg-white text-green-600 border-white animate-pulse' : 'bg-white/20 border-white/30'}`}>
              POIN: {count}/3
            </div>
          </div>

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden relative">
            <div className="w-full md:w-3/5 lg:w-2/3 bg-gray-200">
              <iframe src={LEVEL_2_GAMES[activeGameIndex].src} className="w-full h-full border-none" title="Game" />
            </div>

            <div className="w-full md:w-2/5 lg:w-1/3 bg-cyan-50 p-6 flex flex-col overflow-y-auto">
              <div className="bg-white p-4 rounded-3xl border-2 border-cyan-200 mb-4 shadow-sm">
                <p className="text-[11px] font-bold text-cyan-800 uppercase mb-2 italic">💡 Petunjuk Observasi:</p>
                <ul className="text-[11px] text-cyan-700 list-disc ml-5 space-y-1 font-medium leading-tight">
                  {LEVEL_2_GAMES[activeGameIndex].hints.map((h, idx) => <li key={idx}>{h}</li>)}
                </ul>
              </div>

              <textarea 
                value={description} 
                onChange={(e) => { setDescription(e.target.value); setIsSubmitted(false); }} 
                disabled={isSubmitted} 
                placeholder="Tuliskan laporan hasil pengamatanmu di sini..." 
                className={`w-full min-h-[150px] p-5 border-4 rounded-[2rem] mb-4 text-sm outline-none transition-all resize-none shadow-inner ${count >= 3 ? 'border-green-400 bg-green-50' : 'border-cyan-200 bg-white'}`} 
              />

              {showReward && rewardData ? (
                <div className={`p-5 rounded-[2rem] border-4 ${rewardData.color} shadow-xl animate-in slide-in-from-bottom duration-500 mb-4`}>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl animate-bounce">{rewardData.icon}</span>
                    <div>
                      <div className={`text-xl font-black ${rewardData.textColor}`}>{rewardData.title}</div>
                      <div className="text-[9px] bg-white/60 px-3 py-0.5 rounded-full font-bold mt-1 inline-block uppercase tracking-wider">{rewardData.badge}</div>
                    </div>
                  </div>
                  <p className="text-xs font-medium mb-4 italic text-center text-gray-700">{rewardData.msg}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => startGame(activeGameIndex)} className="bg-blue-500 text-white py-3 rounded-2xl font-bold text-xs shadow-md">🔄 Ulangi</button>
                    <button 
                      onClick={() => {
                        if (activeGameIndex < LEVEL_2_GAMES.length - 1) {
                          startGame(activeGameIndex + 1);
                        } else {
                          setCurrentView("selection");
                        }
                      }} 
                      className="bg-cyan-600 text-white py-3 rounded-2xl font-bold text-xs shadow-md"
                    >
                      {activeGameIndex < LEVEL_2_GAMES.length - 1 ? "Lanjut ➡" : "Selesai ✨"}
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={checkAnswer} 
                  disabled={description.length < 5}
                  className={`w-full py-5 rounded-[2rem] font-black text-white text-lg shadow-xl transition-all active:scale-95 mb-2 ${count >= 3 ? 'bg-green-600 hover:bg-green-700' : description.length >= 5 ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-400'}`}
                >
                  KIRIM HASIL 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}