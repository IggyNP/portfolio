module.exports = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    // Sin redirección automática por idioma del navegador: evita el bucle
    // /es -> /es al convivir con el middleware de mantenimiento.
    localeDetection: false,
  },
};
