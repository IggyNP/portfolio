import React from "react";
import ProjectItem from "./ProjectItem";
import siempreJamon from "public/images/siempre-jamon.png";
import portfolio from "public/images/portfolio.png";
import calculator from "public/images/calculator.png";
import weatherApp from "public/images/weather-app.png";
import ammde from "public/images/ammde.png";
import ior from "public/images/ior.png";
import drivelandMotorsport from "public/images/drivelandMotorsport.png";

const Work = () => {
  return (
    <div id="work" className="w-full">
      <div className="mx-auto max-w-[1240px] px-2 py-20">
        <div className="flex flex-col items-center justify-center pb-10">
          <h1 className="inline border-b-4 border-[#FC5185] pt-6 text-4xl font-bold dark:border-[#30E3CA]">
            Work
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
      </div>
    </div>
  );
};

export default Work;
