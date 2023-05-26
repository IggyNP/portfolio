import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import siempreJamon from "public/images/siempre-jamon.png";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <Navbar showSocials={false} />

      {/* Image */}

      <div className="w-full">
        <div className="relative h-[45vh] w-screen">
          <div className="absolute left-0 top-0 z-10 h-[45vh] w-full bg-black/70" />
          <Image
            className="absolute z-0"
            fill
            style={{ objectFit: "cover" }}
            src={siempreJamon}
            alt="/"
          />
          <div className="absolute bottom-0 left-0 right-0 top-72 z-10 flex flex-col items-center justify-center">
            <div className="p-2 text-white">
              <h2 className="py-2 text-3xl">Siempre Jamón</h2>
              <h3 className="text-center text-xl">Next.js / Tailwind</h3>
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <div className="flex items-center justify-center pt-6 lg:pt-10">
            <Link
              href="https://github.com/IggyNP/siempre-jamon-store"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4"
            >
              <button className="rounded border-2 border-[#ccd6f6] bg-[#191825] bg-transparent px-6 py-2 uppercase text-[#ccd6f6] transition duration-150 ease-in-out hover:border-[#30E3CA] hover:bg-[#30E3CA] hover:text-[#191825] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]">
                code
              </button>
            </Link>
            <Link
              href="https://siemprejamon.netlify.app/"
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
            <p className="w-[1/2] pb-2 text-center font-bold">Technologies</p>
            <div className="grid grid-cols-3 justify-end md:w-full md:grid-cols-1 md:pl-4 lg:pl-20">
              <p className="flex items-center py-2 pl-2 text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> Next.js
              </p>
              <p className="flex items-center py-2 pl-2 text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> React
              </p>
              <p className="flex items-center py-2 pl-2 text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> Tailwind
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
