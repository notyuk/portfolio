import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/gama-cyprus",
        destination: "/gama-cyprus/index.html",
      },
      {
        source: "/gama-cyprus/",
        destination: "/gama-cyprus/index.html",
      },
    ];
  },
};

export default nextConfig;