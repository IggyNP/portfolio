import Seo from "@/components/seo/Seo";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { HiArrowUpRight, HiArrowLeft } from "react-icons/hi2";
import { RiRadioButtonFill } from "react-icons/ri";
import Navbar from "@/components/layout/Navbar";
import { getProject } from "@/data/projects";

/* --------------------------------------------------------------------------
   Plantilla única de página de detalle de proyecto (caso de estudio). Recibe un
   `slug`, lee los datos neutros de `projects.js` y la prosa vía i18n bajo el
   prefijo `p.key` (p. ej. IOR_OVERVIEW / IOR_CHALLENGE / IOR_SOLUTION /
   IOR_FEATURES). Usada por /project/[slug] (en) y /proyecto/[slug] (es).
   -------------------------------------------------------------------------- */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function Section({ label, title, children }) {
  return (
    <motion.section className="mt-12 first:mt-0 sm:mt-14" {...reveal}>
      {label && (
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-[#FC5185] dark:text-[#2ee6b6]">
          {label}
        </p>
      )}
      {title && (
        <h2 className="mt-2 font-heading text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
      )}
      <div className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
        {children}
      </div>
    </motion.section>
  );
}

export default function ProjectDetail({ slug }) {
  const { t } = useTranslation();
  const p = getProject(slug);
  if (!p) return null;

  const K = p.key;
  const features = t(`${K}_FEATURES`, { returnObjects: true });
  const featureList = Array.isArray(features) ? features : [];

  return (
    <>
      <Seo
        title={`${p.title} · Iggy NP`}
        description={t(`${K}_OVERVIEW`)}
        image={p.hero}
      />
      <Navbar showSocials={false} />

      {/* Hero */}
      <header className="relative h-[62svh] min-h-[380px] w-full overflow-hidden sm:h-[62vh] sm:min-h-[420px]">
        <Image
          src={p.hero}
          alt={p.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/90 sm:to-black/85" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1240px] px-6 pb-8 sm:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#FC5185] dark:text-[#2ee6b6]">
                  {t("PROJECT_T1")}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur-sm">
                  {p.category}
                </span>
                {p.status === "wip" && (
                  <span className="rounded-full bg-[#FC5185] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white dark:bg-[#2ee6b6] dark:text-[#0a0e17]">
                    {t("PROJECT_WIP")}
                  </span>
                )}
              </div>
              <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
                {p.title}
              </h1>
              <p className="mt-3 truncate text-base text-slate-200 sm:mt-4 sm:whitespace-normal sm:text-lg">
                {p.tech.join(" · ")}
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Cuerpo */}
      <div className="mx-auto grid max-w-[1240px] gap-x-14 gap-y-10 px-6 py-12 sm:py-16 lg:grid-cols-[1fr_320px]">
        <div className="order-2 lg:order-1">
          <Section label={t("PROJECT_OVERVIEW_LABEL")}>
            <p>{t(`${K}_OVERVIEW`)}</p>
          </Section>

          <Section label={t("PROJECT_CHALLENGE")}>
            <p>{t(`${K}_CHALLENGE`)}</p>
          </Section>

          <Section label={t("PROJECT_SOLUTION")}>
            <p>{t(`${K}_SOLUTION`)}</p>
          </Section>

          {featureList.length > 0 && (
            <Section label={t("PROJECT_FEATURES")}>
              <ul className="space-y-3">
                {featureList.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <RiRadioButtonFill
                      size={13}
                      className="mt-1.5 shrink-0 text-[#FC5185] dark:text-[#2ee6b6]"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <motion.aside
          className="order-1 h-fit lg:order-2 lg:sticky lg:top-28"
          {...reveal}
        >
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              {t("PROJECT_TECHNOLOGIES")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[#FC5185]/10 px-3 py-1.5 text-sm font-medium text-[#c72d5f] ring-1 ring-[#FC5185]/20 dark:bg-[#2ee6b6]/10 dark:text-[#2ee6b6] dark:ring-[#2ee6b6]/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {(p.liveUrl || p.codeUrl) && (
              <div className="mt-6 flex flex-col gap-3">
                {p.liveUrl && (
                  <Link
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FC5185] px-5 py-3.5 font-heading font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-[#2ee6b6] dark:text-[#0a0e17] sm:py-3"
                  >
                    {t("PROJECT_WEB")}
                    <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
                {p.codeUrl && (
                  <Link
                    href={p.codeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 font-heading font-semibold text-slate-900 ring-1 ring-slate-300 transition-colors hover:border-transparent hover:bg-slate-900 hover:text-white active:scale-[0.98] dark:text-white dark:ring-white/20 dark:hover:bg-white dark:hover:text-[#0a0e17] sm:py-3"
                  >
                    {t("PROJECT_CODE")}
                    <HiArrowUpRight />
                  </Link>
                )}
              </div>
            )}
          </div>

          <Link
            href="/#work"
            className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-[#FC5185] dark:text-slate-400 dark:hover:text-[#2ee6b6]"
          >
            <HiArrowLeft />
            {t("PROJECT_BACK")}
          </Link>
        </motion.aside>
      </div>
    </>
  );
}
