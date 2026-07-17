import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslation } from "next-i18next";
import useMediaQuery from "@/hooks/useMediaQuery";

import ReactIcon from "../icons/ReactIcon.svg";
import NextjsIcon from "../icons/NextjsIcon.svg";
import TypescriptIcon from "../icons/TypescriptIcon.svg";
import TailwindIcon from "../icons/TailwindIcon.svg";
import NodeIcon from "../icons/NodeIcon.svg";
import FigmaIcon from "../icons/FigmaIcon.svg";
import FirebaseIcon from "../icons/FirebaseIcon.svg";
import PhpIcon from "../icons/PhpIcon.svg";
import WordpressIcon from "../icons/WordpressIcon.svg";
import ElementorIcon from "../icons/ElementorIcon.svg";
import ClaudeIcon from "../icons/ClaudeIcon.svg";
import ClerkIcon from "../icons/ClerkIcon.svg";
import NeonIcon from "../icons/NeonIcon.svg";
import ResendIcon from "../icons/ResendIcon.svg";
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiVercel,
  SiGit,
  SiGithub,
  SiSupabase,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiExpress,
  SiSanity,
  SiDocker,
  SiPlaywright,
} from "react-icons/si";

// Tarjeta de la foto. El efecto (glow dim→intenso, foto 1→1.03, marco 0→14px)
// se conduce con `revealProgress` (0→1) que le pasa la escena conforme About se
// acerca/emerge. Sin prop → queda en el estado pleno (estático, reduced-motion).
function AboutImage({ revealProgress }) {
  const fallback = useMotionValue(1);
  const src = revealProgress || fallback;
  const spring = { stiffness: 90, damping: 24 };
  const glow = useSpring(useTransform(src, [0, 1], [0.35, 1]), spring);
  const scale = useSpring(useTransform(src, [0, 1], [1, 1.03]), spring);
  const shift = useSpring(useTransform(src, [0, 1], [0, 14]), spring);

  return (
    <div className="relative z-10 order-2 mx-auto w-full min-w-0 max-w-[280px] md:order-none md:col-span-2 md:col-start-4 md:row-span-2 md:row-start-1 md:mx-0 md:max-w-none">
      <motion.div
        className="absolute -inset-3 rounded-full bg-[#FC5185]/25 blur-2xl dark:bg-[#30E3CA]/20 md:-inset-4 md:bg-[#FC5185]/40 md:blur-3xl md:dark:bg-[#30E3CA]/30"
        style={{ opacity: glow }}
      />
      <div className="relative">
        <motion.img
          src="/images/foto-iggy.png"
          alt="Profile"
          className="h-auto w-full rounded-2xl object-cover shadow-2xl"
          style={{ scale }}
        />
        <motion.div
          className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border-2 border-[#FC5185] dark:border-[#30E3CA] md:-bottom-4 md:-right-4"
          style={{ x: shift, y: shift }}
        />
      </div>
    </div>
  );
}

// Contenido presentacional de About (sin <section>, sin gate, sin reveal:
// la aparición la maneja la capa de la escena en Intro.jsx).
export default function AboutContent({ revealProgress }) {
  const { t } = useTranslation();

  const techs = [
    // Lenguajes
    SiJavascript,
    TypescriptIcon,
    SiHtml5,
    SiCss3,
    PhpIcon,
    // Frontend
    ReactIcon,
    NextjsIcon,
    TailwindIcon,
    SiFramer,
    // Backend / runtime
    NodeIcon,
    SiExpress,
    // Bases de datos / ORM
    SiPostgresql,
    SiMongodb,
    SiPrisma,
    NeonIcon,
    SiSupabase,
    FirebaseIcon,
    // Auth / email / servicios
    ClerkIcon,
    ResendIcon,
    // CMS
    WordpressIcon,
    SiSanity,
    ElementorIcon,
    // DevOps / herramientas / diseño
    SiGit,
    SiGithub,
    SiDocker,
    SiVercel,
    SiPlaywright,
    FigmaIcon,
    // IA
    ClaudeIcon,
  ];

  const techsLoop = [...techs, ...techs];
  // El marquee necesita valores más densos/rápidos y máscara más estrecha en
  // móvil (framer `duration` y `maskImage` no son responsive por clases).
  const isMobile = useMediaQuery("(max-width: 767px)");
  const maskFade = isMobile ? "8%" : "14%";
  const maskImage = `linear-gradient(to right, transparent 0, #000 ${maskFade}, #000 calc(100% - ${maskFade}), transparent 100%)`;

  return (
    <div className="mx-auto grid w-full min-w-0 max-w-[1240px] items-center gap-8 px-6 md:grid-cols-5 md:gap-x-12 md:gap-y-0">
      {/* Título (arriba del todo; en móvil la foto va justo debajo, order-2) */}
      <div className="order-1 min-w-0 pb-0 md:order-none md:col-span-3 md:col-start-1 md:row-start-1 md:pb-8">
        <h2 className="inline border-b-2 border-[#FC5185] text-3xl font-bold capitalize text-slate-900 dark:border-[#30E3CA] dark:text-white md:border-b-4 md:text-4xl">
          {t("ABOUT_TITLE")}
        </h2>
      </div>

      {/* Cuerpo: intro + descripción + marquee (order-3 en móvil) */}
      <div className="order-3 min-w-0 md:order-none md:col-span-3 md:col-start-1 md:row-start-2">
        <div className="space-y-5 md:space-y-6">
          <p className="text-2xl font-bold leading-snug text-slate-800 dark:text-slate-200 md:text-3xl md:leading-tight">
            {t("ABOUT_INTRO")}
          </p>

          <p className="max-w-xl whitespace-pre-line text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
            {t("ABOUT_DESCRIPTION")}
          </p>

          <div className="pt-4 md:pt-6">
            {/* Máscara de degradado: los iconos se funden a transparente en
                ambos bordes. `min-w-0` evita que el track (max-content) empuje
                la columna más ancha que el viewport. */}
            <div
              className="relative min-w-0 max-w-xl overflow-hidden"
              style={{ WebkitMaskImage: maskImage, maskImage }}
            >
              <motion.div
                className="flex items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: isMobile ? 28 : 40,
                }}
                style={{ width: "max-content" }}
              >
                {techsLoop.map((TechIcon, i) => (
                  <div
                    key={i}
                    className="flex w-16 shrink-0 justify-center md:w-24"
                  >
                    <TechIcon className="h-8 w-8 fill-current text-[#FC5185] dark:text-[#30E3CA] md:h-10 md:w-10" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AboutImage revealProgress={revealProgress} />
    </div>
  );
}
