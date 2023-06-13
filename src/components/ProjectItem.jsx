import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectItem = ({ title, backgroundImg, tech, projectUrl }) => {
  return (
    <div className="group relative flex h-auto w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#F7FAFC] via-[#E2E8F0] to-[#CBD5E1] shadow-sm shadow-gray-400 hover:bg-gradient-to-r dark:from-[#191825] dark:via-[#667eea] dark:to-[#30E3CA]">
      <Image
        className="rounded-xl group-hover:opacity-10"
        src={backgroundImg}
        alt="/"
      />
      <div className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] group-hover:block">
        <h3 className="pb-10 pt-10 text-center text-2xl font-bold tracking-wider text-black dark:text-white">
          {title}
        </h3>
        <Link href={projectUrl}>
          <p className=" cursor-pointer rounded-lg bg-white py-3 text-center text-lg font-bold text-gray-700 shadow-md transition duration-300  hover:border-[#FC5185] hover:bg-[#FC5185] hover:text-white dark:hover:border-[#30E3CA] dark:hover:bg-[#30E3CA] dark:hover:text-[#191825]">
            More Info
          </p>
        </Link>
        <p className="pt-10 text-center font-bold text-black dark:text-white">
          {tech}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;
