// Fuente única de datos de la sección Work.
//
// Cada proyecto principal es un "caso de estudio": los campos neutros de idioma
// viven aquí; la prosa (overview / reto / solución / features) va en i18n bajo
// el prefijo `key` (p. ej. IOR_OVERVIEW, IOR_CHALLENGE…). Consumido por el cubo
// (WorkGallery), el mosaico de la tapa (OthersMosaic) y las páginas de detalle
// (ProjectDetail via /project/[slug] y /proyecto/[slug]).
import portfolio from "public/images/portfolio.png";
import ior from "public/images/ior.png";
import mbDreamLiving from "public/images/mbdreamliving.png";
import drivelandMotorsport from "public/images/drivelandMotorsport.png";
import cofradia from "public/images/cofradia.png";
import uncleIggy from "public/images/uncleiggy.png";

export const PROJECTS = [
  {
    slug: "uncle-iggy",
    key: "UNCLEIGGY",
    title: "Uncle Iggy",
    category: "Astro",
    tech: [
      "Astro",
      "TypeScript",
      "Node.js",
      "SQLite",
      "Caddy",
      "Stripe",
      "Clerk",
      "Resend",
      "Vitest",
    ],
    img: uncleIggy,
    hero: "/images/projects/uncleiggy.webp",
    liveUrl: "https://uncleiggyworld.com",
    codeUrl: null,
    status: "live",
  },
  {
    slug: "cofradia",
    key: "COFRADIA",
    title: "Cofradía Divina Pastora",
    category: "Next.js",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Sanity CMS",
      "Clerk",
      "Neon Postgres",
      "Tailwind + shadcn",
      "Resend",
    ],
    img: cofradia,
    hero: "/images/projects/cofradia.webp",
    liveUrl: "https://hermandad-divina-pastora.vercel.app",
    codeUrl: null,
    status: "wip",
  },
  {
    slug: "mb-dream-living",
    key: "MBDREAMLIVING",
    title: "MB Dream Living",
    category: "WordPress",
    tech: ["WordPress", "Elementor", "CSS", "JavaScript", "PHP"],
    img: mbDreamLiving,
    hero: "/images/projects/mb-dream-living.webp",
    liveUrl: "https://mbdreamliving.com",
    codeUrl: null,
    status: "live",
  },
  {
    slug: "ior",
    key: "IOR",
    title: "IOR",
    category: "WordPress",
    tech: ["WordPress", "Elementor", "CSS", "jQuery"],
    img: ior,
    hero: "/images/projects/ior.webp",
    liveUrl: "https://oncorosell.com",
    codeUrl: null,
    status: "live",
  },
  {
    slug: "portfolio",
    key: "PORTFOLIO",
    title: "My Portfolio",
    category: "Next.js",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "i18next"],
    img: portfolio,
    hero: "/images/projects/portfolio.webp",
    liveUrl: null,
    codeUrl: "https://github.com/IggyNP/portfolio",
    status: "live",
  },
  {
    slug: "driveland-motorsport",
    key: "DRIVELANDM",
    title: "Driveland Motorsport",
    category: "WordPress",
    tech: ["WordPress", "Elementor", "CSS"],
    img: drivelandMotorsport,
    hero: "/images/projects/drivelandm.webp",
    liveUrl: "https://drivelandmotorsport.es",
    codeUrl: null,
    status: "live",
  },
];

// Ruta localizada al detalle: /project/<slug> (en) · /proyecto/<slug> (es).
export const projectHref = (slug, locale) =>
  `${locale === "es" ? "/proyecto" : "/project"}/${slug}`;

// Devuelve un proyecto por slug (para las páginas de detalle).
export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);

export const OTHER_PROJECTS = [
  { name: "AMMDE", url: "https://ammde.es", img: "/images/others/ammde.webp" },
  { name: "Driveland Events", url: "https://driveland.es", img: "/images/others/driveland-events.webp" },
  { name: "Driveland Garage", url: "https://www.drivelandgarage.es", img: "/images/others/driveland-garage.webp" },
  { name: "La Cañada Golf", url: "https://lacanadagolf.com", img: "/images/others/lacanada-golf.webp" },
  { name: "We Tangible", url: "https://wetangible.com", img: "/images/others/we-tangible.webp" },
  { name: "Smart & City", url: "https://smartandcity.com", img: "/images/others/smart-city.webp" },
  { name: "Bornsouth Studio", url: "https://bornsouthstudio.com", img: "/images/others/bornsouth-studio.webp" },
  { name: "Dillepasa", url: "https://dillepasa.com", img: "/images/others/dillepasa.webp" },
  { name: "QTI", url: "https://quenet-torrent.com", img: "/images/others/qti.webp" },
  { name: "We Klimax", url: "https://weklimax.com", img: "/images/others/we-klimax.webp" },
  { name: "Pangaea Oncology", url: "https://panoncology.com", img: "/images/others/pangaea-oncology.webp" },
];
