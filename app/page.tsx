"use client";

import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { useMusic } from "./music-context";

export default function Home() {
	const router = useRouter();
	const { playMusic, playClickSound } = useMusic();

	const handleStart = () => {
		playClickSound();
		playMusic();
		router.push("/bahan-belajar");
	};

	return (
		<main>
			<section
				id="landing-section"
				// Menambahkan onClick di sini agar seluruh layar bisa diklik
				onClick={handleStart}
				// cursor-pointer agar kursor berubah saat diarahkan ke mana saja di layar
				className="relative w-full h-screen flex justify-center items-end cursor-pointer overflow-hidden"
			>
				{/* Latar Belakang Gambar */}
				<Image
					src="/bgstart.png"
					alt="Latar Belakang Start"
					fill
					priority 
					className="object-cover -z-10"
				/>

				{/* Tombol Visual - mb-32 tetap dipertahankan posisinya */}
				{/* Kita menggunakan div agar tidak terjadi double-trigger button di dalam klik section */}
				<div
					className="mb-32 bg-orange-500 text-white text-2xl shadow-lg font-bold py-4 px-12 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 animate-bounce"
				>
					Klik untuk memulai
				</div>

				{/* Efek overlay halus agar tulisan lebih terbaca (Opsional) */}
				<div className="absolute inset-0 bg-black/10 -z-10"></div>
			</section>
		</main>
	);
}