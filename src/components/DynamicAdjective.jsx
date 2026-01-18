import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

const DynamicAdjective = () => {
  const { t } = useTranslation();
  const words = t("WELCOME_ADJECTIVES", { returnObjects: true }); // devuelve un array
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true); // fade in
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <span
      className={`inline-block text-[#FC5185] transition-opacity duration-300 dark:text-[#30E3CA] ${
        fade ? "opacity-100" : "opacity-0"
      } font-bold`}
    >
      {words[index]}
    </span>
  );
};

export default DynamicAdjective;
