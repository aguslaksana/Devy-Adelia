"use client";

import "./globals.css";

import { MusicProvider, MusicButton } from "./music-context";
import OrientationChecker from "./OrientationChecker";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="bg-white font-sans leading-normal tracking-normal">
<<<<<<< HEAD
			<title>Game Deskripfun</title>
=======
			<title>Game deskripfun</title>
>>>>>>> a5b0ac5e68094f2a11141b378d5385f1f7c3ea5c
			<body className="flex flex-col min-h-screen">
				<OrientationChecker />
				<MusicProvider>
					<main className="flex-grow">{children}</main>
					<MusicButton />
				</MusicProvider>
			</body>
		</html>
	);
}
