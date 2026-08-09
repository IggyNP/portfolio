import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { RiRadioButtonFill } from "react-icons/ri";
import { PROJECTS, OTHER_PROJECTS, projectHref } from "@/data/projects";
import OthersMosaic from "./OthersMosaic";

const N = PROJECTS.length; // 6
const W = 440; // ancho de cara (px)
const H = 248; // alto (16:9)
const DEPTH = W / 2; // translateZ de las caras laterales
// Fases de scroll (en vh), independientes para poder alargar el intro (más
// scroll antes de que aparezca el cubo) y el basculado (reveal "Y muchos más…")
// sin cambiar el ritmo por proyecto.
const INTRO_VH = 180; // scroll del intro antes de que aparezca el cubo
const SEG_VH = 90; // rotación: scroll por proyecto
const TILT_VH = 120; // basculado que revela la cara superior + panel "otras webs"
const HOLD_VH = 80; // dwell sobre "Y tantos más…" antes de soltar a la sección siguiente
const HEIGHT_VH = INTRO_VH + N * SEG_VH + TILT_VH + HOLD_VH; // alto total de la sección
const TSPLIT = INTRO_VH / HEIGHT_VH; // fin del intro (aparece el cubo)
const TEND = (INTRO_VH + N * SEG_VH) / HEIGHT_VH; // fin rotación Y / inicio basculado
const TREVEAL = (INTRO_VH + N * SEG_VH + TILT_VH) / HEIGHT_VH; // basculado → hold
const Y_TOTAL = -(N - 1) * 90; // rotación Y total de los proyectos
const TILT_DEG = -90; // basculado que revela la cara superior

const FACE_ROT = [0, 90, 180, 270];
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Proyecto que muestra la cara física `f` en el paso `s` (solo cambia contenido
// cuando la cara está a 180°, oculta → sin parpadeos).
const faceProject = (f, s) => clamp(f + 4 * Math.round((s - f) / 4), 0, N - 1);

function IntroText({ t }) {
  return (
    <>
      <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#FC5185] dark:text-[#2ee6b6]">
        {t("WORK_LABEL")}
      </p>
      <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-6xl sm:leading-[1.05] lg:text-7xl">
        {t("WORK_INTRO_LEAD")}{" "}
        <span className="text-[#FC5185] dark:text-[#2ee6b6]">
          {t("WORK_INTRO_ACCENT")}
        </span>
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:mt-6 sm:text-lg">
        {t("WORK_SUBTITLE")}
      </p>
      {/* El indicador de scroll solo tiene sentido con el cubo (desktop). */}
      <div className="mt-14 hidden items-center gap-3 text-slate-400 dark:text-slate-600 md:flex">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.3em]">
          {t("WORK_SCROLL")}
        </span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ↓
        </motion.span>
      </div>
    </>
  );
}

