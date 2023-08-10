/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    TARGET_API: process.env.TARGET_API,
    JWT_KEY: process.env.JWT_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    CUSTOM_SEARCH_ENGINE_ID: process.env.CUSTOM_SEARCH_ENGINE_ID,
    PEXELS_KEY: process.env.PEXELS_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
