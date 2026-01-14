/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // basePath sangat penting agar file Anda terbaca di /Devy-Adelia
  basePath: isProd ? '/Devy-Adelia' : '', 
  trailingSlash: true, // <--- TAMBAHKAN INI agar rute tidak 404
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;