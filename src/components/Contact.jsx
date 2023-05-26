import React from "react";
import Image from "next/image";
import Ignacio from "public/images/ignacio.png";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

const Contact = () => {
  return (
    <div
      id="contact"
      className="m-auto flex h-full w-full bg-[#191825] px-6 lg:h-screen"
    >
      <div className="m-auto min-h-full w-full max-w-[1240px] px-2 pt-16">
        <div className="flex flex-col items-center justify-center pb-10">
          <h1 className="inline border-b-4 border-[#30E3CA] pt-6 text-4xl font-bold">
            Contact
          </h1>
        </div>

        <div className="flex w-full flex-grow flex-col md:flex-row">
          {/* Left column */}
          <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-xl shadow-sm shadow-gray-400 md:w-[40%]">
            <Image src={Ignacio} className="w-[50%] py-6" />
            <h2 className="text-2xl font-bold">Ignacio Navarro</h2>
            <h3 className="py-2 text-lg">Frontend Developer</h3>
            <p className="px-6 py-2 text-center">
              Ready to take on exciting projects. Let's connect and discuss how
              I can contribute to your team!
            </p>
            <h2 className="pt-6 text-lg font-bold uppercase text-[#30E3CA]">
              connect with me:
            </h2>
            <div className=" grid grid-cols-2 py-4 md:pb-6 lg:flex lg:items-center lg:justify-between lg:pb-12">
              <Link
                className="m-2 transform rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#30E3CA] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                href="https://www.linkedin.com/in/ignacio-navarro-poves/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaLinkedin size={30} />
              </Link>
              <Link
                className="m-2 rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#30E3CA] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                href="https://github.com/IggyNP"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub size={30} />
              </Link>
              <Link
                className="m-2 rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#30E3CA] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                href="mailto:ignacionp94@gmail.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <HiOutlineMail size={30} />
              </Link>
              <Link
                className="m-2 rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#30E3CA] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                href="/pdfs/cv-inp.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                <BsFillPersonLinesFill size={30} />
              </Link>
            </div>
          </div>

          {/* Right column */}

          <div className="w-full flex-grow pt-6 md:w-[60%] md:pl-6 md:pt-0">
            <form className="flex flex-col items-center justify-center rounded-xl shadow-sm shadow-gray-400">
              <div className="grid w-full py-2 md:grid-cols-2">
                <div className="w-full px-6 text-left">
                  <label className="block pt-6 text-xl font-bold">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="my-4 w-full rounded-md border-2 border-[#ccd6f6] bg-[#191825] px-4 py-2 text-[#ccd6f6] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                  />
                </div>
                <div className="w-full px-6 text-left">
                  <label className="block pt-6 text-xl font-bold">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="my-4 w-full rounded-md border-2 border-[#ccd6f6] bg-[#191825] px-4 py-2 text-[#ccd6f6] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                  />
                </div>
              </div>
              <div className="w-full px-6 text-left">
                <label className="block pt-6 text-xl font-bold">Email</label>
                <input
                  type="text"
                  name="Email"
                  className="my-4 w-full rounded-md border-2 border-[#ccd6f6] bg-[#191825] px-4 py-2 text-[#ccd6f6] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                />
              </div>
              <div className="w-full px-6 text-left">
                <label className="block pt-6 text-xl font-bold">Message</label>
                <textarea
                  name="message"
                  rows="7"
                  className="my-4 w-full rounded-md border-2 border-[#ccd6f6] bg-[#191825] px-4 py-2 text-[#ccd6f6] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                />
              </div>
              <div className="py-6">
                <button
                  type="submit"
                  className="rounded border-2 border-[#ccd6f6] bg-[#191825] bg-transparent px-4 py-2 uppercase text-[#ccd6f6] transition duration-150 ease-in-out hover:border-[#30E3CA] hover:bg-[#30E3CA] hover:text-[#191825] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#30E3CA]"
                >
                  send message
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center py-10 lg:py-0 lg:pt-6">
          <Link href="/#home" scroll={false}>
            <div className="rounded-full p-6 shadow-sm shadow-gray-400 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#30E3CA]">
              <HiOutlineChevronDoubleUp size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
