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
	const prefix = process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '';
	const [isPlaying, setIsPlaying] = useState(false);
	const bgMusicRef = useRef<HTMLAudioElement | null>(null);
	const clickSoundRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		bgMusicRef.current = new Audio(`${prefix}/musik-bg.opus`);
		bgMusicRef.current.loop = true;
		bgMusicRef.current.volume = 0.4;

		clickSoundRef.current = new Audio(`${prefix}/click.opus`);
		
		return () => {
			bgMusicRef.current?.pause();
		};
	}, [prefix]);

	const playMusic = () => {
		bgMusicRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
	};

	const pauseMusic = () => {
		bgMusicRef.current?.pause();
		setIsPlaying(false);
	};

	const toggleMusic = () => {
		if (isPlaying) { pauseMusic(); } else { playMusic(); }
	};

	const playClickSound = () => {
		if (clickSoundRef.current) {
			clickSoundRef.current.currentTime = 0;
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