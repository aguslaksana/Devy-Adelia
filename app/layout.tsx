import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}