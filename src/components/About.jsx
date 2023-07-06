import React from "react";
import { useTranslation } from "next-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div id="about" className="h-screen w-full px-6">
      <div className="flex h-full w-full flex-col items-center justify-center text-center sm:text-justify">
        <div className="pb-6">
          <h1 className="inline border-b-4 border-[#FC5185] text-4xl font-bold dark:border-[#30E3CA]">
            {t("ABOUT_TITLE")}
          </h1>
        </div>
        <div className="grid w-full max-w-[1000px] gap-8 px-4 sm:grid-cols-2">
          <div className="text-3xl font-bold sm:text-right">
            <p>{t("ABOUT_INTRO")}</p>
          </div>
          <div>
            <p>{t("ABOUT_DESCRIPTION")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
