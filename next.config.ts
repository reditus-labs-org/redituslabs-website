import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
    "three",
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader"],
    });
    return config;
  },
  experimental: {
    optimizePackageImports: ["@react-three/drei", "three"],
  },
  turbopack: {},
};

export default nextConfig;