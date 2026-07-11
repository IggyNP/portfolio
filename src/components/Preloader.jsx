import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MIN_MS = 1000; // mínimo visible para que no parpadee
const MAX_MS = 6000; // tope de seguridad: nunca se cuelga aunque la red vaya mal
const SESSION_KEY = "iggynp_loaded";
// Vídeos que deben poder reproducirse antes de descubrir la web.
const VIDEO_SELECTORS = ["#home video", "#contact video"];

const OVERLAY_CLASS =
  "fixed inset-0 z-[9999] flex items-center justify-center bg-[#191825]";

function Logo({ shimmer }) {
  return (
    <div className="relative">
      <img
        src="/images/inp.png"
        alt="IggyNP"
        width={371}
        height={157}
        className="w-32 select-none"
        draggable={false}
      />
      {shimmer && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage: "url(/images/inp.png)",
            maskImage: "url(/images/inp.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            background:
              "linear-gradient(100deg, transparent 35%, rgba(48,227,202,0.85) 50%, transparent 65%)",
            backgroundSize: "250% 100%",
          }}
          animate={{ backgroundPosition: ["150% 0%", "-150% 0%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

/**
 * Preloader de entrada con el logo INP (latido + barrido de brillo) mientras
 * el vídeo del hero se prepara.
 *
 * Tres estados para evitar flashes:
 *  - "pending": overlay estático (se renderiza en SSR/primer paint, cubre todo).
 *  - "showing": overlay animado dentro de AnimatePresence → al cerrarse hace
 *    el fundido de 0.6s (solo la 1ª visita real de la sesión).
 *  - "hidden":  desaparece. Desde "pending" (visita repetida) se va al instante,
 *    sin fundido, porque el estático no pasa por AnimatePresence.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [state, setState] = useState("pending");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setState("hidden");
      return;
    }

    setState("showing");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = Date.now();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (Date.now() - start));
      setTimeout(() => setState("hidden"), wait);
    };

    const maxT = setTimeout(finish, MAX_MS);

    // Esperar a que TODOS los vídeos puedan reproducir; el tope los cubre si
    // alguno tarda demasiado (cada uno tiene póster, así que nunca queda negro).
    let remaining = VIDEO_SELECTORS.length;
    const pollTimers = [];
    const oneReady = () => {
      remaining -= 1;
      if (remaining <= 0) finish();
    };

    VIDEO_SELECTORS.forEach((selector) => {
      // Sondeo hasta que el <video> exista (Welcome/ContactScene montan con retardo)
      const hook = () => {
        const video = document.querySelector(selector);
        if (!video) {
          pollTimers.push(setTimeout(hook, 100));
          return;
        }
        if (video.readyState >= 4) oneReady(); // cargado para reproducir sin cortes
        else video.addEventListener("canplaythrough", oneReady, { once: true });
      };
      hook();
    });

    return () => {
      clearTimeout(maxT);
      pollTimers.forEach(clearTimeout);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Restaurar scroll y marcar la sesión al ocultarse
  useEffect(() => {
    if (state === "hidden") {
      document.body.style.overflow = "";
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, [state]);

  return (
    <>
      {state === "pending" && (
        <div className={OVERLAY_CLASS}>
          <Logo shimmer={false} />
        </div>
      )}
      <AnimatePresence>
        {state === "showing" && (
          <motion.div
            key="preloader"
            className={OVERLAY_CLASS}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Logo shimmer={!reduced} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
