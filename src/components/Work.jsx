import React from "react";
import ProjectItem from "./ProjectItem";
import siempreJamon from "public/images/siempre-jamon.png";
import portfolio from "public/images/portfolio.png";
import calculator from "public/images/calculator.png";
import weatherApp from "public/images/weather-app.png";
import ammde from "public/images/ammde.png";
import ior from "public/images/ior.png";
import drivelandMotorsport from "public/images/drivelandMotorsport.png";
import sotoBp from "public/images/sotobp.png";
import { useTranslation } from "next-i18next";
import { RiRadioButtonFill } from "react-icons/ri";

const Work = () => {
  const { t } = useTranslation();
  return (
    <div id="work" className="w-full">
      <div className="mx-auto max-w-[1240px] px-2 py-20">
        <div className="flex flex-col items-center justify-center pb-10">
          <h1 className="inline border-b-4 border-[#FC5185] pt-6 text-4xl font-bold dark:border-[#30E3CA]">
            {t("WORK_TITLE")}
          </h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <ProjectItem
            title="Siempre Jamón"
            backgroundImg={siempreJamon}
            projectUrl="/siempre-jamon"
            tech="React JS | Next.js | Tailwind CSS"
          />
          <ProjectItem
            title="My Portfolio"
            backgroundImg={portfolio}
            projectUrl="/portfolio"
            tech="React JS | Next.js | Tailwind CSS"
          />
          <ProjectItem
            title="Calculator App"
            backgroundImg={calculator}
            projectUrl="/calculator"
            tech="React JS"
          />
          <ProjectItem
            title="Weather App"
            backgroundImg={weatherApp}
            projectUrl="/weather-app"
            tech="React JS | Tailwind CSS"
          />
          <ProjectItem
            title="IOR"
            backgroundImg={ior}
            projectUrl="/ior"
            tech="Wordpress | Elementor"
          />
          <ProjectItem
            title="Soto BP"
            backgroundImg={sotoBp}
            projectUrl="/soto-bp"
            tech="Wordpress | Elementor"
          />
          <ProjectItem
            title="AMMDE"
            backgroundImg={ammde}
            projectUrl="/ammde"
            tech="Wordpress | Elementor"
          />
          <ProjectItem
            title="Driveland Motorsport"
            backgroundImg={drivelandMotorsport}
            projectUrl="/driveland-motorsport"
            tech="Wordpress | Elementor"
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center pt-20 text-center sm:text-justify">
          <div className="grid w-full max-w-[1000px] gap-8 px-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center text-xl font-bold sm:text-right">
              <p className="normal-case">{t("OTHER_PROJECTS")}</p>
            </div>
            <div>
              <div className="grid grid-cols-3 justify-end sm:grid-cols-1 md:w-full md:grid-cols-2 md:pl-4 lg:pl-20">
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://driveland.es"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    Driveland Events
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://wetangible.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    We Tangible
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://bodasofiayrafa.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    Boda Sofía y Rafa
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://gustumareas.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    Gustum Areas
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://smartandcity.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    Smart & City
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://elquintoalimento.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    El Quinto Alimento
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://dillepasa.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    Dillepasa
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://quenet-torrent.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    QTI
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://weklimax.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    We Klimax
                  </a>
                </p>
                <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                  <RiRadioButtonFill size={15} className="pr-1" />
                  <a
                    href="https://panoncology.com"
                    className="text-gray-600 hover:underline hover:decoration-[#FC5185] hover:decoration-2 dark:text-white dark:hover:decoration-[#30E3CA]"
                  >
                    Pangaea Oncology
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
