/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cdn.discordapp.com",
      "static-cdn.jtvnw.net",
      "cdn.7tv.app",
      "cdn.betterttv.net",
      "cdn.frankerfacez.com",
    ],
  },
  i18n: {
    // append/clean as needed
    locales: ["en", "de", "fr", "es", "it", "pt", "ru", "zh", "ja", "ko"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
