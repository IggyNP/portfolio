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
      <div className="w-full">
        <div className="relative h-[50vh] w-screen">
          <div className="absolute left-0 top-0 z-10 h-[50vh] w-full bg-black/70" />
          <Image
            className="absolute z-0"
            fill
            style={{ objectFit: "cover" }}
            src={siempreJamon}
            alt="/"
          />
          <div className="absolute left-[50%] right-[50%] top-[85%] z-10 w-full translate-x-[-45%] translate-y-[-45%] p-2 text-white">
            <h2 className="py-2 text-3xl">Siempre Jamón</h2>
            <h3 className="text-xl">Next.js / Tailwind</h3>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1240px] gap-8 p-2 py-8 md:grid-cols-5">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>This app was built using Next.js and is hosted on Netlify.</p>
          <a
            href="https://github.com/IggyNP/siempre-jamon-store"
            target="_blank"
            rel="noreferrer noopener"
          >
            <button className="mr-8 mt-4 px-8 py-2">Code</button>
          </a>
          <a
            href="https://siemprejamon.netlify.app/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <button className="mt-4 px-8 py-2">Demo</button>
          </a>
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
