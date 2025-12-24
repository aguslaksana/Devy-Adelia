/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === 'true'; // Cek apakah sedang di Vercel

const nextConfig = {
  output: 'export',
  // Jika di Vercel, basePath kosong. Jika bukan (GitHub), pakai /Devy-Adelia
  basePath: isVercel ? '' : '/Devy-Adelia', 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;