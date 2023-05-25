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
          <div className="absolute left-[50%] right-[50%] top-[85%] z-10 w-full translate-x-[-47%] translate-y-[-47%] p-2 text-white">
            <h2 className="py-2 text-3xl">Siempre Jamón</h2>
            <h3 className="text-xl">Next.js / Tailwind</h3>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="grid max-w-[1240px] gap-8 px-7 py-10 md:grid-cols-5 md:px-10 lg:px-14">
        <div className="col-span-4">
          <p>Project</p>
          <h2 className="text-3xl font-bold">Overview</h2>
          <p>This app was built using Next.js and is hosted on Netlify.</p>
          <div className="flex items-center justify-center pt-6">
            <Link
              href="https://github.com/IggyNP/siempre-jamon-store"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4"
            >
              <button className="rounded border-2 border-[#ccd6f6] bg-[#191825] bg-transparent px-4 py-2 text-[#ccd6f6] transition duration-150 ease-in-out hover:border-[#30E3CA] hover:bg-[#30E3CA] hover:text-[#191825] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]">
                Code
              </button>
            </Link>
            <Link
              href="https://siemprejamon.netlify.app/"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4"
            >
              <button className="rounded border-2 border-[#ccd6f6] bg-[#191825] bg-transparent px-4 py-2 text-[#ccd6f6] transition duration-150 ease-in-out hover:border-[#30E3CA] hover:bg-[#30E3CA] hover:text-[#191825] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]">
                Demo
              </button>
            </Link>
          </div>
        </div>
        <div className="col-span-4 rounded-xl py-4 shadow-sm shadow-gray-400 md:col-span-1">
          <div className="p-2">
            <p className="pb-2 text-center font-bold">Technologies</p>
            <div className="grid grid-cols-3 md:grid-cols-1">
              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> Next.js
              </p>
              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> React
              </p>
              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> Tailwind
              </p>
              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> Javascript
              </p>
              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> Netlify
              </p>
            </div>
          </div>
        </div>
        <Link href="/#work">
          <p className="cursor-pointer underline">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default index;
