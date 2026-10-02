import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async rewrites() {
    // Production frontend fallback: keep the deployed Express API reachable
    // even if BACKEND_URL was accidentally removed from Vercel environment
    // variables. BACKEND_URL still takes precedence when explicitly configured.
    const backendUrl =
      process.env.BACKEND_URL || "https://kiranawala-api.onrender.com";

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
