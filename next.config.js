/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  output: "standalone",
  webpack(config) {
    // 1. Encontrar la regla de Next.js que maneja los SVG
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // 2. Excluir SVG del cargador de archivos estándar
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url (si quisieras usarlo como img)
      },
      // 3. Convertir el resto de SVG en componentes
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
    );

    // Modificar la regla original para que no choque
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
