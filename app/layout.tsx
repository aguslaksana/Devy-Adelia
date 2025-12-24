import type { Metadata } from "next";
import "./globals.css";
// Impor MusicProvider dari file music-context kamu
import { MusicProvider } from "./music-context"; 

export const metadata: Metadata = {
  title: "Game Deskripfun",
  description: "Game Edukasi Kebudayaan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-white font-sans leading-normal tracking-normal">
        {/* Bungkus children dengan MusicProvider agar fitur musik bisa jalan di semua halaman */}
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}