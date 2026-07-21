import { PROJECTS } from "@/data/projects";

const SITE_URL = "https://iggynp.com";
const LOCALES = ["en", "es"];
const DEFAULT = "en";

// Cada "entry" es una página canónica; su ruta cambia por idioma (project vs
// proyecto). Se emite una <url> por idioma con sus <xhtml:link> alternates.
const ENTRIES = [
  { type: "home" },
  ...PROJECTS.map((p) => ({ type: "project", slug: p.slug })),
];

function pathFor(loc, entry) {
  if (entry.type === "home") return "";
  return loc === "es" ? `/proyecto/${entry.slug}` : `/project/${entry.slug}`;
}

function urlFor(loc, entry) {
  const prefix = loc === DEFAULT ? "" : `/${loc}`;
  return `${SITE_URL}${prefix}${pathFor(loc, entry)}`;
}

function buildSitemap() {
  const urls = ENTRIES.flatMap((entry) =>
    LOCALES.map((loc) => {
      const alternates = LOCALES.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l, entry)}"/>`
      ).join("");
      const xdefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT, entry)}"/>`;
      return `<url><loc>${urlFor(loc, entry)}</loc>${alternates}${xdefault}</url>`;
    })
  ).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
