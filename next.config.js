/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  experimental: {
    runtime: "nodejs", // Habilita la compatibilidad con Netlify Functions (requiere runtime Node.js)
    outputStandalone: true, // Genera una construcción lista para ser servida por Netlify
  },
  images: {
    domains: ["your-domain.netlify.app"], // Cambia 'your-domain.netlify.app' por tu dominio de Netlify si tienes uno
  },
};

module.exports = nextConfig;
