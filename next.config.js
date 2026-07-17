/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

// Rutas viejas de proyecto → nuevas páginas de detalle (/project/<slug>). Next
// conserva el prefijo de locale (/es/… → /es/project/…). Los proyectos
// retirados (weather/calculator) van al home.
const PROJECT_REDIRECTS = [
  "portfolio",
  "ior",
  "driveland-motorsport",
  "ammde",
].map((slug) => ({
  source: `/${slug}`,
  destination: `/project/${slug}`,
  permanent: false,
}));

// Soto BP se sustituyó por MB Dream Living: rutas viejas → nuevo detalle.
const SOTOBP_REDIRECTS = [
  { source: "/soto-bp", destination: "/project/mb-dream-living", permanent: false },
  { source: "/project/soto-bp", destination: "/project/mb-dream-living", permanent: false },
  { source: "/proyecto/soto-bp", destination: "/proyecto/mb-dream-living", permanent: false },
];

const nextConfig = {
  i18n,
  reactStrictMode: true,
  output: "standalone",
  // El build no debe fallar por lint: se ejecuta aparte (`npm run lint`).
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      ...PROJECT_REDIRECTS,
      ...SOTOBP_REDIRECTS,
      { source: "/weather-app", destination: "/", permanent: false },
      { source: "/calculator", destination: "/", permanent: false },
    ];
  },
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
