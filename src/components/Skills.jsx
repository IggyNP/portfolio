import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Skills = () => {
  const { t } = useTranslation();
  return (
    <div id="skills" className="h-screen w-full px-6">
      <div className="mx-auto flex h-full w-full max-w-[1000px] flex-col justify-center p-4 text-center">
        <div>
          <h1 className="inline border-b-4 border-[#FC5185] text-4xl font-bold capitalize dark:border-[#30E3CA]">
            skills
          </h1>
          <p className="py-6 normal-case">{t("SKILLS_DESCRIPTION")}</p>
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
            <p className="my-4 capitalize">javaScript</p>
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
            <p className="my-4 capitalize">react</p>
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
            <p className="my-4 capitalize">next.js</p>
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
            <p className="my-4 capitalize">tailwind</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/git.png"
                alt="<git icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4 capitalize">git</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/wordpress.png"
                alt="<wordpress icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4 capitalize">wordpress</p>
          </div>
          <div className="shadow-md shadow-[#040c16] duration-500 hover:scale-110">
            <div className="flex justify-center pt-4">
              <Image
                src="/images/elementor.webp"
                alt="<elementor icon"
                width="80"
                height="80"
              />
            </div>
            <p className="my-4 capitalize">elementor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
