# SEO / Lanzamiento público — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer el portfolio indexable y con buenas tarjetas de compartir (Open Graph/Twitter), datos estructurados, sitemap y `hreflang`, sin cambiar el diseño.

**Architecture:** Un componente `<Seo>` reutilizable centraliza los metadatos por página (title/description/OG/Twitter/canonical/hreflang). `_document` sirve el `lang` real por idioma y deja de bloquear buscadores. Un route dinámico genera `sitemap.xml` desde los datos de proyectos. La `og:image` de la home es una card estática 1200×630 generada desde un HTML versionado en el repo.

**Tech Stack:** Next.js 13.5 (Pages Router, JS), next-i18next (en/es, default en), next-themes, Tailwind, Vercel. Sin dependencias nuevas.

## Global Constraints

- JavaScript, NO TypeScript. Next 13.5 Pages Router. NO subir versiones de dependencias ni añadir paquetes.
- Comentarios de código y commits en español, formato `tipo(scope): descripción`.
- Trabajar en la rama `develop`. NO hacer push ni deploy salvo la Tarea 7 (requiere OK de Iggy).
- NUNCA leer, imprimir ni modificar `.env.local`.
- No hay suite de tests: la verificación de cada tarea es `npm run lint` (0 errores/0 avisos) + `npm run build` (exit 0) + los checks concretos que indique la tarea (curl/grep). El repo tiene `.npmrc` con `legacy-peer-deps=false`.
- Constantes fijas (verbatim del spec):
  - `SITE_URL = "https://iggynp.com"`
  - Locales: `["en","es"]`, default `"en"` (en sin prefijo, es bajo `/es`).
  - Posicionamiento: **Frontend Engineer** (en EN y ES).
  - Copy Home EN — Title: `Iggy NP · Frontend Engineer` · Desc: `Frontend engineer building fast, animated web apps with Next.js & React. Portfolio of Ignacio Navarro (IggyNP).`
  - Copy Home ES — Title: `Iggy NP · Frontend Engineer` · Desc: `Frontend engineer especializado en interfaces web rápidas y animadas con Next.js y React. Portfolio de Ignacio Navarro (IggyNP).`
- **Nota de estado:** el logo del Navbar (`src/components/layout/Navbar.jsx`) YA cambia según tema (`inp.png` oscuro / `inp-b.png` claro). El favicon por tema queda como follow-up opcional fuera de este plan.

## Estructura de ficheros

- Crear: `scripts/og/og-home.html` (fuente de la card), `public/images/og/og-home.png` (export), `src/components/seo/Seo.jsx`, `src/pages/sitemap.xml.js`.
- Modificar: `src/pages/index.js`, `src/components/work/ProjectDetail.jsx`, `src/pages/_document.js`, `public/robots.txt`, `src/pages/success/index.js`, `src/pages/maintenance/index.js`, `public/locales/en/common.json`, `public/locales/es/common.json`.
- Ops (fuera del repo, Tarea 7): dominio `www` + redirect en Vercel, DNS en Porkbun, deploy a producción.

---

### Task 1: Generar la og:image de la home (card R2)

**Files:**
- Create: `scripts/og/og-home.html`
- Create: `public/images/og/og-home.png`

**Interfaces:**
- Produces: fichero estático `public/images/og/og-home.png` (1200×630), referenciado por `<Seo>` como imagen por defecto en la Tarea 2.

- [ ] **Step 1: Crear el HTML fuente de la card**

Create `scripts/og/og-home.html` (fuentes por ruta relativa al repo para poder regenerarla):

