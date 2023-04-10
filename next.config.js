/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    TARGET_API: process.env.TARGET_API,
  },
};

module.exports = nextConfig;
