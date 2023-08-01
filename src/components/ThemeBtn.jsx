import React from "react";
import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeBtn = () => {
  const { resolvedTheme, setTheme } = useTheme("dark");

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="mx-5 flex items-center justify-center rounded-full bg-transparent transition duration-150 ease-in-out hover:scale-125 focus:outline-none"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <HiSun className="h-5 w-5 text-orange-300" />
      ) : (
        <HiMoon className="h-5 w-5 text-slate-800" />
      )}
    </button>
  );
};

export default ThemeBtn;
