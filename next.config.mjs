/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Kode ini artinya: 
  // Jika sedang di-upload ke GitHub (production), gunakan '/Devy-Adelia'
  // Jika sedang di laptop (development), JANGAN gunakan apa-apa ('')
  basePath: process.env.NODE_ENV === 'production' ? '/Devy-Adelia' : '',
};

export default nextConfig;