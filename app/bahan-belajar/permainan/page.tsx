"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Komponen kecil untuk ikon gembok (SVG)
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
  </svg>
);

export default function ChooseGame() {
  // State untuk menyimpan level tertinggi yang sudah selesai
  const [highestLevelCompleted, setHighestLevelCompleted] = useState(0);
  // State untuk mengontrol tampilan modal petunjuk
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect untuk memuat progres dari localStorage
  useEffect(() => {
    const progress = localStorage.getItem('highestLevelCompleted');
    if (progress) {
      setHighestLevelCompleted(Number(progress));
    }
  }, []);

  // Tentukan status terkunci untuk setiap level
  const isLevel2Locked = highestLevelCompleted < 1;
  const isLevel3Locked = highestLevelCompleted < 2;

  // Kelas dasar untuk kartu level (Puzzle Style dengan efek tombol 3D)
  const cardBaseClass = "relative group w-64 h-48 text-white flex flex-col items-center justify-center rounded-xl shadow-xl transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-2 border-4 border-white/40 border-b-8 border-b-black/20";

  return (
    <div 
      className="w-full min-h-screen flex flex-col items-center justify-center mx-auto py-10 px-4"
      style={{
        backgroundImage: "url('/bggame.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h3 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-gray-800 bg-[#F5F5DC]/95 backdrop-blur-sm px-8 py-4 rounded-3xl shadow-[0_8px_0_rgba(0,0,0,0.2)] border-4 border-white">
        Menu Permainan Puzzle
      </h3>
      
      {/* Tombol Petunjuk */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-12 bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_0_rgb(37,99,235)] hover:shadow-[0_2px_0_rgb(37,99,235)] hover:translate-y-1 transition-all duration-200 border-2 border-blue-300"
      >
        💡 Petunjuk Permainan
      </button>

      {/* Konten Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl shadow-2xl relative w-full max-w-6xl h-[85vh] flex flex-col border-4 border-blue-500">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-2xl hover:bg-red-600 transition-transform duration-200 hover:scale-110 shadow-lg border-2 border-white"
              aria-label="Tutup"
            >
              &times;
            </button>
            <h4 className="text-3xl font-bold text-gray-800 mb-4 text-center">Petunjuk Permainan</h4>
            <div className="flex-grow rounded-xl overflow-hidden border-2 border-gray-300 bg-gray-100">
              {/* LINK DRIVE TELAH DIPERBARUI KE /preview AGAR BISA DI-EMBED */}
              <iframe
                className="w-full h-full border-0"
                src="https://drive.google.com/file/d/1hmWlgQOugMiAE-oy8nK4NvYn_bvwAiyS/preview"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Konten Level Permainan */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-8">
        
        {/* === LEVEL 1 === */}
        <div className="flex flex-col items-center text-center bg-[#F5F5DC]/90 backdrop-blur-sm p-4 rounded-3xl shadow-xl w-full md:w-72 border-2 border-white/60">
          <Link 
            href="/bahan-belajar/permainan/1" 
            className={`${cardBaseClass} bg-gradient-to-br from-orange-400 to-red-500`}
          >
            <span className="text-6xl mb-1 drop-shadow-md transform group-hover:rotate-12 transition-transform duration-300">🧩</span>
            
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black drop-shadow-sm uppercase tracking-wide">Level 1</span>
            </div>
          </Link>
          <p className="mt-4 text-sm md:text-base text-gray-700 font-bold">
            Susun Puzzle Untuk Menemukan Gambar yang Menarik 📖
          </p>
        </div>

        {/* === LEVEL 2 === */}
        <div className={`flex flex-col items-center text-center p-4 rounded-3xl shadow-xl w-full md:w-72 border-2 border-white/60 transition-colors duration-300 ${isLevel2Locked ? 'bg-gray-200' : 'bg-[#F5F5DC]/90 backdrop-blur-sm'}`}>
          {isLevel2Locked ? (
            <div className={`${cardBaseClass} bg-gray-400 cursor-not-allowed border-gray-500`}>
              <LockIcon />
              <span className="text-xl font-bold mt-2 text-gray-100">Terkunci</span>
              <span className="text-xs text-gray-200 mt-1">Selesaikan Level 1</span>
            </div>
          ) : (
            <Link 
              href="/bahan-belajar/permainan/2" 
              className={`${cardBaseClass} bg-gradient-to-br from-purple-400 to-indigo-600`}
            >
              <span className="text-6xl mb-1 drop-shadow-md transform group-hover:rotate-12 transition-transform duration-300">🧩</span>
              
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black drop-shadow-sm uppercase tracking-wide">Level 2</span>
              </div>
            </Link>
          )}
          <p className={`mt-4 text-sm md:text-base font-bold ${isLevel2Locked ? 'text-gray-400' : 'text-gray-700'}`}>
            Susun Puzzle Untuk Menemukan Gambar yang Menarik ✍️
          </p>
        </div>

        {/* === LEVEL 3 === */}
        <div className={`flex flex-col items-center text-center p-4 rounded-3xl shadow-xl w-full md:w-72 border-2 border-white/60 transition-colors duration-300 ${isLevel3Locked ? 'bg-gray-200' : 'bg-[#F5F5DC]/90 backdrop-blur-sm'}`}>
          {isLevel3Locked ? (
            <div className={`${cardBaseClass} bg-gray-400 cursor-not-allowed border-gray-500`}>
              <LockIcon />
              <span className="text-xl font-bold mt-2 text-gray-100">Terkunci</span>
              <span className="text-xs text-gray-200 mt-1">Selesaikan Level 2</span>
            </div>
          ) : (
            <Link 
              href="/bahan-belajar/permainan/3" 
              className={`${cardBaseClass} bg-gradient-to-br from-teal-400 to-green-600`}
            >
              <span className="text-6xl mb-1 drop-shadow-md transform group-hover:rotate-12 transition-transform duration-300">🧩</span>
              
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black drop-shadow-sm uppercase tracking-wide">Level 3</span>
              </div>
            </Link>
          )}
          <p className={`mt-4 text-sm md:text-base font-bold ${isLevel3Locked ? 'text-gray-400' : 'text-gray-700'}`}>
            Susun Puzzle Untuk Menemukan Gambar yang Menarik 📚
          </p>
        </div>

      </div>
    </div>
  );
}