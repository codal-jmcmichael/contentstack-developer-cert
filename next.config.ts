import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["app.contentstack.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.contentstack.io",
        port: "",
        pathname: "/v3/assets/**",
      },
    ],
  },
};

export default nextConfig;
