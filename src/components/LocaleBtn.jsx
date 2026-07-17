import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineGlobeAlt, HiChevronDown, HiCheck } from "react-icons/hi";

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

// Selector de idioma a medida (desktop). Botón con globo + código + chevron;
// al abrir despliega un panel con los idiomas, el activo en color de marca.
// El menú móvil usa su propio toggle segmentado (Navbar.jsx).
const LocaleBtn = () => {
  const router = useRouter();
  const { pathname, locale } = router;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Cerrar al hacer clic fuera o con Esc.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const changeLocale = (next) => {
    setOpen(false);
    if (next === locale) return;
    // Fija la elección para que la autodetección del middleware la respete.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    const hash = window.location.hash || "";
    router.push(`${pathname}${hash}`, null, { locale: next });
  };

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Cambiar idioma"
        className="flex h-9 items-center gap-1.5 rounded-full px-2 text-sm font-semibold uppercase text-[#191825] transition-colors hover:text-[#FC5185] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5185] dark:text-gray-300 dark:hover:text-[#30E3CA] dark:focus-visible:ring-[#30E3CA]"
      >
        <HiOutlineGlobeAlt size={18} aria-hidden />
        {current.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <HiChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Idioma"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-black/10 bg-[#f8f8f8] py-1 shadow-lg shadow-black/10 ring-1 ring-black/5 dark:border-white/10 dark:bg-[#191825] dark:ring-white/10"
          >
            {LOCALES.map((l) => {
              const active = l.code === locale;
              return (
                <li key={l.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => changeLocale(l.code)}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-sm font-semibold uppercase transition-colors ${
                      active
                        ? "text-[#FC5185] dark:text-[#30E3CA]"
                        : "text-[#191825] hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                    {active && <HiCheck size={16} aria-hidden />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocaleBtn;