```html
<!doctype html><html><head><meta charset="utf-8">
<style>
@font-face{font-family:'Poppins';src:url('../../src/fonts/poppins-700.woff2') format('woff2');font-weight:700}
@font-face{font-family:'DM Sans';src:url('../../src/fonts/dm-sans-400.woff2') format('woff2');font-weight:400}
@font-face{font-family:'DM Sans';src:url('../../src/fonts/dm-sans-500.woff2') format('woff2');font-weight:500}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden}
.card{width:1200px;height:630px;position:relative;overflow:hidden;background:#191825;color:#fff;font-family:'DM Sans',sans-serif}
.g1{position:absolute;width:820px;height:820px;border-radius:50%;filter:blur(150px);opacity:.34;background:radial-gradient(circle,#30e3ca,transparent 68%);top:-340px;right:-200px}
.frame{position:absolute;inset:40px;border:1.5px solid rgba(48,227,202,.30);border-radius:26px}
.cn{position:absolute;width:34px;height:34px;border:3px solid #30e3ca}
.tl{top:40px;left:40px;border-right:0;border-bottom:0;border-top-left-radius:26px}
.tr{top:40px;right:40px;border-left:0;border-bottom:0;border-top-right-radius:26px}
.bl{bottom:40px;left:40px;border-right:0;border-top:0;border-bottom-left-radius:26px}
.br{bottom:40px;right:40px;border-left:0;border-top:0;border-bottom-right-radius:26px}
.content{position:absolute;inset:40px;padding:66px;display:flex;flex-direction:column;justify-content:space-between}
.logo{height:60px;width:auto;align-self:flex-start;opacity:.95}
.name{font-family:'Poppins';font-weight:700;font-size:140px;line-height:.98;letter-spacing:-5px}
.name .dot{color:#30e3ca}
.role{font-family:'DM Sans';font-weight:500;font-size:38px;color:#30e3ca;margin-top:22px;letter-spacing:.5px}
.foot{display:flex;justify-content:space-between;align-items:center;font-family:'DM Sans';font-weight:400;font-size:29px;color:#8b8ba0}
</style></head>
<body><div class="card">
 <div class="g1"></div>
 <div class="frame"></div>
 <div class="cn tl"></div><div class="cn tr"></div><div class="cn bl"></div><div class="cn br"></div>
 <div class="content">
  <img class="logo" src="../../public/images/inp.png">
  <div>
   <div class="name">Iggy NP<span class="dot">.</span></div>
   <div class="role">Frontend Engineer</div>
  </div>
  <div class="foot"><span>iggynp.com</span><span>Frontend · UI · Motion</span></div>
 </div>
</div></body></html>
```

- [ ] **Step 2: Renderizar la card a PNG 1200×630**

```bash
mkdir -p public/images/og
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 \
  --screenshot="$PWD/public/images/og/og-home.png" \
  "file://$PWD/scripts/og/og-home.html"
```

- [ ] **Step 3: Verificar dimensiones**

Run: `sips -g pixelWidth -g pixelHeight public/images/og/og-home.png`
Expected: `pixelWidth: 1200` y `pixelHeight: 630`.

- [ ] **Step 4: Commit**

```bash
git add scripts/og/og-home.html public/images/og/og-home.png
git commit -m "feat(seo): og:image de la home (card Iggy NP, 1200x630)"
```

---

### Task 2: Componente `<Seo>` + metadatos de la home + JSON-LD

**Files:**
- Create: `src/components/seo/Seo.jsx`
- Modify: `src/pages/index.js`
- Modify: `public/locales/en/common.json`
- Modify: `public/locales/es/common.json`

**Interfaces:**
- Consumes: `public/images/og/og-home.png` (Tarea 1).
- Produces: componente `Seo({ title, description, image?, noindex? })`. `image` por defecto `"/images/og/og-home.png"`. Lo usan la home (esta tarea) y `ProjectDetail` (Tarea 5).

- [ ] **Step 1: Crear el componente `<Seo>`**

Create `src/components/seo/Seo.jsx`:

```jsx
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
```

- [ ] **Step 2: Añadir las claves de copy a los locales**

En `public/locales/en/common.json`, añadir dos claves (respetando el JSON existente):

```json
"SEO_HOME_TITLE": "Iggy NP · Frontend Engineer",
"SEO_HOME_DESC": "Frontend engineer building fast, animated web apps with Next.js & React. Portfolio of Ignacio Navarro (IggyNP)."
```

