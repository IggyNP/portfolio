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

export const OTHER_PROJECTS = [
  { name: "Driveland Events", url: "https://driveland.es" },
  { name: "We Tangible", url: "https://wetangible.com" },
  { name: "Boda Sofía y Rafa", url: "https://bodasofiayrafa.com" },
  { name: "Gustum Areas", url: "https://gustumareas.com" },
  { name: "Smart & City", url: "https://smartandcity.com" },
  { name: "El Quinto Alimento", url: "https://elquintoalimento.com" },
  { name: "Dillepasa", url: "https://dillepasa.com" },
  { name: "QTI", url: "https://quenet-torrent.com" },
  { name: "We Klimax", url: "https://weklimax.com" },
  { name: "Pangaea Oncology", url: "https://panoncology.com" },
];
