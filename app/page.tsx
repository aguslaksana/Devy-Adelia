"use client";

import { useRouter } from "next/navigation";
import Image from "next/image"; // Import komponen Image
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
				className="relative w-full h-screen flex justify-center items-end"
			>
				{/* Latar Belakang Gambar (Diganti dari Video ke Gambar) */}
				<Image
					src="/bgstart.png"
					alt="Latar Belakang Start"
					fill
					priority // Agar gambar dimuat prioritas utama
					className="object-cover -z-10" // Posisi di belakang konten lain
				/>

				{/* Tombol Start */}
				<button
					onClick={handleStart}
					className="mb-24 bg-orange-500 active:bg-orange-600 text-white text-2xl shadow-lg font-bold py-4 px-12 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 active:scale-95"
				>
					Start
				</button>
			</section>
		</main>
	);
}