En `public/locales/es/common.json`:

```json
"SEO_HOME_TITLE": "Iggy NP · Frontend Engineer",
"SEO_HOME_DESC": "Frontend engineer especializado en interfaces web rápidas y animadas con Next.js y React. Portfolio de Ignacio Navarro (IggyNP)."
```

- [ ] **Step 3: Usar `<Seo>` + JSON-LD en la home**

Reemplazar en `src/pages/index.js` el bloque `<Head><title>…</title></Head>` por `<Seo>` y el JSON-LD `Person`. Fichero resultante:

```jsx
import Seo from "@/components/seo/Seo";
import Navbar from "@/components/layout/Navbar";
import Intro from "@/components/intro/Intro";
import Work from "@/components/work/Work";
import Contact from "@/components/contact/Contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// JSON-LD Person: ayuda a Google a asociar el sitio con la identidad de Iggy
// (objetivo "que al buscar mi nombre salga el portfolio").
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ignacio Navarro",
  alternateName: "IggyNP",
  jobTitle: "Frontend Engineer",
  url: "https://iggynp.com",
  sameAs: [
    "https://github.com/IggyNP",
    "https://www.linkedin.com/in/ignacio-navarro-poves/",
  ],
};

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t("SEO_HOME_TITLE")} description={t("SEO_HOME_DESC")} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
      />
      <Navbar />
      <Intro />
      <Work />
      <Contact />
    </>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
```

- [ ] **Step 4: Verificar lint + build**

Run: `npm run lint` → 0/0. Run: `npm run build` → exit 0.

- [ ] **Step 5: Verificar los metadatos en runtime**

```bash
npm run dev &   # arranca en :3000 (o el puerto que indique)
sleep 6
curl -s http://localhost:3000/ | grep -ioE "<title>[^<]*</title>|og:image[^>]*|canonical[^>]*|application/ld\+json"
curl -s http://localhost:3000/es | grep -ioE "hreflang=\"es\"[^>]*"
kill %1
```
Expected: `<title>Iggy NP · Frontend Engineer</title>`, un `og:image` con `og-home.png`, un `canonical` a `https://iggynp.com`, el `ld+json`, y el `hreflang="es"` apuntando a `https://iggynp.com/es`.

- [ ] **Step 6: Commit**

```bash
git add src/components/seo/Seo.jsx src/pages/index.js public/locales/en/common.json public/locales/es/common.json
git commit -m "feat(seo): componente Seo (OG/Twitter/hreflang/canonical) + metadatos y JSON-LD en la home"
```

---

### Task 3: Sitemap dinámico

**Files:**
- Create: `src/pages/sitemap.xml.js`

**Interfaces:**
- Consumes: `PROJECTS` de `@/data/projects`.
- Produces: ruta `/sitemap.xml`. La Tarea 4 la referencia en `robots.txt`.

- [ ] **Step 1: Crear el route del sitemap**

Create `src/pages/sitemap.xml.js`:

```jsx
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
```

- [ ] **Step 2: Verificar lint + build**

Run: `npm run lint` → 0/0. Run: `npm run build` → exit 0.

- [ ] **Step 3: Verificar el XML en runtime**

```bash
npm run dev &
sleep 6
curl -s http://localhost:3000/sitemap.xml | head -c 400
kill %1
```
Expected: XML válido con `<urlset …>`, la home en `https://iggynp.com` y `https://iggynp.com/es`, y las 6 páginas de proyecto (`/project/ior`, `/es/proyecto/ior`, …) con sus `xhtml:link` alternates.

- [ ] **Step 4: Commit**

```bash
git add src/pages/sitemap.xml.js
git commit -m "feat(seo): sitemap.xml dinámico (home + proyectos, en/es con hreflang)"
```

---

### Task 4: Indexabilidad — quitar noindex, robots y `lang` por idioma

**Files:**
- Modify: `src/pages/_document.js`
- Modify: `public/robots.txt`

