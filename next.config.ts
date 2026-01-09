import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ['lenis'],
  /* config options here */
};

export default nextConfig;
