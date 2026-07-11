import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/contact-bg.mp4";
const POSTER_SRC = "/images/contact-bg.webp";

/**
 * Fondo de la sección de contacto: cinemagraph en vídeo (loop) con poster
 * estático de base. Con `prefers-reduced-motion` solo poster.
 */
export default function ContactScene() {
  const [reduced, setReduced] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Chrome pausa el autoplay de los vídeos fuera de pantalla. Este observer
  // arranca la reproducción justo cuando la sección entra a la vista (así no
  // "tarda en reproducir" al llegar) y la pausa al salir para ahorrar CPU.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      // rootMargin adelanta el arranque 300px antes de entrar en pantalla,
      // así al llegar ya está reproduciéndose (sin retardo perceptible).
      { threshold: 0, rootMargin: "300px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Poster de base (instantáneo y fallback para reduced-motion) */}
      <img
        src={POSTER_SRC}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
      {/* Vídeo siempre visible; su propio poster cubre hasta tener fotogramas */}
      {!reduced && (
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
