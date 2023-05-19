import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectItem = ({ title, backgroundImg, tech, projectUrl }) => {
  return (
    <div className="group relative flex h-auto w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#191825] via-[#667eea] to-[#30E3CA] shadow-sm shadow-gray-400 hover:bg-gradient-to-r">
      <Image
        className="rounded-xl group-hover:opacity-10"
        src={backgroundImg}
        alt="/"
      />
      <div className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] group-hover:block">
        <h3 className="pb-10 pt-10 text-center text-2xl tracking-wider text-white">
          {title}
        </h3>
        <Link href={projectUrl}>
          <p className="cursor-pointer rounded-lg bg-white py-3 text-center text-lg font-bold text-gray-700  hover:border-[#30E3CA] hover:bg-[#30E3CA] hover:text-[#191825]">
            More Info
          </p>
        </Link>
        <p className="pt-10 text-center text-white">{tech}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
