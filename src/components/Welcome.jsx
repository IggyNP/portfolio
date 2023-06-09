import Link from "next/link";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useTranslation } from "next-i18next";

const Welcome = () => {
  const { t } = useTranslation();
  return (
    <div id="home" className="h-screen w-full">
      <div className="mx-auto flex h-full max-w-[1000px] flex-col items-center justify-center px-8 text-center">
        <p className="text-l capitalize text-[#FC5185] dark:text-[#30E3CA] sm:text-xl">
          {t("WELCOME_HELLO")}
        </p>
        <h1 className="my-1 text-4xl font-bold capitalize sm:text-7xl">
          ignacio navarro
        </h1>
        <h2 className="my-1 text-4xl font-bold capitalize text-[#8892b0] sm:text-7xl">
          {t("WELCOME_INFO")}
        </h2>
        <Link href="#work" scroll={false}>
          <button className="group mt-6 flex items-center rounded border-2 px-6 py-3 shadow-md hover:border-[#FC5185] hover:bg-[#FC5185] hover:text-white dark:hover:border-[#30E3CA] dark:hover:bg-[#30E3CA] dark:hover:text-[#191825]">
            {t("WELCOME_BUTTON")}
            <HiArrowNarrowRight className="ml-4 duration-300 group-hover:origin-center group-hover:rotate-90" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
