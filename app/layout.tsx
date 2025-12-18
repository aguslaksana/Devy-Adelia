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
			<title>Game deskripfun</title>
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
