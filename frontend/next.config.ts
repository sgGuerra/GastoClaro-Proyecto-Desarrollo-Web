import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy las llamadas /api/* al backend Express en puerto 4000
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
