import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Calculator from "public/images/calculator.png";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <Navbar showSocials={false} />

      {/* Image */}

      <div className="w-full">
        <div className="relative h-[45vh] w-full">
          <div className="absolute left-0 top-0 z-10 h-[45vh] w-full bg-black/70" />
          <Image
            className="absolute z-0"
            fill
            style={{ objectFit: "cover" }}
            src={Calculator}
            alt="/"
          />
          <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center">
            {" "}
            <div className="p-2 text-white">
              <h2 className="py-2 text-center text-3xl">Calculator</h2>
              <h3 className="text-center text-xl">React / CSS3</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="mx-auto grid max-w-[1240px] grid-cols-4 gap-8 px-7 py-10">
        <div className="col-span-4 pr-10 md:col-span-3">
          <p>Project</p>
          <h2 className="font-bol py-2 text-3xl">Overview</h2>
          <p>
            The React Calculator is a beginner-level project that I created
            during my early days of learning React. It is a simple calculator
            application built using React and styled with CSS3. The calculator
            provides basic arithmetic operations and allows users to perform
            calculations in a user-friendly interface. The project showcases my
            initial grasp of React concepts and my ability to develop and deploy
            web applications. The React Calculator is deployed on Netlify,
            making it accessible for demonstration purposes.
          </p>
          <div className="flex items-center justify-center pt-6 lg:pt-10">
            <Link
              href="https://github.com/IggyNP/react-calculator"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4"
            >
              <button className="rounded border-2 border-[#ccd6f6] bg-[#191825] bg-transparent px-6 py-2 uppercase text-[#ccd6f6] transition duration-150 ease-in-out hover:border-[#30E3CA] hover:bg-[#30E3CA] hover:text-[#191825] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]">
                code
              </button>
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4"
            >
              <button className="rounded border-2 border-[#ccd6f6] bg-[#191825] bg-transparent px-6 py-2 uppercase text-[#ccd6f6] transition duration-150 ease-in-out hover:border-[#30E3CA] hover:bg-[#30E3CA] hover:text-[#191825] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]">
                demo
              </button>
            </Link>
          </div>
        </div>

        {/* Technologies */}

        <div className="col-span-4 rounded-xl py-4 shadow-sm shadow-gray-400 md:col-span-1">
          <div className="p-2">
            <p className="pb-2 text-center font-bold">Technologies</p>
            <div className="grid grid-cols-3 justify-end md:w-full md:grid-cols-1 md:pl-4 lg:pl-20">
              <p className="flex items-center py-2 pl-2 text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> React
              </p>
              <p className="flex items-center py-2 pl-2 text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> CSS3
              </p>
              <p className="flex items-center py-2 pl-2 text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> Javascript
              </p>
              <p className="flex items-center py-2 pl-2 text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> Netlify
              </p>
            </div>
          </div>
        </div>
        <Link href="/#work">
          <p className="cursor-pointer underline hover:text-[#30E3CA]">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default index;