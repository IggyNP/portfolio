import React from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

const About = () => {
  const { t } = useTranslation();

  // Asegúrate de que la ruta a tu imagen sea correcta
  const profileImageSrc = "/profile.png";

  return (
    <section
      id="about"
      className="flex min-h-screen w-full items-center overflow-hidden px-6 py-20 transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-5">
        {/* Lado del texto */}
        <motion.div
          className="z-10 md:col-span-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
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
          </div>
        </motion.div>

        {/* Lado de la imagen */}
        <motion.div
          className="group relative z-10 md:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brillo de fondo adaptable corregido:
             - Light: Base rosa tenue -> Hover rosa intenso
             - Dark: Base azul tenue -> Hover azul intenso
          */}
          <div
            className="absolute -inset-4 rounded-full bg-[#FC5185]/20 blur-3xl transition-all
                          duration-500 group-hover:bg-[#FC5185]/40
                          dark:bg-[#30E3CA]/10 dark:group-hover:bg-[#30E3CA]/30"
          ></div>

          <div className="relative">
            <img
              src="/images/foto-iggy.png"
              alt="Profile"
              className="h-auto w-full rounded-2xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Marco decorativo sólido (coincide con el modo) */}
            <div
              className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#FC5185] transition-transform duration-300 group-hover:translate-x-3
                            group-hover:translate-y-3 dark:border-[#30E3CA]"
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
