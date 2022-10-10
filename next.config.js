/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    config.resolve.modules.push(__dirname);
    return config;
  }
};

module.exports = nextConfig;
