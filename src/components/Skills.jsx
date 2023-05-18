import React from "react";
import HTML from "../assets/html.png";
import CSS from "../assets/css.png";
import JavaScript from "../assets/javascript.png";
import ReactImg from "../assets/react.png";
import Next from "../assets/nextjs.png";
import Tailwind from "../assets/tailwind.png";

const Skills = () => {
  return (
    <div
      name="skills"
      className="h-screen w-full bg-[#191825] px-6 text-[#ccd6f6]"
    >
      <div className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center p-4 text-center">
        <div>
          <h1 className="inline border-b-4 border-[#30E3CA] text-4xl font-bold">
            Skills
          </h1>
          <p className="py-10">
            These are some of the technologies I've worked with
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 py-8 text-center sm:grid-cols-3">
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <img className="mx-auto w-20" src={HTML} alt="HTML icon" />
            <p className="my-4">HTML</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <img className="mx-auto w-20" src={CSS} alt="CSS icon" />
            <p className="my-4">CSS</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <img className="mx-auto w-20" src={JavaScript} alt="JS icon" />
            <p className="my-4">JavaScript</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <img className="mx-auto w-20" src={ReactImg} alt="React icon" />
            <p className="my-4">React</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <img className="mx-auto w-20" src={Next} alt="GitHub icon" />
            <p className="my-4">Next.js</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <img className="mx-auto w-20" src={Tailwind} alt="Tailwind icon" />
            <p className="my-4">Tailwind</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
