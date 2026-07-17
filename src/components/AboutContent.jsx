import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslation } from "next-i18next";

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
    <div className="relative z-10 mx-auto w-full max-w-[280px] md:col-span-2 md:mx-0 md:max-w-none">
      <motion.div
        className="absolute -inset-4 rounded-full bg-[#FC5185]/40 blur-3xl dark:bg-[#30E3CA]/30"
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
          className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#FC5185] dark:border-[#30E3CA]"
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

  return (
    <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-6 md:grid-cols-5">
      <div className="z-10 md:col-span-3">
        <div className="pb-8">
          <h2 className="inline border-b-4 border-[#FC5185] text-4xl font-bold capitalize text-slate-900 dark:border-[#30E3CA] dark:text-white">
            {t("ABOUT_TITLE")}
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-3xl font-bold leading-tight text-slate-800 dark:text-slate-200">
            {t("ABOUT_INTRO")}
          </p>

          <p className="max-w-xl whitespace-pre-line text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {t("ABOUT_DESCRIPTION")}
          </p>

          <div className="pt-6">
            {/* Máscara de degradado: los iconos se funden a transparente en
                ambos bordes, mezclándose con el fondo real (sin cortes). */}
            <div
              className="relative max-w-xl overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0, #000 14%, #000 86%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0, #000 14%, #000 86%, transparent 100%)",
              }}
            >
              <motion.div
                className="flex items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                style={{ width: "max-content" }}
              >
                {techsLoop.map((TechIcon, i) => (
                  <div key={i} className="flex w-24 shrink-0 justify-center">
                    <TechIcon className="h-10 w-10 fill-current text-[#FC5185] dark:text-[#30E3CA]" />
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
