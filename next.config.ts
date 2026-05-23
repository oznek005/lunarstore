// Hapus 'output: export'
// Hapus 'trailingSlash: true'
// Hapus 'unoptimized: true'

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Biarkan kosong atau tambahkan config lain yang kamu butuhkan
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;