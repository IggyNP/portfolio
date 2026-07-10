import { useEffect, useState } from "react";

const VIDEO_SRC = "/videos/contact-bg.mp4";
const POSTER_SRC = "/images/contact-bg.webp";

/**
 * Fondo de la sección de contacto: cinemagraph en vídeo (loop) con poster
 * estático como carga/fallback. Con `prefers-reduced-motion` solo poster.
 */
export default function ContactScene() {
  const [reduced, setReduced] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src={POSTER_SRC}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
      {!reduced && (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
