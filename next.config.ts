import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/gama-cyprus",
        destination: "/gama-cyprus/",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/gama-cyprus/",
        destination: "/gama-cyprus/index.html",
      },
    ];
  },
};

export default nextConfig;