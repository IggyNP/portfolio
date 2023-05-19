import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="h-screen w-full bg-[#191825] px-6 text-[#ccd6f6]"
    >
      <div className="flex h-full w-full flex-col items-center justify-center text-center sm:text-justify">
        <div className="pb-10">
          <h1 className="inline border-b-4 border-[#30E3CA] text-4xl font-bold">
            About
          </h1>
        </div>
        <div className="grid w-full max-w-[1000px] gap-8 px-4 sm:grid-cols-2">
          <div className="text-3xl font-bold sm:text-right">
            <p>Experienced Business Professional Turned Frontend Developer.</p>
          </div>
          <div>
            <p>
              After completing my MBA in International Management, I discovered
              my passion for technology and began self-learning programming a
              year ago. Since then, I have honed my skills in HTML, CSS,
              JavaScript, and React, and have completed several personal
              projects to apply my knowledge. My experience in business and
              digital marketing gives me a unique perspective on user experience
              and allows me to create visually appealing and effective websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
