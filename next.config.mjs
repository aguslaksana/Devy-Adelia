/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Pastikan ini sesuai dengan nama repository kamu di GitHub
  basePath: '/Devy-Adelia',
  assetPrefix: '/Devy-Adelia', // Tambahkan baris ini untuk memperkuat alamat aset
};

export default nextConfig;