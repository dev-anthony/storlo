import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Silences "ignored package-lock.json" — Next was inferring the monorepo
  // root from a lockfile it found in a parent folder outside this repo.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
