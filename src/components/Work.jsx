import React from "react";
import ProjectItem from "./ProjectItem";
import siempreJamon from "public/images/siempre-jamon.png";
import portfolio from "public/images/portfolio.png";
import calculator from "public/images/calculator.png";
import weatherApp from "public/images/weather-app.png";

const Work = () => {
  return (
    <div id="work" className="h-full w-full lg:h-screen">
      <div className="mx-auto max-w-[1240px] px-2 py-20">
        <div className="flex flex-col items-center justify-center pb-10">
          <h1 className="inline border-b-4 border-[#30E3CA] pt-6 text-4xl font-bold">
            Work
          </h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <ProjectItem
            title="Siempre Jamón"
            backgroundImg={siempreJamon}
            projectUrl="/siempre-jamon"
            tech="Next.js | Tailwind CSS"
          />
          <ProjectItem
            title="My Portfolio"
            backgroundImg={portfolio}
            projectUrl="/portfolio"
            tech="Next.js | Tailwind CSS"
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
        </div>
      </div>
    </div>
  );
};

export default Work;
