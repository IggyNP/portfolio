# SEO / Lanzamiento público — Diseño

**Fecha:** 2026-07-21
**Proyecto:** iggynp.com (Next.js 13.5 Pages Router, next-i18next EN/ES, next-themes, Vercel)
**Estado:** Diseño aprobado (alcance) por Iggy. Pendiente de revisión del spec escrito.

## Objetivo

Convertir el portfolio (hoy **live pero `noindex`**) en un sitio indexable y que se comparta bien. Dos metas priorizadas por Iggy:

- **A) Marca/identidad:** que al buscar "Ignacio Navarro" / "IggyNP" el portfolio sea el resultado. NO perseguir keywords frías.
- **C) Compartir:** que al pegar el enlace en LinkedIn/WhatsApp/X salga una tarjeta con imagen, título y descripción.

**Posicionamiento profesional (decidido):** **Frontend Engineer**, orientado a empleo frontend. El término "Frontend Engineer" se usa en EN y ES por consistencia de marca.

## Criterios de éxito

1. El HTML servido NO contiene `noindex`; `robots.txt` permite rastreo y referencia al sitemap.
2. Compartir `https://iggynp.com` en LinkedIn/WhatsApp muestra la tarjeta OG (diseño R2) + título + descripción.
3. Las páginas `/es/...` sirven `<html lang="es">` (hoy está fijo en `"en"`).
4. Un validador de datos estructurados detecta el `Person` (Ignacio Navarro / IggyNP / Frontend Engineer).
5. `hreflang` en/es/x-default y `canonical` presentes en cada página indexable.
6. `www.iggynp.com` redirige al apex `iggynp.com`.
7. `sitemap.xml` accesible y referenciado en `robots.txt`.

## Copy (bloqueado)

**Home**
- EN — Title: `Iggy NP · Frontend Engineer`
  Desc: `Frontend engineer building fast, animated web apps with Next.js & React. Portfolio of Ignacio Navarro (IggyNP).`
- ES — Title: `Iggy NP · Frontend Engineer`
  Desc: `Frontend engineer especializado en interfaces web rápidas y animadas con Next.js y React. Portfolio de Ignacio Navarro (IggyNP).`

Los textos de las páginas de proyecto se derivan de `src/data/projects.js` (nombre del proyecto + descripción corta ya existente), con el patrón `«<Proyecto> · Iggy NP»` como title.

## Diseño de la og:image

- **Home:** tarjeta 1200×630 "R2" ya validada visualmente: fondo `#191825`, glow teal, marco redondeado con esquinas acentuadas (guiño al logo INP en cuadros), logo `inp.png` (blanco), **"Iggy NP."** en Poppins 700 con punto teal, **"Frontend Engineer"** en teal (`#30e3ca`), footer `iggynp.com` / `Frontend · UI · Motion`. Tipografías = las `.woff2` reales del sitio (`src/fonts/`).
- **Producción:** export estático a `public/images/og/og-home.png` (generado con Chrome headless a partir del HTML de la tarjeta; el HTML fuente se guarda en el repo para regenerarlo).
- **Páginas de proyecto:** usan su captura existente `public/images/projects/<slug>.webp` como `og:image` propia. Caveat: algunas plataformas (p.ej. X) no renderizan WebP fiablemente; si en verificación falla, la página de proyecto cae a `og-home.png`. Generar cards por proyecto queda fuera de alcance (2º ciclo).

## Componentes y cambios

### 1. Indexabilidad
- `src/pages/_document.js`: quitar `<meta name="robots" content="noindex, nofollow" />`.
- `public/robots.txt`: `User-agent: * / Allow: /` + `Sitemap: https://iggynp.com/sitemap.xml`.

