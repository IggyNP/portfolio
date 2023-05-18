import React, { useState } from "react";
import { FaBars, FaTimes, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Logo from "../assets/inp.jpeg";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed flex h-[80px] w-full items-center justify-between bg-[#191825] px-4 text-gray-300">
      <div>
        <img src={Logo} alt="Logo" style={{ width: "50px" }} />
      </div>

      {/* menu */}

      <ul className="hidden md:flex">
        <li>Home</li>
        <li>About</li>
        <li>Skills</li>
        <li>Work</li>
        <li>Contact</li>
      </ul>

      {/* hamburger */}

      <div onClick={handleClick} className="z-10 md:hidden">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* mobile menu */}

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-center bg-[#191825]"
        }
      >
        <li className="py-6 text-4xl">Home</li>
        <li className="py-6 text-4xl">About</li>
        <li className="py-6 text-4xl">Skills</li>
        <li className="py-6 text-4xl">Work</li>
        <li className="py-6 text-4xl">Contact</li>
      </ul>

      {/* social icons */}

      <div className="fixed top-[35%] left-0 hidden flex-col lg:flex">
        <ul>
          <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#00A0DC] duration-300 hover:ml-[-10px]">
            <a
              className="flex w-full items-center justify-between text-gray-300"
              href="/"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#313335] duration-300 hover:ml-[-10px]">
            <a
              className="flex w-full items-center justify-between text-gray-300"
              href="/"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#DD5143] duration-300 hover:ml-[-10px]">
            <a
              className="flex w-full items-center justify-between text-gray-300"
              href="/"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className="ml-[-100px] flex h-[60px] w-[160px] items-center justify-between bg-[#E68523] duration-300 hover:ml-[-10px]">
            <a
              className="flex w-full items-center justify-between text-gray-300"
              href="/"
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
