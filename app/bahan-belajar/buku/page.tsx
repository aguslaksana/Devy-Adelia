import Image from "next/image";
import Link from "next/link";
import { Fredoka, Kalam, Roboto, Salsa } from "next/font/google";

const fredoka = Fredoka({
	weight: "400",
	subsets: ["latin"],
});
const salsa = Salsa({
	weight: "400",
	subsets: ["latin"],
});

export default function Home() {
	return (
		<main
			className={`mt-16 text-lg ${fredoka.className}`}
			style={{
				backgroundImage: "url('/bgbuku.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<section
				id="main-section"
				className="container mx-auto px-4 pb-4 pt-16 text-center"
			>
				<div className="inline-block bg-[#F5F5DC] p-6 rounded-xl shadow-lg mb-12">
					<h2
						className={`text-7xl font-bold text-gray-800 mb-4 ${salsa.className}`}
						style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}
					>
						Daftar Materi
					</h2>
					{/* === PERUBAHAN DI BARIS INI === */}
					<h3 className="text-4xl font-bold text-gray-700">
						Topik Utama: Ekosistem yang Harmonis
					</h3>
				</div>

				<div className="flex flex-wrap justify-center lg:-mx-3 md:-mx-2 -mx-1">
					{/* Definisi Ekosistem */}
					<div className="lg:w-1/4 md:w-1/4 px-3 mb-6 text-[#030303] w-full">
						<Link
							href="buku/38-provinsi"
							className={`bg-[#F5F5DC] shadow-lg p-4 rounded-lg h-full flex flex-col justify-between items-center
            transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95`}
						>
							<h3 className={"text-2xl font-bold mb-2 "}>
								Definisi Ekosistem
							</h3>
							<Image
								src="/daftar-38-provinsi-di-indonesia-cover.png"
								alt="Book Image"
								width={711}
								height={1006}
								className="w-1/2 h-auto p-2 mt-4 mb-4"
								draggable="false"
							/>
							<p className="w-4/5 text-gl">
								Pada materi ini membahasa mengenai definisi ekosistem
							</p>
						</Link>
					</div>
					{/* Materi Khusus Ekosistem */}
					<div className="lg:w-1/4 md:w-1/4 px-3 mb-6 text-[#030303] w-full">
						<Link
							// Tautan telah diubah di sini
							href="/bahan-belajar/materi-ekosistem"
							className={`bg-[#F5F5DC] shadow-lg p-4 rounded-lg h-full flex flex-col justify-between items-center
            transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95`}
						>
							<h3 className={"text-2xl font-bold mb-2 "}>
								Materi khusus Ekosistem yang Harmonis
							</h3>
							<Image
								src="/materi ekosistem yang harmonis.png"
								alt="Book Image"
								width={711}
								height={1006}
								className="w-1/2 h-auto p-2 mt-4 mb-4"
								draggable="false"
							/>
							<p className="w-4/5 text-gl">
								Dalam materi ini menjelaskaan dampak kerusakan ekosistem serta cara menanggulanginya
							</p>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}