### 2. Componente `<Seo>` reutilizable
- Nuevo `src/components/seo/Seo.jsx`. Props: `title`, `description`, `image` (ruta absoluta, default `og-home.png`), `type`. Rellena en `<Head>`: `<title>`, `meta description`, Open Graph (`og:title/description/image/url/type/locale`), Twitter (`summary_large_image`), `canonical` y `hreflang` alternates.
- URLs: `SITE_URL = "https://iggynp.com"`. Canonical y alternates se construyen con `useRouter()` (`asPath`, `locale`, `locales`, `defaultLocale`). `x-default` apunta al `defaultLocale`.
- Se usa en `src/pages/index.js` y en las páginas de detalle (`src/pages/project/[slug].js` y `src/pages/proyecto/[slug].js`). Quita el `<title>` hardcodeado actual de `index.js`.
- `success`/`maintenance` reciben `noindex` explícito (no deben indexarse).

### 3. `<html lang>` por idioma
- `src/pages/_document.js`: añadir `Document.getInitialProps` que lea `ctx.locale` (o `ctx.__NEXT_DATA__.locale`) y renderizar `<Html lang={locale ?? "en"}>`. Hoy está fijo en `"en"`.

### 4. Datos estructurados (JSON-LD `Person`)
En `index.js`, `<script type="application/ld+json">` con:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ignacio Navarro",
  "alternateName": "IggyNP",
  "jobTitle": "Frontend Engineer",
  "url": "https://iggynp.com",
  "sameAs": [
    "https://github.com/IggyNP",
    "https://www.linkedin.com/in/ignacio-navarro-poves/"
  ]
}
```

### 5. Sitemap
- Nuevo `src/pages/sitemap.xml.js` con `getServerSideProps` que genera el XML sin dependencias nuevas: home + cada proyecto de `src/data/projects.js`, en `en` y `es`, con `<xhtml:link rel="alternate" hreflang>` por entrada. Sin fechas dinámicas problemáticas (omitir `<lastmod>` o fijarlo por deploy).

### 6. Branding dinámico por tema
- **Logo en la web:** donde se pinte el logo INP, servir `inp.png` (tema oscuro) / `inp-b.png` (tema claro) según `next-themes` (clase `dark`) — vía `<img>` con clases `dark:`/`block hidden`, no por JS de estado (evita parpadeo/hydration).
- **Favicon por tema (opcional dentro de alcance):** `<link rel="icon" media="(prefers-color-scheme: dark)">` + variante clara. Requiere generar un segundo set de favicons desde `inp.png`/`inp-b.png`. Soporte de navegador parcial (Chrome/Firefox sí, Safari no); si el coste no compensa, se omite sin bloquear el resto.

### 7. Redirect `www` → apex
- Añadir `www.iggynp.com` como dominio en Vercel con **redirect 308 al apex** `iggynp.com`. Implica un registro DNS (CNAME `www` → Vercel) en Porkbun. Acción de ops (no de código); se documenta en el plan.

## Fuera de alcance (YAGNI / 2º ciclo)

- Blog / contenido nuevo y keywords frías (es el 2º ciclo de brainstorming).
- Generación dinámica de OG con `next/og` (una card estática basta).
- Analítica (Vercel Analytics/Speed Insights) — trivial de añadir si Iggy lo pide, pero no en este paquete.
- Cards OG por proyecto diseñadas a medida.

## Verificación

- `curl -s https://<deploy> | grep -i robots` → sin `noindex`.
- Compartir el enlace en LinkedIn Post Inspector / X Card Validator / WhatsApp real → tarjeta correcta.
- Validador Schema.org / Rich Results → `Person` detectado.
- Ver `<html lang>` en `/` y en `/es`.
- `https://iggynp.com/sitemap.xml` responde XML; `robots.txt` lo referencia.
- `https://www.iggynp.com` → 308 → `https://iggynp.com`.

## Archivos afectados (estimado)

- Modificar: `src/pages/_document.js`, `public/robots.txt`, `src/pages/index.js`, `src/pages/project/[slug].js`, `src/pages/proyecto/[slug].js`, `public/locales/{en,es}/common.json` (claves SEO), y el/los componentes donde se pinta el logo INP.
- Crear: `src/components/seo/Seo.jsx`, `src/pages/sitemap.xml.js`, `public/images/og/og-home.png` (+ HTML fuente de la card), posibles favicons por tema.
- Ops (fuera del repo): dominio `www` + redirect en Vercel, registro DNS en Porkbun.
