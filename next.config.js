/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeImages: true,
  compress: true,
  preload: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "10.10.1.25",
      "159.65.58.100",
      "157.230.2.35",
      "picsum.photos",
    ],
  },
};

module.exports = nextConfig;
