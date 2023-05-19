import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

const Welcome = () => {
  return (
    <div name="home" className="h-screen w-full bg-[#191825]">
      <div className="mx-auto flex h-full max-w-[1000px] flex-col items-center justify-center px-8 text-center">
        <p className="text-l  text-[#30E3CA] sm:text-xl">Hi! my name is</p>
        <h1 className="my-1 text-4xl font-bold text-[#ccd6f6] sm:text-7xl">
          Ignacio Navarro
        </h1>
        <h2 className="my-1 text-4xl font-bold text-[#8892b0] sm:text-7xl">
          I'm a Frontend Developer.
        </h2>
        <button className="group mt-6 flex items-center border-2 px-6 py-3 text-[#ccd6f6] hover:border-[#30E3CA] hover:bg-[#30E3CA] hover:text-[#191825]">
          View work
          <HiArrowNarrowRight className="ml-4 duration-300 group-hover:origin-center group-hover:rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
