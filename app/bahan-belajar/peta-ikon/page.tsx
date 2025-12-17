"use client"; // Pastikan ini ada di baris paling atas

import Image from "next/image";
import Link from "next/link";
import { Fredoka, Kalam, Roboto, Salsa } from "next/font/google";

const kalam = Kalam({
  weight: "400",
  subsets: ["latin"],
});
const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const salsa = Salsa({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`relative text-lg ${fredoka.className}`}>
      {/* Kontainer untuk semua tombol di pojok kanan atas */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        {/* Tombol CP */}
        <Link
          href="/bahan-belajar/cp-dan-tp"
          className="bg-green-500 text-white shadow-lg p-3 rounded-lg flex items-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95"
        >
          <span className={"font-bold " + salsa.className}>CP</span>
        </Link>

        {/* Tombol TP */}
        <Link
          href="/bahan-belajar/cp-dan-tp"
          className="bg-green-500 text-white shadow-lg p-3 rounded-lg flex items-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95"
        >
          <span className={"font-bold " + salsa.className}>TP</span>
        </Link>

        {/* Tombol Identitas Penyusun */}
        <Link
          href="/bahan-belajar/identitas-penyusun"
          className="bg-[#F5F5DC] text-[#030303] shadow-lg p-3 rounded-lg flex items-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95"
        >
          <span className={"font-bold " + salsa.className}>
            Identitas Penyusun
          </span>
        </Link>
      </div>

      <section
        id="main-section"
        className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="/vid2.mp4" type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center lg:-mx-3 md:-mx-2 -mx-1">
            {/* Kartu Petunjuk Penggunaan */}
            <div className="lg:w-1/4 md:w-1/4 px-3 mb-6 text-[#030303] w-full">
              <Link
                href="/bahan-belajar/petunjuk-penggunaan-peta"
                className="bg-[#F5F5DC] shadow-lg p-4 rounded-lg h-full flex flex-col justify-between items-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <h3 className={"text-2xl font-bold mb-2 " + salsa.className}>
                  Petunjuk Penggunaan
                </h3>
                <Image
                  src="/maps.gif"
                  alt="Maps gif"
                  width={512}
                  height={613}
                  className="w-1/2 h-auto p-2 my-2"
                  draggable="false"
                  unoptimized
                />
                <p className="w-full text-base">
                  Pelajari Petunjuk Penggunaan, agar memudahkan proses penggunaan media.
                </p>
              </Link>
            </div>

            {/* Kartu Materi Ajar dan Buku */}
            <div className="lg:w-1/4 md:w-1/4 px-3 mb-6 text-[#030303] w-full">
              <Link
                href="/bahan-belajar/buku"
                className="bg-[#F5F5DC] shadow-lg p-4 rounded-lg h-full flex flex-col justify-between items-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <h3 className={"text-2xl font-bold mb-2 " + salsa.className}>
                  Materi ajar dan Buku
                </h3>
                <Image
                  src="/book.gif"
                  alt="Book gif"
                  width={512}
                  height={582}
                  className="w-1/2 h-auto p-2 my-2"
                  draggable="false"
                  unoptimized
                />
                <p className="w-full text-base">
                  Jelajahi materi pembelajaran dalam format teks.
                </p>
              </Link>
            </div>

            {/* Kartu Video */}
            <div className="lg:w-1/4 md:w-1/4 px-3 mb-6 text-[#030303] w-full">
              <Link
                href="/bahan-belajar/video"
                className="bg-[#F5F5DC] shadow-lg p-4 rounded-lg h-full flex flex-col justify-between items-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <h3 className={"text-2xl font-bold mb-2 " + salsa.className}>
                  Video
                </h3>
                <Image
                  src="/video.gif"
                  alt="Video gif"
                  width={512}
                  height={471}
                  className="w-1/2 h-auto p-2 my-2"
                  draggable="false"
                  unoptimized
                />
                <p className="w-full text-base">
                  Pelajari materi dengan cara audio visual yang menarik.
                </p>
              </Link>
            </div>

            {/* Kartu Permainan */}
            <div className="lg:w-1/4 md:w-1/4 px-3 mb-6 text-[#030303] w-full">
              <Link
                href="/bahan-belajar/permainan"
                className="bg-[#F5F5DC] shadow-lg p-4 rounded-lg h-full flex flex-col justify-between items-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <h3 className={"text-2xl font-bold mb-2 " + salsa.className}>
                  Game
                </h3>
                <Image
                  src="/games.gif"
                  alt="Games gif"
                  width={500}
                  height={500}
                  className="w-1/2 h-auto p-2 my-2"
                  draggable="false"
                  unoptimized
                />
                <p className="w-full text-base">
                  Asah pengetahuan dengan cara yang menyenangkan.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}