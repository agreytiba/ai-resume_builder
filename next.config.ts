import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w0mlmrgwbziwquaq.public.blob.vercel-storage.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://api.zeno.africa", // Environment variables for secure fetching
  },
};

export default nextConfig;
