import React from "react";
import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeBtn = () => {
  const { resolvedTheme, setTheme } = useTheme("dark");

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-full bg-transparent px-4 transition duration-150 ease-in-out hover:scale-125 focus:outline-none"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <HiSun className="h-5 w-5 text-[#30E3CA]" />
      ) : (
        <HiMoon className="h-5 w-5 text-black" />
      )}
    </button>
  );
};

export default ThemeBtn;
