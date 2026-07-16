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

// Reparte las imágenes en 3 conjuntos DISJUNTOS (por índice i%3, para que cada
// uno quede bien mezclado): cada imagen vive en una sola fila. Al no compartir
// ninguna imagen entre filas, es IMPOSIBLE que coincida la misma en dos filas a
// la vez, sea cual sea la dirección, el desfase o la velocidad. Eso permite que
// la fila central vaya en sentido opuesto sin romper la garantía.
const MOSAIC_BASE = shuffle(MOSAIC_IMGS, 0x51e7);
const ROW_SETS = [[], [], []];
MOSAIC_BASE.forEach((src, i) => ROW_SETS[i % 3].push(src));

// Misma velocidad lineal en las 3: la duración es proporcional al nº de
// miniaturas de la fila (px/segundo idéntico aunque los conjuntos difieran).
const SEC_PER_TILE = 2;
const MOSAIC_ROWS = [
  { top: 40, imgs: ROW_SETS[0], reverse: false },
  { top: 174, imgs: ROW_SETS[1], reverse: true }, // central: sentido opuesto
  { top: 308, imgs: ROW_SETS[2], reverse: false },
];

function Row({ top, imgs, reverse }) {
  const dur = imgs.length * SEC_PER_TILE;
  return (
    <div className="absolute left-0 flex overflow-hidden" style={{ top }}>
      {/* Sin `gap`: el espaciado va como `mr` en cada miniatura para que el
          paso sea exactamente 162px (150 + 12) y el -50% coincida con una copia
          entera → bucle sin salto. */}
      <div
        className="flex shrink-0"
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
            className="mr-3 h-[92px] w-[150px] shrink-0 rounded-md object-cover"
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
