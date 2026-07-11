"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTheme } from "next-themes";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Tarjeta de la foto. Réplica del efecto hover original (glow + zoom foto +
// desplazamiento del marco) pero conducida por el scroll: el mismo conjunto
// de transformaciones se enciende al centrarse la tarjeta en el viewport y
// vuelve al reposo en los extremos (va y vuelve según la dirección del scroll).
//
// Vive en su propio componente porque `useScroll` necesita que el ref exista
// desde el primer render, y `About` hace `return null` hasta estar montado.
const AboutImage = () => {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Progreso 0 cuando la tarjeta asoma por abajo → 1 cuando su centro llega
  // al centro del viewport. Fuera de ese rango el progreso queda fijado en 1
  // (se mantiene el efecto), así solo se deshace al scrollear hacia arriba.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const spring = { stiffness: 90, damping: 24 };
  // Construcción monótona: reposo → estado "hover" pleno al centrarse.
  // Mismos valores que el hover: glow dim→intenso, foto 1→1.02, marco 0→12px.
  const glow = useSpring(useTransform(scrollYProgress, [0, 1], [0.5, 1]), spring);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.02]), spring);
  const shift = useSpring(useTransform(scrollYProgress, [0, 1], [0, 12]), spring);

  return (
    <motion.div
      ref={cardRef}
      className="relative z-10 md:col-span-2"
      variants={imageVariants}
    >
      <motion.div
        className="absolute -inset-4 rounded-full bg-[#FC5185]/40 blur-3xl dark:bg-[#30E3CA]/30"
        style={{ opacity: prefersReducedMotion ? 0.5 : glow }}
      ></motion.div>
      <div className="relative">
        <motion.img
          src="/images/foto-iggy.png"
          alt="Profile"
          className="h-auto w-full rounded-2xl object-cover shadow-2xl"
          style={{ scale: prefersReducedMotion ? 1 : scale }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#FC5185] dark:border-[#30E3CA]"
          style={prefersReducedMotion ? undefined : { x: shift, y: shift }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const techs = [
    FirebaseIcon,
    PhpIcon,
    WordpressIcon,
    ElementorIcon,
    ReactIcon,
    NextjsIcon,
    TypescriptIcon,
    TailwindIcon,
    NodeIcon,
    FigmaIcon,
  ];

  const techsLoop = [...techs, ...techs];
  const fillColor = theme === "dark" ? "#30E3CA" : "#FC5185";

  if (!mounted) return null;

  return (
    <section
      id="about"
      className="flex min-h-screen w-full items-center overflow-hidden py-20 transition-colors duration-300"
    >
      <motion.div
        key={`${theme}-${i18n.language}`}
        className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-6 md:grid-cols-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="z-10 md:col-span-3">
          <motion.div variants={itemVariants} className="pb-8">
            <h2 className="inline border-b-4 border-[#FC5185] text-4xl font-bold capitalize text-slate-900 dark:border-[#30E3CA] dark:text-white">
              {t("ABOUT_TITLE")}
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.p
              variants={itemVariants}
              className="text-3xl font-bold leading-tight text-slate-800 dark:text-slate-200"
            >
              {t("ABOUT_INTRO")}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="max-w-xl whitespace-pre-line text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              {t("ABOUT_DESCRIPTION")}
            </motion.p>

            <motion.div variants={itemVariants} className="pt-6">
              <div className="relative max-w-xl overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-slate-900" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-slate-900" />
                <motion.div
                  className="flex items-center"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20,
                  }}
                  style={{ width: "max-content" }}
                >
                  {techsLoop.map((TechIcon, i) => (
                    <div key={i} className="flex w-24 shrink-0 justify-center">
                      <TechIcon
                        className="h-10 w-10"
                        style={{ color: fillColor, fill: "currentColor" }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <AboutImage />
      </motion.div>
    </section>
  );
};

export default About;