**Interfaces:**
- Consumes: la ruta `/sitemap.xml` (Tarea 3) para referenciarla en robots.

- [ ] **Step 1: `_document.js` — quitar noindex y servir `lang` real**

Reemplazar `src/pages/_document.js` por (quita el `<meta robots noindex>` y añade `getInitialProps` para el `lang`):

```jsx
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

function MyDocument({ locale }) {
  return (
    <Html lang={locale || "en"}>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  return { ...initialProps, locale: ctx.locale || "en" };
};

export default MyDocument;
```

- [ ] **Step 2: `robots.txt` — permitir rastreo + sitemap**

Reemplazar `public/robots.txt` por:

```
# Sitio indexable. Sitemap dinámico en /sitemap.xml.
User-agent: *
Allow: /

Sitemap: https://iggynp.com/sitemap.xml
```

- [ ] **Step 3: Verificar lint + build**

Run: `npm run lint` → 0/0. Run: `npm run build` → exit 0.

- [ ] **Step 4: Verificar en runtime que NO hay noindex y el lang cambia**

```bash
npm run dev &
sleep 6
curl -s http://localhost:3000/     | grep -io "noindex" || echo "OK: home sin noindex"
curl -s http://localhost:3000/     | grep -io "<html lang=\"[a-z]*\""
curl -s http://localhost:3000/es   | grep -io "<html lang=\"[a-z]*\""
kill %1
```
Expected: home sin `noindex`, `<html lang="en"` en `/` y `<html lang="es"` en `/es`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/_document.js public/robots.txt
git commit -m "feat(seo): indexable (fuera noindex), lang por idioma y robots con sitemap"
```

---

### Task 5: SEO de páginas de proyecto + noindex en success/maintenance

**Files:**
- Modify: `src/components/work/ProjectDetail.jsx`
- Modify: `src/pages/success/index.js`
- Modify: `src/pages/maintenance/index.js`

**Interfaces:**
- Consumes: `Seo` (Tarea 2), `getProject(slug)` y `p.hero` de `@/data/projects`.

- [ ] **Step 1: Usar `<Seo>` en `ProjectDetail` (cubre /project y /proyecto)**

En `src/components/work/ProjectDetail.jsx`, sustituir el import y el bloque `<Head>`.

Cambiar la línea `import Head from "next/head";` por:
```jsx
import Seo from "@/components/seo/Seo";
```

Sustituir el bloque:
```jsx
      <Head>
        <title>{`IggyNP | ${p.title}`}</title>
      </Head>
```
por (title con la marca nueva, description desde el overview i18n, og:image = la captura del proyecto):
```jsx
      <Seo
        title={`${p.title} · Iggy NP`}
        description={t(`${K}_OVERVIEW`)}
        image={p.hero}
      />
