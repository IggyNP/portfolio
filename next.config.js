/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  output: "standalone", // Actualiza esta opción
  images: {
    domains: ["your-domain.netlify.app"], // Cambia por tu dominio si lo tienes
  },
};

module.exports = nextConfig;
