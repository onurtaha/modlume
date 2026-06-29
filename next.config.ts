import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.modrinth.com" },
      { protocol: "https", hostname: "cdn-raw.modrinth.com" },
      { protocol: "https", hostname: "static.modrinth.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "*.githubusercontent.com" },
      { protocol: "https", hostname: "img.modrinth.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
