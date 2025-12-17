"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";

const MusicContext = createContext<{
	playMusic: () => void;
	toggleMusic: () => void;
	isPlaying: boolean;
	playClickSound: () => void;
} | null>(null);

export const useMusic = () => {
	const context = useContext(MusicContext);
	if (!context) {
		throw new Error("useMusic must be used within a MusicProvider");
	}
	return context;
};

export const MusicProvider = ({ children }: { children: ReactNode }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);
	const clickAudioRef = useRef<HTMLAudioElement>(null);

	const playMusic = () => {
		if (audioRef.current && !isPlaying) {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};

	const toggleMusic = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				audioRef.current.play();
				setIsPlaying(true);
			}
		}
	};

	const playClickSound = () => {
		if (clickAudioRef.current) {
			clickAudioRef.current.currentTime = 0;
			clickAudioRef.current.play();
		}
	};

	return (
		<MusicContext.Provider value={{ playMusic, toggleMusic, isPlaying, playClickSound }}>
			{children}
			{/* Hidden Audio Elements */}
			<audio ref={audioRef} loop>
				<source src="/musik-bg.opus" type="audio/ogg" />
				Browser Anda tidak mendukung elemen audio.
			</audio>
			<audio ref={clickAudioRef}>
				<source src="/click.opus" type="audio/ogg" />
				Browser Anda tidak mendukung elemen audio.
			</audio>
		</MusicContext.Provider>
	);
};

export const MusicButton = () => {
	const { toggleMusic, isPlaying, playClickSound } = useMusic();

	const handleClick = () => {
		playClickSound();
		toggleMusic();
	};

	return (
		<button
			onClick={handleClick}
			className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 z-50"
			title={isPlaying ? "Matikan Musik" : "Hidupkan Musik"}
		>
			{isPlaying ? "🔊" : "🔇"}
		</button>
	);
};
