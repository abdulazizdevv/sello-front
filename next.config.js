/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeImages: true,
    compress: true,
    preload: true,
    images: {
      domains: ["fakestoreapi.com","10.10.1.25", "picsum.photos"],
    },
  };
  
  module.exports = nextConfig;
  