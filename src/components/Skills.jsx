import React from "react";
import Image from "next/image";

const Skills = () => {
  return (
    <div id="skills" className="h-screen w-full px-6">
      <div className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center p-4 text-center">
        <div>
          <h1 className="inline border-b-4 border-[#30E3CA] text-4xl font-bold">
            Skills
          </h1>
          <p className="py-6">
            These are some of the technologies I've worked with
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 py-8 text-center sm:grid-cols-3">
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/html.png"
                alt="HTML icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4">HTML</p>
          </div>
          <div className="shadow-md  shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/css.png"
                alt="CSS icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4">CSS</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/javascript.png"
                alt="JS icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4">JavaScript</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/react.png"
                alt="React icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4">React</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/nextjs.png"
                alt="Next.js icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4">Next.js</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/tailwind.png"
                alt="<tailwind icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4">Tailwind</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
