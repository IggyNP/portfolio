import { motion } from "framer-motion";

/* --------------------------------------------------------------------------
   Fondo de "malla de gradiente animada": blobs de marca (rosa/teal) que fluyen
   lento sobre fondo oscuro, estilo Stripe/Linear. Los `children` se centran y
   flotan suavemente encima.

   Guardado de la propuesta 2 del lab de la cara "Y muchos más…" por si se
   reutiliza en el futuro. Rellena su contenedor (o dale tamaño desde fuera).

   Uso:
     <GradientMeshCard className="h-[440px] w-[440px]">
       <span className="font-heading text-6xl font-bold text-white">
         Y muchos <span className="text-[#FC5185] dark:text-[#2ee6b6]">más…</span>
       </span>
     </GradientMeshCard>
   -------------------------------------------------------------------------- */

const BLOBS = [
  { color: "#2ee6b6", size: 260, from: { x: -60, y: -50 }, to: { x: 40, y: 30 }, dur: 9 },
  { color: "#FC5185", size: 220, from: { x: 90, y: 60 }, to: { x: -40, y: -30 }, dur: 11 },
  { color: "#12b3a0", size: 300, from: { x: 30, y: 90 }, to: { x: -30, y: -60 }, dur: 13 },
  { color: "#7cf5dc", size: 180, from: { x: -80, y: 70 }, to: { x: 60, y: -40 }, dur: 8 },
];

export default function GradientMeshCard({ children, float = true, className = "" }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#0a0e17] ${className}`}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: "50%",
            top: "50%",
            marginLeft: -b.size / 2,
            marginTop: -b.size / 2,
            background: b.color,
            filter: "blur(60px)",
            opacity: 0.7,
          }}
          animate={{
            x: [b.from.x, b.to.x, b.from.x],
            y: [b.from.y, b.to.y, b.from.y],
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {children != null && (
        <motion.div
          className="absolute inset-0 grid place-items-center px-10 text-center"
          animate={float ? { y: [0, -10, 0] } : undefined}
          transition={
            float
              ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
