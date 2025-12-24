/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Hanya gunakan basePath dan assetPrefix untuk production (GitHub Pages)
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/Devy-Adelia',
    assetPrefix: '/Devy-Adelia',
  }),
};

export default nextConfig;
