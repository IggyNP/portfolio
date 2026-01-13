import React from "react";
import { useTranslation } from "next-i18next";

const WeddingTemplates = () => {
  const { t } = useTranslation();
  return (
    <div id="wedding-templates" className="h-screen w-full">
      <div className="flex h-full w-full flex-col items-center justify-center text-center sm:text-justify">
        <div className="pb-6">
          <h1 className="inline border-b-4 border-[#FC5185] text-4xl font-bold capitalize dark:border-[#30E3CA]">
            {t("WEDDING_TEMPLATES_TITLE")}
          </h1>
        </div>
        <div className="grid w-full max-w-[1000px] gap-8 px-4 sm:grid-cols-2">
          <div className="text-3xl font-bold sm:text-right">
            <p className="normal-case">{t("WEDDING_TEMPLATES_INTRO")}</p>
          </div>
          <div className="flex flex-col items-center justify-center sm:items-start">
            <p className="mb-4">{t("WEDDING_TEMPLATES_DESCRIPTION")}</p>
            <a
              href="/plantillas-boda"
              className="rounded bg-[#FC5185] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#ff75a0] dark:bg-[#30E3CA] dark:hover:bg-[#3ef0d2]"
            >
              {t("WEDDING_TEMPLATES_BUTTON")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingTemplates;
