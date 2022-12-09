/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.discordapp.com", "static-cdn.jtvnw.net", "cdn.7tv.app"],
  },
};

module.exports = nextConfig;
