import { useEffect, useState } from "react";

// SSR-safe: devuelve `false` en el servidor y en el primer render del cliente
// (para no romper la hidratación), y se actualiza tras montar. Uso típico:
//   const isMobile = useMediaQuery("(max-width: 767px)");
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}
