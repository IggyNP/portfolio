import { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";

// solo minúsculas: el revuelto encaja con el texto real (sin mayúsculas ni símbolos)
const CHARS = "abcdefghijklmnopqrstuvwxyz";
const SEP = "\n"; // separador seguro para serializar el array de palabras

const DynamicAdjective = ({ holdMs = 2600, frameMs = 50, frames = 19 }) => {
  const { t } = useTranslation();
  const raw = t("WELCOME_ADJECTIVES", { returnObjects: true }); // devuelve un array
  // t() devuelve un array nuevo en cada render; usamos su contenido como
  // dependencia estable para no reiniciar el efecto (y quedarnos en words[0]).
  const key = Array.isArray(raw) ? raw.join(SEP) : "";
  const [text, setText] = useState(Array.isArray(raw) ? raw[0] : "");
  const scrambleRef = useRef(null);

  useEffect(() => {
    if (!key) return;
    const words = key.split(SEP);

    setText(words[0]);
    let i = 0;

    const scrambleTo = (target) => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);
      let frame = 0;
      scrambleRef.current = setInterval(() => {
        frame++;
        const settled = Math.floor((frame / frames) * target.length);
        let out = "";
        for (let c = 0; c < target.length; c++) {
          out +=
            c < settled ? target[c] : CHARS[(Math.random() * CHARS.length) | 0];
        }
        setText(out);
        if (frame >= frames) {
          clearInterval(scrambleRef.current);
          setText(target);
        }
      }, frameMs);
    };

    const cycle = setInterval(() => {
      i = (i + 1) % words.length;
      scrambleTo(words[i]);
    }, holdMs);

    return () => {
      clearInterval(cycle);
      if (scrambleRef.current) clearInterval(scrambleRef.current);
    };
  }, [key, holdMs, frameMs, frames]);

  return (
    <span className="inline-block font-bold text-[#FC5185] dark:text-[#30E3CA]">
      {text}
    </span>
  );
};

export default DynamicAdjective;
