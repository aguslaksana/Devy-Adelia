/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // basePath hanya aktif kalau sedang build production (buat di-upload ke GitHub)
  // Kalau sedang npm run dev, basePath kosong agar bisa diakses di localhost:3000 langsung
  basePath: isProd ? '/Devy-Adelia' : '', 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;