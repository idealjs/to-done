const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NEXT_PUBLIC_NODE_ENV !== "prod",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      // Add all node_modules but @prisma/client module to managedPaths
      // Allows for hot refresh of changes to @prisma/client module
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!@prisma[\\/]client)/],
    };
    return config;
  },
};

module.exports = withPWA(nextConfig);
