"use client";

import React, { useState } from "react";
import Link from "next/link";

function CpDanTpPage() {
  // Prefix HANYA digunakan untuk aset statis seperti gambar/file di folder public
  const prefix = process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '';
  
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Page menggunakan prefix karena ini adalah file gambar di folder public */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url('${prefix}/videobg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* OVERLAY MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          
          {/* KONTEN MODAL */}
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-[6px] border-orange-400">
            
            {/* Header Modal */}
            <div className="p-5 bg-orange-50 flex justify-between items-center border-b-4 border-orange-100">
              <div>
                <h2 className="text-2xl font-bold text-orange-700">📋 CP dan TP</h2>
                <p className="text-sm text-orange-600">Capaian & Tujuan Pembelajaran</p>
              </div>
              
              {/* JANGAN tambahkan prefix di sini, Next.js otomatis menambahkannya */}
              <Link 
                href="/bahan-belajar/"
                className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
              >
                ✕
              </Link>
            </div>

            {/* Body Modal (Iframe Materi) */}
            <div className="flex-1 bg-gray-200 relative">
              <iframe
                /* Link baru telah dimasukkan di bawah ini dengan format /preview */
                src="https://drive.google.com/file/d/1BPsPdT97lrmWNKzaiam_EycFhUnsnE9O/preview"
                title="CP dan TP"
                className="w-full h-full border-none"
                allow="autoplay"
              />
            </div>

            {/* Footer Modal (Tombol Kembali Utama) */}
            <div className="p-4 bg-orange-50 border-t-4 border-orange-100 flex justify-center">
              {/* JANGAN tambahkan prefix di sini */}
              <Link
                href="/bahan-belajar/"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 hover:scale-105"
              >
                ⬅ Kembali ke Main Menu
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CpDanTpPage;