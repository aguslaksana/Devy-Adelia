"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { useMusic } from "./music-context";

export default function Home() {
	const router = useRouter();
	const { playMusic, pauseMusic, playClickSound } = useMusic();
	const [isPlaying, setIsPlaying] = useState(false);

	// Logika prefix agar gambar tidak hilang di Localhost maupun GitHub
	const prefix = process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '';

	const handleStart = () => {
		playClickSound();
		playMusic();
		setIsPlaying(true);
		router.push("/bahan-belajar");
	};

	const toggleMusic = (e: React.MouseEvent) => {
		e.stopPropagation(); // Agar tidak memicu handleStart saat klik tombol musik
		if (isPlaying) {
			pauseMusic();
		} else {
			playMusic();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<main>
			<section
				id="landing-section"
				onClick={handleStart}
				className="relative w-full h-screen flex justify-center items-end cursor-pointer overflow-hidden"
			>
				{/* Latar Belakang Gambar */}
				<Image
					src={`${prefix}/bgstart.png`}
					alt="Latar Belakang Start"
					fill
					priority 
					className="object-cover -z-10"
				/>

				{/* Tombol Musik (Pojok Kanan Atas) */}
				<button
					onClick={toggleMusic}
					className="absolute top-5 right-5 z-50 bg-white/80 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
				>
					{isPlaying ? (
						// Ikon Speaker ON
						<span className="text-2xl">🔊</span>
					) : (
						// Ikon Speaker OFF
						<span className="text-2xl">X 🔇</span>
					)}
				</button>

				{/* Tombol Utama - Pastikan z-index tinggi agar kelihatan */}
				<div
					className="relative z-20 mb-32 bg-orange-500 text-white text-2xl shadow-xl font-bold py-4 px-12 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 animate-bounce select-none border-4 border-white"
				>
					Klik untuk Memulai
				</div>

				{/* Overlay gelap tipis */}
				<div className="absolute inset-0 bg-black/20 -z-10"></div>
			</section>
		</main>
	);
}