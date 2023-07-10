import React from "react";
import Image from "next/image";
import Ignacio from "public/images/ignacio2.png";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { useTranslation } from "next-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div id="contact" className="m-auto flex h-full w-full px-6">
      <div className="m-auto min-h-full w-full max-w-[1240px] px-2 pt-16">
        <div className="flex flex-col items-center justify-center pb-10">
          <h1 className="inline border-b-4 border-[#FC5185] pt-6 text-4xl font-bold capitalize dark:border-[#30E3CA]">
            {t("CONTACT_TITLE")}
          </h1>
        </div>

        <div className="flex w-full flex-grow flex-col md:flex-row">
          {/* Left column */}
          <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-xl shadow-sm shadow-gray-400 md:w-[40%]">
            <Image src={Ignacio} className="w-[50%] rounded-full py-6" />
            <h2 className="text-2xl font-bold capitalize">Ignacio Navarro</h2>
            <h3 className="py-2 text-lg capitalize">{t("CONTACT_ROLE")}</h3>
            <p className="px-6 py-2 text-center normal-case">
              {t("CONTACT_DESCRIPTION")}
            </p>
            <h2 className="pt-6 text-lg font-bold uppercase text-[#FC5185] dark:text-[#30E3CA]">
              {t("CONTACT_CONNECT")}
            </h2>
            <div className=" grid grid-cols-2 py-4 md:pb-6 lg:flex lg:items-center lg:justify-between lg:pb-12">
              <Link
                className="m-2 transform rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:hover:shadow-[#30E3CA] dark:focus:ring-[#30E3CA]"
                href="https://www.linkedin.com/in/ignacio-navarro-poves/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaLinkedin size={30} />
              </Link>
              <Link
                className="m-2 transform rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:hover:shadow-[#30E3CA] dark:focus:ring-[#30E3CA]"
                href="https://github.com/IggyNP"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub size={30} />
              </Link>
              <Link
                className="m-2 transform rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:hover:shadow-[#30E3CA] dark:focus:ring-[#30E3CA]"
                href="mailto:ignacionp94@gmail.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <HiOutlineMail size={30} />
              </Link>
              <Link
                className="m-2 transform rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:hover:shadow-[#30E3CA] dark:focus:ring-[#30E3CA]"
                href={t("CV")}
                locale={false}
                rel="noopener noreferrer"
                target="_blank"
              >
                <BsFillPersonLinesFill size={30} />
              </Link>
            </div>
          </div>

          {/* Right column */}

          <div className="w-full flex-grow pt-6 md:w-[60%] md:pl-6 md:pt-0">
            <form
              name="contact"
              action="/success"
              method="POST"
              netlify
              data-netlify="true"
              className="flex flex-col items-center justify-center rounded-xl shadow-sm shadow-gray-400"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid w-full py-2 md:grid-cols-2">
                <div className="w-full px-6 text-left">
                  <label
                    htmlFor="fullName"
                    className="block pt-6 text-xl font-bold capitalize"
                  >
                    {t("CONTACT_NAME")}
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    className="my-4 w-full rounded-md border-2 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:border-[#ccd6f6] dark:bg-[#191825] dark:text-[#ccd6f6] dark:focus:ring-[#30E3CA]"
                  />
                </div>
                <div className="w-full px-6 text-left">
                  <label
                    htmlFor="email"
                    className="block pt-6 text-xl font-bold capitalize"
                  >
                    {t("CONTACT_EMAIL")}
                  </label>
                  <input
                    required
                    type="text"
                    name="email"
                    className="my-4 w-full rounded-md border-2 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:border-[#ccd6f6] dark:bg-[#191825] dark:text-[#ccd6f6] dark:focus:ring-[#30E3CA]"
                  />
                </div>
              </div>
              <div className="w-full px-6 text-left">
                <label
                  htmlFor="subject"
                  className="block pt-6 text-xl font-bold capitalize"
                  capitalize
                >
                  {t("CONTACT_SUBJECT")}
                </label>
                <input
                  required
                  type="text"
                  name="subject"
                  className="my-4 w-full rounded-md border-2 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:border-[#ccd6f6] dark:bg-[#191825] dark:text-[#ccd6f6] dark:focus:ring-[#30E3CA]"
                />
              </div>
              <div className="w-full px-6 text-left">
                <label
                  htmlFor="message"
                  className="block pt-6 text-xl font-bold capitalize"
                >
                  {t("CONTACT_MESSAGE")}
                </label>
                <textarea
                  required
                  name="message"
                  rows="7"
                  className="my-4 w-full rounded-md border-2 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:border-[#ccd6f6] dark:bg-[#191825] dark:text-[#ccd6f6] dark:focus:ring-[#30E3CA]"
                />
              </div>
              <div className="py-6">
                <button
                  type="submit"
                  className="rounded border-2 bg-transparent px-4 py-2 uppercase shadow-md transition duration-300 ease-in-out hover:border-[#FC5185] hover:bg-[#FC5185] hover:text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FC5185] dark:border-[#ccd6f6] dark:text-[#ccd6f6] dark:hover:border-[#30E3CA] dark:hover:bg-[#30E3CA] dark:hover:text-[#191825] dark:focus:ring-[#30E3CA]"
                >
                  {t("CONTACT_SEND")}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center py-16 lg:py-0 lg:pt-6">
          <Link href="/#home" scroll={false}>
            <div className="rounded-full p-6 shadow-sm shadow-gray-400 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] dark:hover:shadow-[#30E3CA]">
              <HiOutlineChevronDoubleUp size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
