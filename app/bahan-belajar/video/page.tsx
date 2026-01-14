import Link from "next/link";
import { Fredoka, Salsa } from "next/font/google";

const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
});

const salsa = Salsa({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  // === LOGIKA PREFIX UNTUK GITHUB PAGES ===
  const prefix = process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '';

  return (
    <main className={`relative mt-16 text-lg ${fredoka.className}`}>
      
      {/* BACKGROUND FIXED DENGAN PREFIX */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url('${prefix}/videobg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Bagian 1: Judul */}
      <section className="text-center py-16">
        <div className="inline-block bg-[#F5F5DC] p-6 rounded-xl shadow-lg border-4 border-orange-200">
          <h2
            className={`text-5xl md:text-7xl font-bold text-gray-800 mb-2 ${salsa.className}`}
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
          >
            Materi Pembelajaran
          </h2>
          <h3 className="text-2xl md:text-4xl font-bold text-orange-600 italic">
            Mengenal Teks Deskripsi
          </h3>
        </div>
      </section>

      {/* Bagian 2: Konten Materi & Video (Dibuat Berdampingan) */}
      <section className="bg-gray-900 bg-opacity-10 py-8">
        <div className="container mx-auto px-4">
          
          {/* Container Utama Putih */}
          <div className="bg-[#F5F5DC] shadow-2xl p-6 md:p-10 rounded-3xl border-4 border-white">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* KOLOM KIRI: VIDEO YOUTUBE */}
              <div className="flex flex-col">
                <h3 className={`text-3xl font-bold mb-6 text-orange-700 flex items-center gap-2 ${salsa.className}`}>
                  🎬 Video Penjelasan
                </h3>
                
                <div className="w-full relative mb-6 shadow-xl border-4 border-white rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  {/* LINK YOUTUBE BARU DISINI */}
                  <iframe
                    src="https://www.youtube.com/embed/kAeNUTt8AhM" 
                    title="Mengenal Teks Deskripsi"
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <p className="text-xl text-justify text-gray-700 leading-relaxed mb-6">
                  Simak video animasi ini untuk memahami apa itu mendeskripsikan sesuatu. Perhatikan contoh yang diberikan dalam video agar kamu semakin paham!
                </p>

                <Link
                  href="https://youtu.be/kAeNUTt8AhM?si=Pg8F3frNSYgn4-Le"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-red-600 text-white text-xl font-bold py-3 rounded-xl hover:bg-red-700 transition shadow-md"
                >
                  ▶ Tonton di YouTube
                </Link>
              </div>

              {/* KOLOM KANAN: EMBED GOOGLE DRIVE */}
              <div className="flex flex-col">
                <h3 className={`text-3xl font-bold mb-6 text-orange-700 flex items-center gap-2 ${salsa.className}`}>
                  📖 Materi Bacaan
                </h3>

                <div className="w-full h-[450px] md:h-[600px] shadow-xl border-4 border-white rounded-2xl overflow-hidden mb-6">
                  <iframe
                    src="https://drive.google.com/file/d/1VFm8K3Ingss6VaaripGKme4WGNqisL76/preview"
                    className="w-full h-full"
                    allow="autoplay"
                    title="Materi PDF"
                  />
                </div>

                <div className="bg-orange-100 p-4 rounded-xl border-l-8 border-orange-500">
                  <p className="text-gray-800 font-medium">
                    💡 <strong>Tips:</strong> Kamu bisa membaca materi di atas untuk melengkapi pemahamanmu setelah menonton video.
                  </p>
                </div>
              </div>

            </div>

            {/* Sumber Video di Bagian Bawah */}
            <div className="mt-10 pt-6 border-t border-gray-300 text-center">
              <span className="font-bold text-gray-600">Sumber Materi: </span>
              <Link
                href="https://www.youtube.com/@AbethSitumeang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-bold"
              >
                Abeth Situmeang
              </Link>
            </div>

          </div>

          {/* Tombol Kembali ke Menu */}
          <div className="flex justify-center mt-10">
            <Link href="/" className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition-all shadow-lg transform hover:scale-105">
              ⬅ Kembali ke Menu Utama
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}