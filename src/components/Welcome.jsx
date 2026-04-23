import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import DynamicAdjective from "./DynamicAdjective";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Welcome = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-white/70 dark:bg-[#191825]/75" />

      {/* Accent gradient */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_30%,rgba(48,227,202,0.06),transparent_60%)]" />

      <motion.div
        key={`${theme}-${i18n.language}`}
        className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="mb-2 text-sm tracking-widest text-[#FC5185] dark:text-[#30E3CA] sm:text-base"
        >
          {t("WELCOME_HELLO")}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight sm:text-7xl"
        >
          IGGY NP
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="mt-2 max-w-[700px] whitespace-pre-line text-2xl font-semibold text-[#8892b0] sm:text-5xl"
        >
          {t("WELCOME_INFO_PART1")}
          {"\u00A0"}
          <DynamicAdjective />
          {"\u00A0"}
          {t("WELCOME_INFO_PART2")}
        </motion.h2>

        <motion.div variants={itemVariants}>
          <Link href="#work" scroll={false}>
            <button className="group mt-10 flex items-center gap-3 rounded border-2 border-[#FC5185] px-7 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#FC5185] hover:text-white hover:shadow-lg dark:border-current dark:hover:border-[#30E3CA] dark:hover:bg-[#30E3CA] dark:hover:text-[#191825]">
              {t("WELCOME_BUTTON")}
              <HiArrowRight className="ml-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Welcome;
