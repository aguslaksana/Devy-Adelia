"use client";

import { useMusic } from "./music-context";
import { usePathname } from "next/navigation";

export default function MusicControl() {
    const { isPlaying, toggleMusic } = useMusic();
    const pathname = usePathname();

    // Jangan tampilkan tombol jika di halaman utama (opsional, karena di Home sudah ada tombol start)
    // Tapi jika ingin muncul di semua halaman termasuk Home, hapus baris if ini:
    // if (pathname === "/") return null;

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                toggleMusic();
            }}
            className="fixed top-5 right-5 z-[9999] bg-white/90 p-3 rounded-full shadow-2xl border-2 border-orange-500 hover:scale-110 transition-all active:scale-90"
            title="Musik"
        >
            <span className="text-2xl">{isPlaying ? "🔊" : "🔇"}</span>
        </button>
    );
}