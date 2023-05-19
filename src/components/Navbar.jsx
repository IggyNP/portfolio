import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed flex h-[80px] w-full items-center justify-between bg-[#191825] px-4 text-gray-300">
      <Link href="/">
        <Image src="/images/inp.png" alt="INP's logo" width="90" height="90" />
      </Link>

      {/* menu */}

      <ul className="hidden md:flex ">
        <Link href="/">
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#30E3CA]">
            Home
          </li>
        </Link>
        <Link href="/about">
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#30E3CA]">
            About
          </li>
        </Link>
        <Link href="/skills">
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#30E3CA]">
            Skills
          </li>
        </Link>
        <Link href="/work">
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#30E3CA]">
            Work
          </li>
        </Link>
        <Link href="/contact">
          <li className="ml-10 border-b-2 border-transparent text-sm uppercase hover:border-[#30E3CA]">
            Contact
          </li>
        </Link>
      </ul>

      {/* hamburger */}

      <div onClick={handleClick} className="z-10 mr-2 md:hidden">
        {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
      </div>

      {/* mobile menu */}

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute left-0 top-0 flex h-screen w-full select-none flex-col items-center justify-center bg-[#191825]"
        }
      >
        <Link href="/home" className="py-6 text-4xl">
          Home
        </Link>
        <Link href="/about" className="py-6 text-4xl">
          About
        </Link>
        <Link href="/skills" className="py-6 text-4xl">
          Skills
        </Link>
        <Link href="work" className="py-6 text-4xl">
          Work
        </Link>
        <Link href="contact" className="py-6 text-4xl">
          Contact
        </Link>
      </ul>

      {/* social icons */}

      <div className="fixed left-0 top-[35%] hidden md:bottom-0 xl:flex xl:flex-col">
        <ul>
          <li className="ml-[-100px] flex h-[60px] w-[160px] bg-[#00A0DC] duration-300 hover:ml-0">
            <Link
              className="mr-4 flex w-full items-center justify-between text-gray-300"
              href="/"
            >
              <p className="ml-4">Linkedin</p> <FaLinkedin size={30} />
            </Link>
          </li>
          <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#313335] duration-300 hover:ml-0">
            <Link
              className="mr-4 flex w-full items-center justify-between text-gray-300"
              href="/"
            >
              <p className="ml-4">Github</p> <FaGithub size={30} />
            </Link>
          </li>
          <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#DD5143] duration-300 hover:ml-0">
            <Link
              className="mr-4 flex w-full items-center justify-between text-gray-300"
              href="/"
            >
              <p className="ml-4">Email</p> <HiOutlineMail size={30} />
            </Link>
          </li>
          <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#E68523] duration-300 hover:ml-0">
            <Link
              className="mr-4 flex w-full items-center justify-between text-gray-300"
              href="/"
            >
              <p className="ml-4">Resume</p> <BsFillPersonLinesFill size={30} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
