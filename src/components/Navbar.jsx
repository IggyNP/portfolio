import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeBtn from "./ThemeBtn";
import { useTheme } from "next-themes";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import LocaleBtn from "./LocaleBtn";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [nav, setNav] = useState(false);
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed z-50 h-[70px] w-full bg-[#f8f8f8] text-[#191825] shadow-md shadow-[#040c16] dark:bg-[#191825] dark:text-gray-300">
      {/* Contenido alineado al mismo contenedor centrado que el resto de la web */}
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-between px-6">
        {mounted && (
          <Link href="/#home" scroll={false}>
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/images/inp.png"
                  : "/images/inp-b.png"
              }
              alt="INP's logo"
              width={110}
              height={110}
              className="h-full w-auto"
              priority
            />
          </Link>
        )}

        {/* menu desktop */}
        <ul className="hidden items-center md:flex">
          <Link href="/#home" scroll={false}>
            <li className="nav-link mx-5 text-sm uppercase">{t("HOME")}</li>
          </Link>

          <Link href="/#about" scroll={false}>
            <li className="nav-link mx-5 cursor-pointer text-sm uppercase">
              {t("ABOUT")}
            </li>
          </Link>

          <Link href="/#work" scroll={false}>
            <li className="nav-link mx-5 text-sm uppercase">{t("WORK")}</li>
          </Link>

          <Link href="/#contact" scroll={false}>
            <li className="nav-link mx-5 text-sm uppercase">{t("CONTACT")}</li>
          </Link>

          {mounted && <ThemeBtn />}
          <LocaleBtn />
        </ul>

        {/* hamburger */}
        <div onClick={handleClick} className="z-10 md:hidden">
          {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={
          nav ? "fixed right-0 top-0 h-screen w-full bg-black/70 md:hidden" : ""
        }
      >
        <div
          className={
            nav
              ? "fixed right-0 top-0 h-screen w-[75%] duration-500 ease-in"
              : "fixed right-[-100%] duration-500 ease-in"
          }
        >
          <ul
            className={
              !nav
                ? "hidden"
                : "absolute left-0 top-0 flex h-screen w-full select-none flex-col items-center justify-center bg-[#f8f8f8] dark:bg-[#191825]"
            }
          >
            <Link
              href="/#home"
              scroll={false}
              className="py-6 text-4xl uppercase"
              onClick={handleClick}
            >
              {t("HOME")}
            </Link>

            <Link
              href="/#about"
              className="py-6 text-4xl uppercase"
              scroll={false}
              onClick={handleClick}
            >
              {t("ABOUT")}
            </Link>

            <Link
              href="/#skills"
              className="py-6 text-4xl uppercase"
              scroll={false}
              onClick={handleClick}
            >
              Skills
            </Link>

            <Link
              href="/#work"
              className="py-6 text-4xl uppercase"
              scroll={false}
              onClick={handleClick}
            >
              {t("WORK")}
            </Link>

            <Link
              href="/#contact"
              className="py-6 text-4xl uppercase"
              scroll={false}
              onClick={handleClick}
            >
              {t("CONTACT")}
            </Link>

            <div className="py-6">{mounted && <ThemeBtn />}</div>

            <div className="flex w-full items-center justify-center py-6">
              {t("LANGUAGE")}
              {mounted && <LocaleBtn />}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
