import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import ior from "public/images/ior.png";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const index = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>IggyNP | IOR</title>
      </Head>
      <Navbar showSocials={false} />

      {/* Image */}

      <div className="w-full">
        <div className="relative h-[45vh] w-full">
          <div className="absolute left-0 top-0 z-10 h-[45vh] w-full bg-black/70" />
          <Image
            className="absolute z-0"
            fill
            style={{ objectFit: "cover" }}
            src={ior}
            alt="/"
          />
          <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center">
            {" "}
            <div className="p-2 text-white">
              <h2 className="py-2 text-center text-3xl">IOR</h2>
              <h3 className="text-center text-xl">Wordpress / Elementor</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="mx-auto grid max-w-[1240px] grid-cols-4 gap-8 px-7 py-10">
        <div className="col-span-4 pr-10 md:col-span-3">
          <p className="capitalize">{t("PROJECT_T1")}</p>
          <h2 className="font-bol py-2 text-3xl capitalize">
            {t("PROJECT_T2")}
          </h2>
          <p>{t("IOR_OVERVIEW")}</p>
          <div className="flex items-center justify-center pt-6 lg:pt-10">
            <Link
              href="https://oncorosell.com"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4"
            >
              <button className="hover: rounded border-2 bg-[#191825] bg-transparent px-6 py-2 uppercase shadow-md transition duration-150 ease-in-out hover:border-[#FC5185] hover:bg-[#FC5185] hover:text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:border-[#ccd6f6] dark:text-[#ccd6f6] dark:hover:border-[#30E3CA] dark:hover:bg-[#30E3CA] dark:hover:text-[#191825] dark:focus:ring-[#30E3CA]">
                web
              </button>
            </Link>
          </div>
        </div>

        {/* Technologies */}

        <div className="col-span-4 rounded-xl py-4 shadow-sm shadow-gray-400 md:col-span-1">
          <div className="p-2">
            <p className="pb-2 text-center font-bold">
              {t("PROJECT_TECHNOLOGIES")}
            </p>
            <div className="grid grid-cols-3 justify-end md:w-full md:grid-cols-1 md:pl-4 lg:pl-20">
              <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> Wordpress
              </p>
              <p className="flex items-center py-2 pl-2 text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> Elementor
              </p>
              <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> CSS
              </p>
              <p className="flex items-center py-2 pl-2 capitalize text-gray-600">
                <RiRadioButtonFill size={15} className="pr-1" /> jQuery
              </p>
            </div>
          </div>
        </div>
        <Link href="/#work">
          <p className="cursor-pointer capitalize underline hover:text-[#FC5185] dark:hover:text-[#30E3CA]">
            {t("PROJECT_BACK")}
          </p>
        </Link>
      </div>
    </>
  );
};

export default index;

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
