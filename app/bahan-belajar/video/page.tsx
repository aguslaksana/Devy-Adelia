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
          // Menggunakan template literals (backticks) untuk menggabungkan prefix dan nama file
          backgroundImage: `url('${prefix}/videobg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Bagian 1: Judul */}
      <section className="text-center py-24">
        <div className="inline-block bg-[#F5F5DC] p-6 rounded-xl shadow-lg">
          <h2
            className={`text-7xl font-bold text-gray-800 mb-4 ${salsa.className}`}
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}
          >
            Video Pembelajaran
          </h2>
          <h3 className="text-4xl font-bold text-gray-700">
            Teks Deskripsi
          </h3>
        </div>
      </section>

      {/* Bagian 2: Konten Video */}
      <section className="bg-gray-900 bg-opacity-25 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">

            {/* Video */}
            <div className="lg:w-1/2 md:w-3/4 w-full px-3 mb-8 text-[#030303]">
              <div className="bg-[#F5F5DC] shadow-lg p-8 rounded-xl flex flex-col">

                <h3 className={`text-4xl font-bold mb-6 text-center ${salsa.className}`}>
                  Menulis Teks Deskripsi
                </h3>

                {/* Embed Video YouTube */}
                <div className="w-full relative mb-6" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://www.youtube.com/embed/Lw_vEQlP_cs"
                    title="Menulis Teks Deskripsi"
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <p className="text-2xl text-justify mb-6">
                  Video ini membahas pengertian, tujuan, ciri-ciri, bagian, serta
                  langkah-langkah menulis teks deskripsi.
                </p>

                <Link
                  href="https://www.youtube.com/watch?v=Lw_vEQlP_cs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-red-600 text-white text-2xl font-bold py-4 rounded-xl hover:bg-red-700 transition mb-4"
                >
                  ▶ Tonton Video di YouTube
                </Link>

                <div className="break-all text-lg text-center">
                  <span className="font-bold">Sumber: </span>
                  <Link
                    href="https://www.youtube.com/@usmitachannel8458"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    Usmita Channel
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}