import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "https://iggynp.com";

// Metadatos SEO reutilizables: title, description, Open Graph, Twitter card,
// canonical y hreflang (en/es/x-default). Las URLs se construyen desde la ruta
// actual (asPath sin query/hash) y los locales de next-i18next. El locale por
// defecto (en) va sin prefijo; el resto (es) bajo /<locale>.
export default function Seo({ title, description, image = "/images/og/og-home.png", noindex = false }) {
  const { asPath, locale, locales, defaultLocale } = useRouter();

  const path = asPath.split(/[?#]/)[0];
  const prefix = (l) => (l === defaultLocale ? "" : `/${l}`);
  const urlFor = (l) => `${SITE_URL}${prefix(l)}${path === "/" ? "" : path}`;

  const canonical = urlFor(locale);
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const ogLocale = locale === "es" ? "es_ES" : "en_US";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />
      {(locales || []).map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={urlFor(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlFor(defaultLocale)} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Iggy NP" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={ogLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
