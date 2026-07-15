// Fuente única de datos de la sección Work.
import portfolio from "public/images/portfolio.png";
import calculator from "public/images/calculator.png";
import weatherApp from "public/images/weather-app.png";
import ior from "public/images/ior.png";
import sotoBp from "public/images/sotobp.png";
import ammde from "public/images/ammde.png";
import drivelandMotorsport from "public/images/drivelandMotorsport.png";

export const PROJECTS = [
  {
    title: "My Portfolio",
    img: portfolio,
    tech: "React JS · Next.js · Tailwind",
    url: "/portfolio",
    category: "React",
    featured: true,
  },
  {
    title: "IOR",
    img: ior,
    tech: "WordPress · Elementor",
    url: "/ior",
    category: "WordPress",
  },
  {
    title: "Soto BP",
    img: sotoBp,
    tech: "WordPress · Elementor",
    url: "/soto-bp",
    category: "WordPress",
  },
  {
    title: "Weather App",
    img: weatherApp,
    tech: "React JS · Tailwind",
    url: "/weather-app",
    category: "React",
  },
  {
    title: "Driveland Motorsport",
    img: drivelandMotorsport,
    tech: "WordPress · Elementor",
    url: "/driveland-motorsport",
    category: "WordPress",
  },
  {
    title: "AMMDE",
    img: ammde,
    tech: "WordPress · Elementor",
    url: "/ammde",
    category: "WordPress",
  },
  {
    title: "Calculator App",
    img: calculator,
    tech: "React JS",
    url: "/calculator",
    category: "React",
  },
];

// `img`: captura de la web en /public/images/others/<slug>.webp (thum.io,
// convertidas con cwebp). El mosaico oculta las que no existan (onError), así
// que para sustituir una basta con reemplazar su .webp —sin tocar código—.
export const OTHER_PROJECTS = [
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
