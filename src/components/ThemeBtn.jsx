import React from "react";
import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeBtn = () => {
  const { resolvedTheme, setTheme } = useTheme("dark");

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="mx-0 flex h-11 w-11 items-center justify-center rounded-full bg-transparent transition duration-150 ease-in-out hover:scale-125 focus:outline-none md:mx-5 md:h-auto md:w-auto"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <HiSun className="h-6 w-6 text-orange-300 md:h-5 md:w-5" />
      ) : (
        <HiMoon className="h-6 w-6 text-slate-800 md:h-5 md:w-5" />
      )}
    </button>
  );
};

export default ThemeBtn;