// Lista de otras webs (2 columnas), reutilizada en el panel y en el fallback.
function OtherProjectsList() {
  return (
    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
      {OTHER_PROJECTS.map((p) => (
        <li key={p.url}>
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 py-2.5 text-slate-600 transition-colors hover:text-[#FC5185] active:text-[#FC5185] dark:text-slate-300 dark:hover:text-[#2ee6b6] dark:active:text-[#2ee6b6] sm:py-1.5"
          >
            <RiRadioButtonFill
              size={11}
              className="shrink-0 text-[#FC5185] dark:text-[#2ee6b6]"
            />
            <span className="underline-offset-2 group-hover:underline group-active:underline">
              {p.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const panelMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.4, ease: "easeOut" },
};

function InfoPanel({ step, t, locale }) {
  const p = PROJECTS[step];
  return (
    <motion.div key="info" className="relative" {...panelMotion}>
      <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-[#FC5185] dark:text-[#2ee6b6]">
        {t("WORK_PROJECTS_LABEL")}
      </p>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="font-heading text-2xl font-bold tabular-nums text-slate-400 dark:text-slate-500">
          {String(step + 1).padStart(2, "0")}
        </span>
        <span className="text-sm text-slate-400 dark:text-slate-600">
          / {String(N).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-3 min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h3 className="font-heading text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              {p.title}
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {p.tech.join(" · ")}
            </p>
            <Link
              href={projectHref(p.slug, locale)}
              className="group mt-6 inline-flex items-center gap-3 font-heading text-[17px] font-semibold text-gray-900 transition-all hover:gap-5 hover:text-[#FC5185] dark:text-[#f2f5fa] dark:hover:text-[#2ee6b6]"
            >
              {t("WORK_VIEW_PROJECT")}
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FC5185] text-xl text-white transition-transform group-hover:scale-110 dark:bg-[#2ee6b6] dark:text-[#0a0e17]">
                <HiArrowUpRight />
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex gap-2">
        {PROJECTS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step
                ? "w-7 bg-[#FC5185] dark:bg-[#2ee6b6]"
                : "w-1.5 bg-slate-300 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function OthersPanel({ t }) {
  return (
    <motion.div key="others" {...panelMotion}>
      <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-[#FC5185] dark:text-[#2ee6b6]">
        {t("WORK_LABEL")}
      </p>
      <h3 className="mt-3 max-w-md font-heading text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl">
        {t("WORK_OTHERS_SOME")}
      </h3>
      <div className="mt-6">
        <OtherProjectsList />
      </div>
    </motion.div>
  );
}

function GridFallback({ t, locale }) {
  return (
    <div className="mx-auto max-w-[1240px] px-6 py-14 sm:py-20">
      <div className="mb-10 sm:mb-12">
        <IntroText t={t} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <Link
            key={p.title}
            href={projectHref(p.slug, locale)}
            className="group block overflow-hidden rounded-2xl ring-1 ring-black/5 transition-transform duration-300 active:scale-[0.98] motion-reduce:transition-none dark:ring-white/10"
          >
            <div className="relative aspect-[16/11] overflow-hidden sm:aspect-[16/10]">
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <h3 className="truncate font-heading font-bold text-slate-900 transition-colors group-hover:text-[#FC5185] group-active:text-[#FC5185] dark:text-white dark:group-hover:text-[#2ee6b6] dark:group-active:text-[#2ee6b6]">
                  {p.title}
                </h3>
                <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                  {p.tech.join(" · ")}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FC5185]/10 text-[#FC5185] transition-transform group-hover:translate-x-0.5 dark:bg-[#2ee6b6]/10 dark:text-[#2ee6b6]"
              >
                <HiArrowUpRight />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Otras webs */}
      <div className="mt-16">
        <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
          {t("OTHER_PROJECTS")}
        </h3>
        <div className="mt-6 max-w-xl">
          <OtherProjectsList />
        </div>
      </div>
    </div>
  );
}

export default function WorkGallery() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);
  const [interactive, setInteractive] = useState(false);
  const [showOthers, setShowOthers] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Intro se desvanece y sube; el cubo aparece (fade + escala).
  const introOpacity = useTransform(scrollYProgress, [0, TSPLIT * 0.75], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, TSPLIT], [0, -60]);
  const cubeOpacity = useTransform(
    scrollYProgress,
    [TSPLIT * 0.5, TSPLIT],
    [0, 1]
  );
  const cubeScale = useTransform(
    scrollYProgress,
    [TSPLIT * 0.5, TSPLIT],
    [0.9, 1]
  );
  // Rotación Y (proyectos) y basculado X (revela la cara superior al final).
  const rawRotate = useTransform(scrollYProgress, [TSPLIT, TEND], [0, Y_TOTAL]);
  const rotateY = useSpring(rawRotate, { stiffness: 120, damping: 30 });
  const rawTiltX = useTransform(scrollYProgress, [TEND, TREVEAL], [0, TILT_DEG]);
  const rotateX = useSpring(rawTiltX, { stiffness: 120, damping: 30 });
  const barScaleX = useTransform(scrollYProgress, [TSPLIT, TREVEAL], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const cp = clamp((p - TSPLIT) / (TEND - TSPLIT), 0, 1);
    setStep(clamp(Math.round(cp * (N - 1)), 0, N - 1));
    setInteractive(p >= TSPLIT * 0.6);
    // El panel cambia cuando el basculado supera el 40% (rango [TEND, TREVEAL]).
    setShowOthers(p >= TEND + (TREVEAL - TEND) * 0.4);
  });

  if (reduced) return <GridFallback t={t} locale={locale} />;

  return (
    <>
      {/* Desktop: intro → cubo scroll-driven → basculado a "otras webs" */}
      <section
        ref={sectionRef}
        style={{ height: `${HEIGHT_VH}vh` }}
        className="relative hidden md:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* barra de progreso */}
          <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-slate-200 dark:bg-white/10">
            <motion.div
              style={{ scaleX: barScaleX }}
              className="h-full origin-left bg-[#FC5185] dark:bg-[#2ee6b6]"
            />
          </div>

          {/* Intro (se desvanece al scrollear) */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="pointer-events-none absolute inset-0 flex items-center"
          >
            <div className="mx-auto w-full max-w-[1240px] px-6">
              <IntroText t={t} />
            </div>
          </motion.div>

          {/* Cubo + panel (se revela) */}
          <motion.div
            style={{
              opacity: cubeOpacity,
              pointerEvents: interactive ? "auto" : "none",
            }}
            className="absolute inset-0 flex items-center"
          >
            <div className="mx-auto grid w-full max-w-[1240px] items-center gap-x-12 px-6 lg:grid-cols-[3fr_2fr]">
              {/* Cubo */}
              <div
                className="relative flex items-center justify-center"
                style={{ perspective: 1400 }}
              >
                <div
                  className="pointer-events-none absolute rounded-full bg-[#FC5185]/50 blur-[90px] dark:bg-[#2ee6b6]/25"
                  style={{ width: W, height: W }}
                />
                <motion.div
                  className="relative [transform-style:preserve-3d]"
                  style={{ width: W, height: H, rotateX, rotateY, scale: cubeScale }}
                >
                  {FACE_ROT.map((rot, f) => {
                    const p = PROJECTS[faceProject(f, step)];
                    return (
                      <Link
                        key={f}
                        href={projectHref(p.slug, locale)}
                        aria-label={p.title}
                        className="group/face absolute inset-0 block overflow-hidden bg-[#FC5185] ring-1 ring-black/10 dark:bg-[#2ee6b6] dark:ring-white/15"
                        style={{
                          transform: `rotateY(${rot}deg) translateZ(${DEPTH}px)`,
                        }}
                      >
                        <Image
                          src={p.img}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/face:scale-[1.04]"
                          sizes="440px"
                          priority={f === 0}
                          style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                        />
                        <div
                          className="absolute inset-0 ring-1 ring-inset ring-[#FC5185]/40 transition-colors group-hover/face:ring-[#FC5185] dark:ring-[#2ee6b6]/40 dark:group-hover/face:ring-[#2ee6b6]"
                          style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                        />
                      </Link>
                    );
                  })}

                  {/* Cara superior "Y muchos más…" — mosaico de proyectos.
                      Posición geométrica real (tapa el cubo durante toda la
                      rotación, sin huecos); la capa interior se rota 180° para
                      leerse derecha al bascular. */}
                  <div
                    aria-hidden="true"
                    className="absolute overflow-hidden bg-[#0a0e17]"
                    style={{
                      width: W,
                      height: W,
                      left: "50%",
                      top: "50%",
                      marginLeft: -W / 2,
                      marginTop: -W / 2,
                      transform: `rotateX(90deg) translateZ(${H / 2}px)`,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <OthersMosaic
                        lead={t("WORK_OTHERS_CARD_LEAD")}
                        accent={t("WORK_OTHERS_CARD_ACCENT")}
                      />
                    </div>
                  </div>

                  {/* Cara inferior (cierra el cubo, relleno de marca) */}
                  <div
                    aria-hidden="true"
                    className="absolute bg-[#FC5185] dark:bg-[#2ee6b6]"
                    style={{
                      width: W,
                      height: W,
                      left: "50%",
                      top: "50%",
                      marginLeft: -W / 2,
                      marginTop: -W / 2,
                      transform: `rotateX(-90deg) translateZ(${H / 2}px)`,
                    }}
                  />
                </motion.div>
              </div>

              {/* Panel: proyectos ↔ otras webs */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {showOthers ? (
                    <OthersPanel key="others" t={t} />
                  ) : (
                    <InfoPanel key="info" step={step} t={t} locale={locale} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Móvil: intro + rejilla + otras webs */}
      <div className="md:hidden">
        <GridFallback t={t} locale={locale} />
      </div>
    </>
  );
}
