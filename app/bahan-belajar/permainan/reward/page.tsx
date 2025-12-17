"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RewardPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation on mount
    setShowConfetti(true);

    // Play celebration sound if available (optional)
    // const audio = new Audio('/celebration-sound.mp3');
    // audio.play().catch(() => {}); // Ignore if sound fails
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center relative z-10">
        {/* Trophy Icon */}
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-yellow-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>

        {/* Congratulations Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-bounce">
          🎉 Selamat! 🎉
        </h1>

        {/* Subtitle */}
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Kamu Telah Menyelesaikan Semua Level Permainan!
        </h2>

        {/* Achievement Message */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Wah, luar biasa! Kamu telah menjelajahi ekosistem sawah, hutan, dan laut dengan sangat baik.
          Kamu sekarang ahli dalam memahami keseimbangan alam dan pentingnya menjaga harmoni ekosistem.
          Teruslah belajar dan jaga lingkungan kita! 🌍💚
        </p>

        {/* Fun Facts or Next Steps */}
        <div className="bg-green-100 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Fakta Menarik!</h3>
          <ul className="text-left text-green-700 space-y-2">
            <li>🌾 Ekosistem sawah membantu menyediakan makanan untuk lebih dari setengah populasi dunia</li>
            <li>🌳 Hutan tropis menyimpan lebih dari 150 miliar ton karbon</li>
            <li>🌊 Laut menutupi 71% permukaan bumi dan menghasilkan 50% oksigen kita</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/bahan-belajar/permainan"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            🔄 Main Lagi dari Awal
          </Link>
          <Link
            href="/bahan-belajar"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            📚 Jelajahi Bahan Belajar Lain
          </Link>
        </div>

        {/* Footer Message */}
        <p className="text-sm text-gray-500 mt-8">
          Terima kasih telah bermain! Ingat, setiap tindakan kecil untuk menjaga lingkungan sangat berarti. 🌟
        </p>
      </div>
    </div>
  );
}
