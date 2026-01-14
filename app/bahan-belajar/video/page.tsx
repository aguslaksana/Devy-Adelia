"use client";
import React from "react";
import Link from "next/link";
import { Fredoka, Salsa } from "next/font/google";

const fredoka = Fredoka({ weight: "400", subsets: ["latin"] });
const salsa = Salsa({ weight: "400", subsets: ["latin"] });

export default function MateriPembelajaranPage() {
  // Prefix ini sangat penting agar link tidak 404 saat di-online-kan (GitHub Pages)
  const prefix = process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '';

  return (
    <main className={`relative min-h-screen ${fredoka.className} pt-20 pb-10 px-4`}>
       <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url('${prefix}/videobg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="bg-[#F5F5DC] p-6 rounded-3xl shadow-2xl border-4 border-white mb-10 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold text-gray-800 ${salsa.className}`}>Materi Pembelajaran</h1>
          <p className="text-xl text-gray-600 mt-2">Simak video dan baca materi di bawah ini</p>
        </div>

        <div className="bg-white rounded-[2rem] p-4 md:p-8 shadow-2xl border-[6px] border-orange-300 flex flex-col gap-10">
          {/* VIDEO YOUTUBE */}
          <div>
            <h2 className={`text-2xl font-bold text-orange-600 mb-4 ${salsa.className}`}>🎬 Video Penjelasan</h2>
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-orange-100">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/kAeNUTt8AhM
" 
                title="Video Materi"
                allowFullScreen
              />
            </div>
          </div>

          <div className="border-t-4 border-dashed border-orange-100"></div>

          {/* MATERI DRIVE */}
          <div>
            <h2 className={`text-2xl font-bold text-orange-600 mb-4 ${salsa.className}`}>📖 Materi Bacaan</h2>
            <div className="w-full h-[500px] md:h-[700px] rounded-2xl overflow-hidden shadow-lg border-2 border-orange-100">
              <iframe
                src="https://drive.google.com/file/d/1VFm8K3Ingss6VaaripGKme4WGNqisL76/preview"
                className="w-full h-full"
                allow="autoplay"
              />
            </div>
          </div>
        </div>

        {/* TOMBOL KEMBALI KE MAIN MENU */}
        <div className="flex justify-center mt-10">
          <Link 
            href={`${prefix}/bahan-belajar`} 
            className="bg-orange-500 text-white px-10 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-all text-center"
          >
            ⬅ Kembali ke Main Menu
          </Link>
        </div>
      </div>
    </main>
  );
}