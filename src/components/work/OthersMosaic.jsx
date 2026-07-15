import { PROJECTS, OTHER_PROJECTS } from "./projects";

/* --------------------------------------------------------------------------
   Fondo del mosaico "Y muchos más…": varias filas de miniaturas en marquee
   (direcciones y velocidades distintas) bajo un velo oscuro con tinte de marca,
   y el texto centrado encima.

   Rellena su contenedor (hijos con `absolute`), así que el contenedor debe ser
   `relative`/posicionado, con tamaño fijo y `overflow-hidden`. En el cubo se
   monta dentro de una capa rotada 180° para que se lea derecho al bascular.
   -------------------------------------------------------------------------- */

// Pool: capturas de los proyectos principales (import estático → .src) + las de
// "otros proyectos" (ruta pública .webp). Las que falten se ocultan (onError).
const MOSAIC_IMGS = [
  ...PROJECTS.map((p) => p.img.src),
  ...OTHER_PROJECTS.map((p) => p.img),
];

// Barajado determinista (mulberry32): idéntico en SSR y cliente (sin desajuste
// de hidratación) y distinto por semilla → cada fila lleva su propio orden y no
// se alinean nunca las mismas imágenes.
function shuffle(arr, seed) {
  const a = [...arr];
  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MOSAIC_ROWS = [
  { top: 40, reverse: false, dur: 30, imgs: shuffle(MOSAIC_IMGS, 0x1111) },
  { top: 174, reverse: true, dur: 26, imgs: shuffle(MOSAIC_IMGS, 0x9a3b) },
  { top: 308, reverse: false, dur: 34, imgs: shuffle(MOSAIC_IMGS, 0xf00d) },
];

function Row({ top, reverse, dur, imgs }) {
  return (
    <div className="absolute left-0 flex overflow-hidden" style={{ top }}>
      <div
        className="flex shrink-0 gap-3"
        style={{
          animation: `marq ${dur}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...imgs, ...imgs].map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="h-[92px] w-[150px] shrink-0 rounded-md object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default function OthersMosaic({ lead, accent }) {
  return (
    <>
      {MOSAIC_ROWS.map((row, i) => (
        <Row key={i} {...row} />
      ))}
      {/* Velo oscuro (legibilidad) + tinte de marca (cohesión por tema). Sin
          backdrop-filter: dentro del preserve-3d del cubo puede romper la
          composición 3D de la cara. */}
      <div className="absolute inset-0 bg-[#0a0e17]/75" />
      <div className="absolute inset-0 bg-[#FC5185]/12 dark:bg-[#2ee6b6]/12" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="px-12 text-center font-heading text-6xl font-bold leading-tight text-white">
          {lead}{" "}
          <span className="text-[#FC5185] dark:text-[#2ee6b6]">{accent}</span>
        </span>
      </div>
    </>
  );
}
