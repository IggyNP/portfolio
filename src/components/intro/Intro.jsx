import React, { useEffect, useRef, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { useTranslation } from "next-i18next";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useTheme } from "next-themes";
import DynamicAdjective from "./DynamicAdjective";
import AboutContent from "./AboutContent";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Capa del hero (vídeo + textos + indicador de scroll). Los `*Style` son
// motion values opcionales; sin ellos queda estático (reduced-motion).
// `onCue`: si se pasa, el indicador "Scroll"/flecha pasa a ser un botón que
// dispara la transición hacia adelante (mismo efecto que un gesto de scroll).
function HeroLayer({
  t,
  resolvedTheme,
  i18n,
  videoStyle,
  textStyle,
  hintStyle,
  onCue,
}) {
  // Vídeo específico por tema: claro (fondo blanco + cubos rosa) / oscuro.
  const videoSrc =
    resolvedTheme === "dark"
      ? "/videos/hero-bg.mp4"
      : "/videos/hero-bg-light.mp4";
  // Póster (1er frame) para pintado instantáneo y buen LCP en móvil.
  const posterSrc =
    resolvedTheme === "dark"
      ? "/videos/hero-bg-poster.webp"
      : "/videos/hero-bg-light-poster.webp";
  const cueLabel = i18n?.language === "es" ? "Ir a Sobre Mí" : "Go to About";
  return (
    <>
      <motion.video
        key={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        aria-hidden="true"
        style={videoStyle}
      >
        <source src={videoSrc} type="video/mp4" />
      </motion.video>

      {/* Velo por tema (más fuerte en móvil para legibilidad sobre el vídeo). */}
      <div className="absolute inset-0 z-[1] bg-white/60 dark:bg-[#191825]/80 md:bg-white/40 md:dark:bg-[#191825]/75" />
      {/* Scrim vertical solo en móvil: ancla el texto sin lavar el vídeo. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/5 via-transparent to-black/25 dark:from-black/25 dark:to-black/45 md:hidden" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_30%,rgba(48,227,202,0.06),transparent_60%)]" />

      <motion.div className="relative z-10 w-full" style={textStyle}>
        <motion.div
          key={`${resolvedTheme}-${i18n.language}`}
          className="mx-auto flex w-full max-w-[1240px] select-none flex-col items-center px-6 text-center [text-shadow:0_1px_14px_rgba(0,0,0,0.28)] md:[text-shadow:none]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="mb-3 text-sm tracking-widest text-[#FC5185] dark:text-[#30E3CA] sm:mb-2 sm:text-base"
          >
            {t("WELCOME_HELLO")}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold tracking-tight sm:text-7xl"
          >
            IGGY NP
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="mt-3 max-w-[20rem] whitespace-pre-line text-xl font-semibold leading-snug text-[#4b5563] dark:text-[#8892b0] sm:mt-2 sm:max-w-[700px] sm:text-5xl sm:leading-tight sm:text-[#8892b0]"
          >
            {t("WELCOME_INFO_PART1")} <DynamicAdjective />{" "}
            {t("WELCOME_INFO_PART2")}
          </motion.h2>
        </motion.div>
      </motion.div>

      <motion.div
        className={`absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 select-none md:bottom-8 ${
          onCue ? "" : "pointer-events-none"
        }`}
        style={hintStyle}
      >
        {onCue ? (
          <motion.button
            type="button"
            onClick={onCue}
            aria-label={cueLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="pointer-events-auto flex cursor-pointer flex-col items-center gap-2 rounded-md p-2 text-[#FC5185] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5185] dark:text-[#30E3CA] dark:focus-visible:ring-[#30E3CA]"
          >
            <span className="font-heading text-[14px] font-medium uppercase tracking-[0.3em] opacity-70">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <HiChevronDoubleDown size={34} />
            </motion.span>
          </motion.button>
        ) : (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col items-center gap-2 text-[#FC5185] dark:text-[#30E3CA]"
          >
            <span className="font-heading text-[14px] font-medium uppercase tracking-[0.3em] opacity-70">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <HiChevronDoubleDown size={34} />
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

// Escena unificada: buceo en el vídeo → crossfade a About (patrón WorkGallery).
export default function Intro() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // reduced-motion Y móvil: apilado estático (hero + About), sin pin ni
  // crossfade. La escena interactiva (buceo de vídeo con zoom + blur) es pesada
  // y desorientadora en el móvil (y bloquear el scroll ahí perjudica la
  // accesibilidad).
  if (reduced || isMobile) {
    return (
      <>
        <section
          id="home"
          className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
        >
          {mounted && (
            <HeroLayer t={t} resolvedTheme={resolvedTheme} i18n={i18n} />
          )}
        </section>
        <section
          id="about"
          className="flex min-h-screen w-full items-center overflow-hidden py-20"
        >
          {mounted && <AboutContent />}
        </section>
      </>
    );
  }

  return (
    <DesktopScene
      t={t}
      resolvedTheme={resolvedTheme}
      i18n={i18n}
      mounted={mounted}
    />
  );
}

// Escena desktop "trigger-by-time" (patrón hafner-studio HeroScroll). El
// progreso `p` (0→1) NO sigue la posición de scroll: se anima por tiempo. Un
// gesto/tecla/clic dispara la transición ENTERA con el scroll pineado; al
// completar se suelta y el usuario continúa a Work. Hacia arriba (en la vista
// de About, arriba del todo) la reproduce en reversa.
//
// VIVE EN SU PROPIO COMPONENTE a propósito: sus efectos y su controlador se
// montan de cero cada vez que se entra en desktop, así el estado nunca se
// corrompe al conmutar móvil↔desktop por resize.
function DesktopScene({ t, resolvedTheme, i18n, mounted }) {
  // Fuente única del progreso (antes era `scrollYProgress`; ahora la mueve el
  // controlador por tiempo). Todos los efectos de abajo son VERBATIM del diseño
  // scroll-driven previo: solo cambia de dónde leen.
  const progress = useMotionValue(0);
  const apiRef = useRef(null);

  const videoScale = useTransform(progress, [0, 0.6], [1, 2.6]);
  const videoBlurPx = useTransform(progress, [0.3, 0.6], [0, 6]);
  const videoFilter = useMotionTemplate`blur(${videoBlurPx}px)`;
  const heroTextOpacity = useTransform(progress, [0, 0.28], [1, 0]);
  const heroTextScale = useTransform(progress, [0, 0.5], [1, 1.5]);
  const scrollHintOpacity = useTransform(progress, [0, 0.1], [1, 0]);
  const heroLayerOpacity = useTransform(progress, [0.45, 0.62], [1, 0]);
  const aboutOpacity = useTransform(progress, [0.5, 0.68], [0, 1]);
  // About crece de pequeño a grande (lo encontramos al final del zoom).
  const aboutScale = useTransform(progress, [0.48, 0.9], [0.6, 1]);
  // Progreso que alimenta el efecto de la foto (glow/zoom/marco) al acercarse.
  const revealProgress = useTransform(progress, [0.5, 0.92], [0, 1]);
  // Punteros: evitar que capas invisibles roben clics.
  const heroPointer = useTransform(progress, (p) => (p > 0.4 ? "none" : "auto"));
  const aboutPointer = useTransform(progress, (p) =>
    p > 0.5 ? "auto" : "none"
  );

  useEffect(() => {
    if (!mounted) return undefined;

    // Duración de la reproducción por gesto. Un gesto pequeño reproduce toda la
    // transición en ~1.6s; la curva la pone `ease` (easeInOut).
    const DUR = 1.6; // segundos
    // Anti-trap: solo un flick MUY agresivo (mucho delta en una ventana corta)
    // salta directo al final; un scroll normal deja correr los ~1.6s.
    const SNAP_WINDOW = 150; // ms: solo cuenta el delta tan pronto tras iniciar
    const SNAP_DELTA = 900; // px de |wheel| acumulado en la ventana → saltar
    const TOUCH_SNAP_DELTA = 220; // px de swipe acumulado → saltar
    const IDLE_GAP = 200; // ms de quietud que termina un gesto (resetea acumulador)
    const ABSORB_IDLE = 180; // ms de quietud tras completar → soltar el scroll

    let locked = false; // scroll pineado mientras se reproduce
    let pinY = 0; // posición capturada al pinear (objetivo del clamp)
    let targetVal = 0; // destino del tween en curso (0 ó 1)
    let current = null; // animación framer en vuelo
    let raf = 0; // rAF del clamp de scroll (solo activo mientras locked)
    let safety = 0; // watchdog: garantiza que el pin nunca se quede pegado
    let touchY = 0;
    // Absorción de la cola del gesto tras completar hacia adelante.
    let absorbing = false;
    let absorbIdle = 0;
    // Acumulador de delta en ventana corta (decide el salto anti-trap).
    let accum = 0;
    let winStart = 0;
    let lastEvt = 0;
    let accDir = 0;

    // Señal para que el Navbar sepa que puede delegar "INICIO"/"INFO" en la
    // escena (en móvil/reduced no está montada → nav con anclajes normales).
    window.__introInteractive = true;

    const p = () => progress.get();
    const atTop = () => window.scrollY <= 0;

    // Bloqueo del scroll nativo: el hero es una "puerta". Mientras p<1 (o se
    // absorbe la cola de un gesto) el documento no scrollea, así NINGÚN método
    // (arrastre de selección, scrollbar, autoscroll, rueda) puede saltarse la
    // animación de About y caer directo en Work. La única forma de avanzar es
    // disparar la transición (rueda/touch/teclado/clic en el cue). Con la barra
    // ya oculta globalmente, alternar overflow no provoca saltos de layout.
    const applyScrollLock = () => {
      const want = progress.get() < 1 || absorbing ? "hidden" : "";
      const el = document.documentElement;
      if (el.style.overflow !== want) el.style.overflow = want;
    };

    const feed = (mag, dir, threshold) => {
      const now = performance.now();
      if (now - lastEvt > IDLE_GAP || dir !== accDir) {
        winStart = now;
        accum = 0;
        accDir = dir;
      }
      lastEvt = now;
      if (now - winStart <= SNAP_WINDOW) accum += mag;
      return accum >= threshold;
    };

    const clearSafety = () => {
      if (safety) {
        window.clearTimeout(safety);
        safety = 0;
      }
    };
    // Clamp real del scroll: mientras `locked`, devuelve la ventana a `pinY`
    // cada frame (lo que scrollbar-drag y scrollTo no pueden burlar). Solo corre
    // mientras locked, así que se auto-cura en cuanto se libera.
    const startClamp = () => {
      if (raf) return;
      const tick = () => {
        if (locked && window.scrollY !== pinY) window.scrollTo(0, pinY);
        raf = locked ? requestAnimationFrame(tick) : 0;
      };
      raf = requestAnimationFrame(tick);
    };
    const unlock = () => {
      locked = false;
      accum = 0;
      accDir = 0;
      clearSafety();
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      applyScrollLock();
      syncListeners();
    };

    const stopAbsorb = () => {
      absorbing = false;
      if (absorbIdle) {
        window.clearTimeout(absorbIdle);
        absorbIdle = 0;
      }
      applyScrollLock();
      syncListeners();
    };
    const bumpAbsorb = () => {
      if (!absorbing) return;
      if (absorbIdle) window.clearTimeout(absorbIdle);
      absorbIdle = window.setTimeout(stopAbsorb, ABSORB_IDLE);
    };
    const beginAbsorb = () => {
      absorbing = true;
      applyScrollLock();
      bumpAbsorb();
    };

    const lock = () => {
      if (locked) return;
      locked = true;
      pinY = window.scrollY;
      startClamp();
      applyScrollLock();
      clearSafety();
      // Aunque se pierda un frame o un evento, el pin se fuerza a soltar poco
      // después de que el tween debería haber acabado.
      safety = window.setTimeout(() => {
        if (current) current.stop();
        current = null;
        progress.set(targetVal);
        unlock();
        if (targetVal === 1) beginAbsorb();
      }, DUR * 1000 + 1500);
    };

    // Lanza el tween por tiempo hacia `v` (0 ó 1) con el scroll pineado.
    const runTo = (v, onDone) => {
      if (current) current.stop();
      lock();
      targetVal = v;
      current = animate(progress, v, {
        duration: DUR,
        ease: "easeInOut",
        onComplete: () => {
          current = null;
          unlock();
          if (onDone) onDone();
        },
      });
    };
    const startForward = () => {
      if (p() >= 1) return;
      if (locked && targetVal === 1) return; // ya vamos hacia adelante
      runTo(1, beginAbsorb);
    };
    const startReverse = () => {
      if (p() <= 0) return;
      if (locked && targetVal === 0) return; // ya vamos hacia atrás
      runTo(0, null);
    };
    // Salto instantáneo (flick agresivo / teclado): sin tween.
    const snapTo = (v) => {
      if (current) current.stop();
      current = null;
      progress.set(v);
      targetVal = v;
      unlock();
    };

    // --- Manejadores de intención ---------------------------------------
    const onWheel = (e) => {
      const dy = e.deltaY;
      if (absorbing) {
        e.preventDefault();
        bumpAbsorb();
        return;
      }
      if (dy > 0) {
        if (p() < 1) {
          e.preventDefault();
          startForward();
          if (feed(Math.abs(dy), 1, SNAP_DELTA)) {
            snapTo(1);
            beginAbsorb();
          }
        }
      } else if (dy < 0) {
        if (atTop() && p() > 0) {
          e.preventDefault();
          startReverse();
          if (feed(Math.abs(dy), -1, SNAP_DELTA)) snapTo(0);
        }
      }
    };

    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? 0;
      winStart = performance.now();
      accum = 0;
      accDir = 0;
    };
    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? touchY;
      const dy = touchY - y; // >0 = swipe arriba = scroll abajo
      touchY = y;
      if (absorbing) {
        e.preventDefault();
        bumpAbsorb();
        return;
      }
      if (Math.abs(dy) < 2) return;
      if (dy > 0) {
        if (p() < 1) {
          e.preventDefault();
          startForward();
          if (feed(dy, 1, TOUCH_SNAP_DELTA)) {
            snapTo(1);
            beginAbsorb();
          }
        }
      } else if (atTop() && p() > 0) {
        e.preventDefault();
        startReverse();
        if (feed(-dy, -1, TOUCH_SNAP_DELTA)) snapTo(0);
      }
    };

    const FWD_KEYS = new Set([
      "PageDown",
      "End",
      " ",
      "Spacebar",
      "ArrowDown",
      "ArrowRight",
    ]);
    const REV_KEYS = new Set(["PageUp", "Home", "ArrowUp", "ArrowLeft"]);
    const onKeyDown = (e) => {
      // Nunca secuestrar la navegación por teclado: si el foco está en la
      // página (o el usuario tabula), completar y soltar para no atrapar.
      const focused =
        document.activeElement &&
        document.activeElement !== document.body &&
        document.activeElement !== document.documentElement;
      if (e.key === "Tab" || focused) {
        if (p() < 1 && p() > 0) snapTo(p() < 0.5 ? 0 : 1);
        return;
      }
      if (FWD_KEYS.has(e.key)) {
        if (p() < 1) {
          e.preventDefault();
          snapTo(1);
        }
      } else if (REV_KEYS.has(e.key)) {
        if (atTop() && p() > 0) {
          e.preventDefault();
          snapTo(0);
        }
      }
    };

    // Navegación: "INICIO"/"INFO" del Navbar disparan un estado de la escena.
    const onGoto = (e) => {
      const tgt = e.detail?.target ?? 1;
      window.scrollTo(0, 0);
      if (tgt === 1) startForward();
      else startReverse();
    };
    // Nav a secciones de abajo (Work/Contact): el documento puede estar
    // bloqueado en el hero (p<1). Dejar la escena en su estado final (About) y
    // desbloquear al instante para que el desplazamiento a la sección funcione.
    const onRelease = () => {
      if (p() < 1) snapTo(1);
    };

    // Si la ventana pierde foco o se oculta la pestaña a mitad de pase, no dejar
    // el pin puesto — asentar al destino y soltar.
    const settleAndRelease = () => {
      if (locked) {
        if (current) current.stop();
        current = null;
        progress.set(targetVal);
        unlock();
      }
    };
    const onBlur = () => {
      settleAndRelease();
      stopAbsorb();
    };
    const onVisibility = () => {
      if (document.hidden) {
        settleAndRelease();
        stopAbsorb();
      }
    };

    // Perf: los listeners no-pasivos (wheel/touchmove) rompen el scroll pasivo,
    // así que solo se enganchan cuando pueden disparar o hay pase en curso.
    let activeAttached = false;
    const attachActive = () => {
      if (activeAttached) return;
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      activeAttached = true;
    };
    const detachActive = () => {
      if (!activeAttached) return;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      activeAttached = false;
    };
    const relevant = () =>
      absorbing || locked || (p() > 0 && p() < 1) || window.scrollY <= 2;
    function syncListeners() {
      if (relevant()) attachActive();
      else detachActive();
    }
    const onScroll = () => syncListeners();

    apiRef.current = { startForward, startReverse };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("intro:goto", onGoto);
    window.addEventListener("intro:release", onRelease);
    // Si la escena se monta con la página ya bajada (resize móvil→desktop
    // estando en Work, o scroll restaurado al recargar), el hero ya quedó
    // atrás: arrancar en About (p=1) sin bloquear. Si no, se bloquearía el
    // documento a media página sin listeners que lo suelten.
    if (window.scrollY > 0) progress.set(1);
    syncListeners();
    // Estado inicial: hero (p=0) → documento bloqueado hasta disparar About.
    applyScrollLock();

    return () => {
      detachActive();
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("intro:goto", onGoto);
      window.removeEventListener("intro:release", onRelease);
      if (current) current.stop();
      if (raf) cancelAnimationFrame(raf);
      clearSafety();
      if (absorbIdle) window.clearTimeout(absorbIdle);
      absorbing = false;
      locked = false;
      apiRef.current = null;
      // Restaurar el scroll del documento (nunca dejar la página bloqueada al
      // desmontar / navegar a otra página).
      document.documentElement.style.overflow = "";
      if (window.__introInteractive) delete window.__introInteractive;
    };
  }, [mounted, progress]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {mounted && (
        <>
          {/* Capa hero: bucea y se disuelve */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: heroLayerOpacity, pointerEvents: heroPointer }}
          >
            <HeroLayer
              t={t}
              resolvedTheme={resolvedTheme}
              i18n={i18n}
              videoStyle={{ scale: videoScale, filter: videoFilter }}
              textStyle={{ opacity: heroTextOpacity, scale: heroTextScale }}
              hintStyle={{ opacity: scrollHintOpacity }}
              onCue={() => apiRef.current?.startForward()}
            />
          </motion.div>

          {/* Capa About: emerge (crossfade) en el centro */}
          <motion.div
            id="about"
            className="absolute inset-0 flex items-center bg-[#f8f8f8] dark:bg-[#191825]"
            style={{
              opacity: aboutOpacity,
              scale: aboutScale,
              pointerEvents: aboutPointer,
            }}
          >
            <AboutContent revealProgress={revealProgress} />
          </motion.div>
        </>
      )}
    </section>
  );
}
