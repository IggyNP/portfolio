import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Poppins, DM_Sans } from "next/font/google";
import Preloader from "@/components/Preloader";
import MouseCube from "@/components/MouseCube";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
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
