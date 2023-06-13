import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const success = () => {
  return (
    <>
      <Head>
        <title>IggyNP | Success</title>
      </Head>
      <Navbar showSocials={true} />
      <div id="success" className="h-screen w-full">
        <div className="mx-auto flex h-full max-w-[1000px] flex-col items-center justify-center px-8 text-center">
          <h1 className="text-4xl  text-[#FC5185] dark:text-[#30E3CA] sm:text-6xl">
            Thank you for your message!
          </h1>
          <h2 className="my-2 text-xl font-bold sm:my-4 sm:text-2xl">
            I'll get back to you as soon as possible.
          </h2>
          <Link href="/#contact" scroll={false}>
            <button className="group mt-6 flex items-center rounded border-2 px-6 py-3 uppercase shadow-md transition duration-300 ease-in-out hover:border-[#FC5185] hover:bg-[#FC5185] hover:text-white dark:hover:border-[#30E3CA] dark:hover:bg-[#30E3CA] dark:hover:text-[#191825]">
              return
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default success;
