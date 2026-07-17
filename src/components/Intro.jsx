import React, { useEffect, useRef, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { useTranslation } from "next-i18next";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
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
function HeroLayer({ t, resolvedTheme, i18n, videoStyle, textStyle, hintStyle }) {
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
          className="mx-auto flex w-full max-w-[1240px] flex-col items-center px-6 text-center [text-shadow:0_1px_14px_rgba(0,0,0,0.28)] md:[text-shadow:none]"
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
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 md:bottom-8"
        style={hintStyle}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-[#FC5185] dark:text-[#30E3CA]"
        >
          <span className="font-heading text-[11px] font-medium uppercase tracking-[0.3em] opacity-70">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <HiChevronDoubleDown size={20} />
          </motion.span>
        </motion.div>
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
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: reduced ? undefined : sectionRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.6], [1, 2.6]);
  const videoBlurPx = useTransform(scrollYProgress, [0.3, 0.6], [0, 6]);
  const videoFilter = useMotionTemplate`blur(${videoBlurPx}px)`;
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const heroTextScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroLayerOpacity = useTransform(scrollYProgress, [0.45, 0.62], [1, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.5, 0.68], [0, 1]);
  // About crece de pequeño a grande (lo encontramos al final del zoom).
  const aboutScale = useTransform(scrollYProgress, [0.48, 0.9], [0.6, 1]);
  // Progreso que alimenta el efecto de la foto (glow/zoom/marco) al acercarse.
  const revealProgress = useTransform(scrollYProgress, [0.5, 0.92], [0, 1]);

  // reduced-motion Y móvil: apilado estático (hero + About), sin pin ni
  // crossfade. La escena fijada de 260vh (buceo de vídeo con zoom + blur) es
  // pesada y desorientadora en el móvil (y los 100vh fijados fallan con la
  // barra dinámica de iOS Safari).
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
    <section ref={sectionRef} id="home" className="relative h-[260vh] w-full">
      {/* Ancla de nav: About cae aquí (donde ya está revelada) */}
      <div id="about" className="absolute left-0" style={{ top: "58%" }} />

      {mounted && (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Capa hero: bucea y se disuelve */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: heroLayerOpacity }}
          >
            <HeroLayer
              t={t}
              resolvedTheme={resolvedTheme}
              i18n={i18n}
              videoStyle={{ scale: videoScale, filter: videoFilter }}
              textStyle={{ opacity: heroTextOpacity, scale: heroTextScale }}
              hintStyle={{ opacity: scrollHintOpacity }}
            />
          </motion.div>

          {/* Capa About: emerge (crossfade) en el centro */}
          <motion.div
            className="absolute inset-0 flex items-center bg-[#f8f8f8] dark:bg-[#191825]"
            style={{ opacity: aboutOpacity, scale: aboutScale }}
          >
            <AboutContent revealProgress={revealProgress} />
          </motion.div>
        </div>
      )}
    </section>
  );
}
