import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import Preloader from "@/components/Preloader";
import MouseCube from "@/components/MouseCube";

// Fuentes autohospedadas (src/fonts/*.woff2) para que el build NO dependa de
// descargar de Google Fonts en tiempo de compilación (evita los ETIMEDOUT
// intermitentes de next/font/google). Mismos pesos y variables CSS que antes.
const poppins = localFont({
  src: [
    { path: "../fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = localFont({
  src: [
    { path: "../fonts/dm-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-sans-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  // El preloader y el cubo flotante no aparecen en la página de mantenimiento.
  const showChrome = !router.pathname.startsWith("/maintenance");
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className={`${poppins.variable} ${dmSans.variable} font-sans`}>
        {showChrome && <Preloader />}
        {showChrome && <MouseCube />}
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
