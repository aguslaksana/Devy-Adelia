"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type MusicContextType = {
	isPlaying: boolean;
	playMusic: () => void;
	pauseMusic: () => void;
	playClickSound: () => void;
	toggleMusic: () => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// Pastikan folder repository di GitHub bernama 'Devy-Adelia' jika ingin menggunakan prefix ini
	const prefix = process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '';
	const [isPlaying, setIsPlaying] = useState(false);
	
	const bgMusicRef = useRef<HTMLAudioElement | null>(null);
	const clickSoundRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		// Inisialisasi Audio Musik Latar
		bgMusicRef.current = new Audio(`${prefix}/musik-bg.opus`);
		bgMusicRef.current.loop = true;
		bgMusicRef.current.volume = 0.4;

		// Inisialisasi Audio Efek Klik
		clickSoundRef.current = new Audio(`${prefix}/click.opus`);
		
		return () => {
			bgMusicRef.current?.pause();
		};
	}, [prefix]);

	const playMusic = () => {
		if (bgMusicRef.current) {
			bgMusicRef.current.play()
				.then(() => setIsPlaying(true))
				.catch((err) => console.warn("Autoplay diblokir browser, user harus klik dulu:", err));
		}
	};

	const pauseMusic = () => {
		if (bgMusicRef.current) {
			bgMusicRef.current.pause();
			setIsPlaying(false);
		}
	};

	const toggleMusic = () => {
		if (isPlaying) { 
			pauseMusic(); 
		} else { 
			playMusic(); 
		}
	};

	const playClickSound = () => {
		// SEKARANG SUDAH AKTIF
		if (clickSoundRef.current) {
			clickSoundRef.current.currentTime = 0; // Reset ke awal agar bisa diklik berkali-kali dengan cepat
			clickSoundRef.current.play().catch(() => {});
		}
	};

	return (
		<MusicContext.Provider value={{ isPlaying, playMusic, pauseMusic, playClickSound, toggleMusic }}>
			{children}
		</MusicContext.Provider>
	);
};

export const useMusic = () => {
	const context = useContext(MusicContext);
	if (!context) throw new Error("useMusic must be used within a MusicProvider");
	return context;
};