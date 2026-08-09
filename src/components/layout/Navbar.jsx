import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import ThemeBtn from "./ThemeBtn";
import LocaleBtn from "./LocaleBtn";

// Fuente única de la navegación (desktop y móvil no pueden divergir).
const LINKS = [
  { href: "/#home", key: "HOME" },
  { href: "/#about", key: "ABOUT" },
  { href: "/#work", key: "WORK" },
  { href: "/#contact", key: "CONTACT" },
];

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [nav, setNav] = useState(false);
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const btnRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const close = () => setNav(false);
  const toggle = () => setNav((v) => !v);

  // "INICIO"/"INFO" son estados de la escena interactiva del Intro (hero=p0,
  // About=p1), no posiciones de scroll. Cuando esa escena está montada
  // (desktop con motion), delegamos en ella vía evento; en móvil/reduced-motion
  // no está y estos enlaces caen a su navegación por anclaje normal.
  const onLinkClick = (e, key) => {
    close();
    if (
      (key === "HOME" || key === "ABOUT") &&
      typeof window !== "undefined" &&
      window.__introInteractive
    ) {
      e.preventDefault();
      window.scrollTo(0, 0);
      window.dispatchEvent(
        new CustomEvent("intro:goto", {
          detail: { target: key === "ABOUT" ? 1 : 0 },
        })
      );
    }
  };

  // Cerrar el menú al navegar (cambio de hash o de ruta).
  useEffect(() => {
    const onDone = () => setNav(false);
    router.events.on("hashChangeComplete", onDone);
    router.events.on("routeChangeComplete", onDone);
    return () => {
      router.events.off("hashChangeComplete", onDone);
      router.events.off("routeChangeComplete", onDone);
    };
  }, [router.events]);

  // Con el menú abierto: bloquear el scroll del fondo y cerrar con Esc.
  useEffect(() => {
    if (!nav) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setNav(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [nav]);

  // Toggle de idioma del menú móvil (misma lógica que LocaleBtn).
  const changeLocale = (next) => {
    if (next !== router.locale) {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
      const hash = window.location.hash || "";
      router.push(`${router.pathname}${hash}`, null, { locale: next });
    }
    close();
  };

  return (
    <div className="fixed z-50 h-[70px] w-full bg-[#f8f8f8] text-[#191825] shadow-md shadow-[#040c16] dark:bg-[#191825] dark:text-gray-300">
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-between px-6">
        {mounted && (
          <Link href="/#home" scroll={false} className="relative z-50">
            <Image
              src={resolvedTheme === "dark" ? "/images/inp.png" : "/images/inp-b.png"}
              alt="INP's logo"
              width={371}
              height={157}
              className="h-10 w-auto"
              priority
            />
          </Link>
        )}

        {/* menú desktop (sin cambios) */}
        <ul className="hidden items-center md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              scroll={false}
              onClick={(e) => onLinkClick(e, l.key)}
            >
              <li className="nav-link mx-5 cursor-pointer text-sm uppercase">
                {t(l.key)}
              </li>
            </Link>
          ))}
          {mounted && <ThemeBtn />}
          <LocaleBtn />
        </ul>

        {/* botón hamburguesa (accesible, 44px) */}
        <button
          type="button"
          ref={btnRef}
          onClick={toggle}
          aria-label={nav ? t("MENU_CLOSE") : t("MENU_OPEN")}
          aria-expanded={nav}
          aria-controls="mobile-menu"
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-md text-[#191825] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5185] dark:text-gray-300 dark:focus-visible:ring-[#30E3CA] md:hidden"
        >
          {nav ? <FaTimes size={24} aria-hidden /> : <FaBars size={24} aria-hidden />}
        </button>
      </div>

      {/* menú móvil */}
      <AnimatePresence>
        {nav && (
          <>
            <motion.div
              key="backdrop"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t("MENU")}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 z-40 flex h-[100dvh] w-4/5 max-w-sm flex-col bg-[#f8f8f8] pt-[70px] shadow-2xl dark:bg-[#191825] md:hidden"
            >
              <motion.ul
                className="flex flex-1 flex-col items-stretch justify-center px-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
                }}
              >
                {LINKS.map((l) => (
                  <motion.li
                    key={l.key}
                    variants={{
                      hidden: { opacity: 0, x: 28 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={l.href}
                      scroll={false}
                      onClick={(e) => onLinkClick(e, l.key)}
                      className="flex min-h-[56px] items-center justify-center py-2 text-center font-heading text-3xl uppercase tracking-wide text-[#191825] transition-colors hover:text-[#FC5185] active:text-[#FC5185] dark:text-gray-200 dark:hover:text-[#30E3CA] dark:active:text-[#30E3CA]"
                    >
                      {t(l.key)}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* tema + idioma */}
              <div className="mt-auto flex items-center justify-center gap-4 border-t border-black/10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 dark:border-white/10">
                {mounted && <ThemeBtn />}
                <div className="flex overflow-hidden rounded-full border border-[#FC5185]/40 dark:border-[#30E3CA]/40">
                  {["en", "es"].map((lc) => (
                    <button
                      key={lc}
                      type="button"
                      onClick={() => changeLocale(lc)}
                      aria-pressed={router.locale === lc}
                      className={`flex h-11 min-w-[52px] items-center justify-center px-4 text-sm font-semibold uppercase transition-colors ${
                        router.locale === lc
                          ? "bg-[#FC5185] text-white dark:bg-[#30E3CA] dark:text-[#191825]"
                          : "text-[#191825] dark:text-gray-300"
                      }`}
                    >
                      {lc}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
