/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    deviceSizes: [320, 384, 420, 640, 768, 1080],
    imageSizes: [64, 128, 256],
    minimumCacheTTL: 31 * 24 * 60 * 60, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
