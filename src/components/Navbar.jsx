import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeBtn from "./ThemeBtn";
import { useTheme } from "next-themes";
import { FaBars, FaTimes, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useTranslation } from "next-i18next";

const Navbar = ({ showSocials = true }) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const [hideSocials, setHideSocials] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const triggerElement = document.getElementById("contact");
      const triggerElementOffset = triggerElement?.offsetTop;
      const currentScroll = window.pageYOffset;

      currentScroll >= triggerElementOffset - 100
        ? setHideSocials(true)
        : setHideSocials(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed z-50 flex h-[70px] w-full items-center justify-between bg-[#f8f8f8] px-5 text-[#191825] shadow-md shadow-[#040c16] dark:bg-[#191825] dark:text-gray-300 md:px-10">
      <div className="flex w-full items-center justify-between">
        {mounted && (
          <Link href="/#home" scroll={false}>
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/images/inp.png"
                  : "/images/inp-b.png"
              }
              alt="INP's logo"
              width="90"
              height="90"
            />
          </Link>
        )}
      </div>

      {/* menu */}

      <ul className="hidden md:flex">
        <Link href="/#home" scroll={false}>
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#FC5185] dark:hover:border-[#30E3CA]">
            {t("HOME")}
          </li>
        </Link>
        <Link href="/#about" scroll={false}>
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#FC5185] dark:hover:border-[#30E3CA]">
            {t("ABOUT")}
          </li>
        </Link>
        <Link href="/#skills" scroll={false}>
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#FC5185] dark:hover:border-[#30E3CA]">
            Skills
          </li>
        </Link>
        <Link href="/#work" scroll={false}>
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#FC5185] dark:hover:border-[#30E3CA]">
            {t("WORK")}
          </li>
        </Link>
        <Link href="/#contact" scroll={false}>
          <li className="mx-10 border-b-2 border-transparent text-sm uppercase hover:border-[#FC5185] dark:hover:border-[#30E3CA]">
            {t("CONTACT")}
          </li>
        </Link>
        {mounted && <ThemeBtn />}
      </ul>

      {/* hamburger */}

      <div onClick={handleClick} className="z-10 md:hidden">
        {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
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
              ? " fixed right-0 top-0 h-screen w-[75%] duration-500 ease-in"
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
          </ul>
        </div>
      </div>

      {/* social icons */}
      {!hideSocials && showSocials && (
        <div
          id="socials"
          className="fixed left-0 top-[35%] hidden md:bottom-0 xl:flex xl:flex-col"
        >
          <ul>
            <li className="ml-[-100px] flex h-[60px] w-[160px] bg-[#00A0DC] duration-300 hover:ml-0">
              <Link
                className="mr-4 flex w-full items-center justify-between text-gray-300"
                href="https://www.linkedin.com/in/ignacio-navarro-poves/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <p className="ml-4 capitalize">linkedin</p>{" "}
                <FaLinkedin size={30} />
              </Link>
            </li>
            <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#313335] duration-300 hover:ml-0">
              <Link
                className="mr-4 flex w-full items-center justify-between text-gray-300"
                href="https://github.com/IggyNP"
                rel="noopener noreferrer"
                target="_blank"
              >
                <p className="ml-4 capitalize">github</p> <FaGithub size={30} />
              </Link>
            </li>
            <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#DD5143] duration-300 hover:ml-0">
              <Link
                className="mr-4 flex w-full items-center justify-between text-gray-300"
                href="mailto:ignacionp94@gmail.com"
              >
                <p className="ml-4 capitalize">email</p>{" "}
                <HiOutlineMail size={30} />
              </Link>
            </li>
            <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#E68523] duration-300 hover:ml-0">
              <Link
                className="mr-4 flex w-full items-center justify-between text-gray-300"
                href="/pdfs/cv-inp.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                <p className="ml-4 capitalize">{t("RESUME")}</p>{" "}
                <BsFillPersonLinesFill size={30} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
