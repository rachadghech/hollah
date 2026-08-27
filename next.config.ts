import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Generate a unique build ID each time to prevent stale cached chunk 404s
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Ensure static assets have proper cache-control headers
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;