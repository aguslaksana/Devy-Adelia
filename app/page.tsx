"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { useMusic } from "./music-context";

export default function Home() {
	const router = useRouter();
	const { playMusic, pauseMusic, playClickSound } = useMusic();
	const [isPlaying, setIsPlaying] = useState(false);

	const isVercel = process.env.NEXT_PUBLIC_VERCEL === 'true';
	const isProd = process.env.NODE_ENV === 'production';
	
	const prefix = isVercel ? '' : (isProd ? '/Devy-Adelia' : '');

	const handleStart = () => {
		playClickSound();
		playMusic();
		setIsPlaying(true);
		router.push("/bahan-belajar");
	};

	const toggleMusic = (e: React.MouseEvent) => {
		e.stopPropagation(); 
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
				// Gunakan items-end untuk mendorong konten ke bawah, 
				// dan justify-center untuk menaruhnya di tengah secara horizontal
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

				{/* Tombol Musik (Tetap di pojok) */}
				<button
					onClick={toggleMusic}
					className="absolute bottom-5 right-5 z-50 bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl hover:scale-110 transition-all duration-300 border-2 border-white/30"
				>
					{isPlaying ? (
						<span className="text-3xl filter drop-shadow-sm">🔊</span>
					) : (
						<span className="text-3xl filter drop-shadow-sm">🔇</span>
					)}
				</button>

				{/* Tombol Utama - POSISI DIPERBAIKI */}
				<div
					// Nilai mb-12 (Margin Bottom) akan menempatkan tombol lebih rendah 
					// sehingga tidak menutupi judul game di tengah layar.
					className="relative z-20 mb-12 bg-orange-500 text-white text-xl md:text-2xl shadow-xl font-bold py-4 px-12 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 animate-bounce select-none border-4 border-white"
				>
					Klik untuk Memulai
				</div>

				{/* Overlay gelap tipis agar tombol lebih terlihat */}
				<div className="absolute inset-0 bg-black/10 -z-10"></div>
			</section>
		</main>
	);
}