```

(`p.hero` es del tipo `/images/projects/<slug>.webp`; `<Seo>` lo convierte en URL absoluta. Caveat WebP: si en la verificación live (Tarea 7) alguna plataforma no lo renderiza, cambiar `image={p.hero}` por dejar el default `og-home.png`.)

- [ ] **Step 2: `noindex` en success y maintenance**

En `src/pages/success/index.js`, añadir dentro del JSX devuelto, como primer elemento, un Head con noindex. Añadir el import `import Head from "next/head";` si no está, y al principio del return:
```jsx
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
```

Hacer lo mismo en `src/pages/maintenance/index.js` (añadir `import Head from "next/head";` si falta y el mismo bloque `<Head>` al principio del JSX devuelto).

- [ ] **Step 3: Verificar lint + build**

Run: `npm run lint` → 0/0. Run: `npm run build` → exit 0.

- [ ] **Step 4: Verificar metadatos de un proyecto en runtime**

```bash
npm run dev &
sleep 6
curl -s http://localhost:3000/project/ior | grep -ioE "<title>[^<]*</title>|og:image[^>]*ior[^>]*"
curl -s http://localhost:3000/success      | grep -io "noindex" && echo "OK: success noindex"
kill %1
```
Expected: `<title>IOR · Iggy NP</title>`, un `og:image` con `.../images/projects/ior.webp`, y `noindex` presente en `/success`.

- [ ] **Step 5: Commit**

```bash
git add src/components/work/ProjectDetail.jsx src/pages/success/index.js src/pages/maintenance/index.js
git commit -m "feat(seo): metadatos por proyecto (title/desc/og) y noindex en success/maintenance"
```

---

### Task 6: Revisión global (verificación previa al deploy)

**Files:** ninguno (solo verificación; corregir en la tarea correspondiente si algo falla).

- [ ] **Step 1: Build limpio y checklist de cobertura**

Run: `npm run lint` → 0/0. Run: `npm run build` → exit 0.

Comprobar en un `npm run dev` que:
- La home tiene: `<title>` nuevo, `meta description`, `og:image` (og-home.png), `canonical`, `hreflang` en/es/x-default, `twitter:card=summary_large_image`, `ld+json` Person. SIN `noindex`.
- `/es` sirve `<html lang="es">` y `canonical`/`og:url` con `/es`.
- Una página de proyecto tiene su `og:image` propia y title `«… · Iggy NP»`.
- `/sitemap.xml` responde XML; `/robots.txt` permite y referencia el sitemap.
- `/success` y `/maintenance` tienen `noindex`.

- [ ] **Step 2: (No hay commit; si algo falla, arreglar en su tarea y recommitear.)**

---

### Task 7: Lanzamiento (ops + deploy) — REQUIERE OK DE IGGY

> Esta tarea toca producción y DNS. NO ejecutar sin visto bueno explícito de Iggy. Es un runbook, no cambia código del repo.

- [ ] **Step 1: Deploy a producción**

Desde la raíz del repo, con `develop` al día:
```bash
vercel --prod
```
Confirmar que el deploy queda `READY` y aliaseado a `iggynp.com`.

- [ ] **Step 2: `www.iggynp.com` → apex (redirect 308)**

En el dashboard de Vercel (proyecto `portfolio` → Settings → Domains): añadir `www.iggynp.com` y configurarlo como **Redirect** a `iggynp.com` (308). Vercel indicará el registro DNS necesario; crear en Porkbun el `CNAME www` que pida (o `ALIAS/A` según indique). Ver [[iggynp-dns-porkbun-vercel]].

- [ ] **Step 3: Verificación live**

```bash
curl -s https://iggynp.com/ | grep -io "noindex" || echo "OK: sin noindex en prod"
curl -s https://iggynp.com/robots.txt
curl -s https://iggynp.com/sitemap.xml | head -c 300
curl -sI https://www.iggynp.com | grep -iE "location|HTTP/"
```
Expected: sin `noindex`; robots con `Allow: /` + Sitemap; sitemap XML; `www` responde 308 con `location: https://iggynp.com/`.

- [ ] **Step 4: Validadores de compartición e indexación**

Comprobar manualmente:
- LinkedIn Post Inspector y X Card Validator con `https://iggynp.com` → tarjeta con la card `og-home.png`, title y description correctos.
- Prueba real: pegar el enlace en WhatsApp → tarjeta correcta.
- Rich Results Test / validador Schema.org → `Person` detectado.
- (Opcional) Dar de alta el sitio en Google Search Console y enviar `sitemap.xml`.

- [ ] **Step 5: Actualizar memoria**

Anotar en la memoria del proyecto que el sitio pasó a **indexable** (fecha), la card OG y el redirect www, para futuras sesiones.

---

## Follow-ups fuera de este plan

- Favicon dinámico por tema (soporte parcial de navegador; requiere generar un segundo set de iconos desde `inp.png`/`inp-b.png`).
- Cards OG diseñadas a medida por proyecto (hoy usan su captura `.webp`).
- 2º ciclo de brainstorming: contenido nuevo (blog / CV / case studies) y, si se quiere medir, Vercel Analytics + Speed Insights.
