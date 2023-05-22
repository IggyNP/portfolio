import React from "react";
import ProjectItem from "./ProjectItem";
import siempreJamon from "public/images/siempre-jamon.png";
import portfolio from "public/images/portfolio.png";
import calculator from "public/images/calculator.png";
import weatherApp from "public/images/weather-app.png";

const Work = () => {
  return (
    <div
      id="work"
      className="h-full w-full bg-[#191825] text-[#ccd6f6] lg:h-screen"
    >
      <div className="mx-auto max-w-[1240px] px-2 py-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="inline border-b-4 border-[#30E3CA] text-4xl font-bold sm:pt-6 lg:pt-0">
            Work
          </h1>
          <h2 className="py-6">Here are some of my projects</h2>
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
