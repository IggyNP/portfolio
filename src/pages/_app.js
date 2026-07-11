import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import { Poppins, DM_Sans } from "next/font/google";
import Preloader from "@/components/Preloader";

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

const App = ({ Component, pageProps }) => (
  <ThemeProvider enableSystem={true} attribute="class">
    <div className={`${poppins.variable} ${dmSans.variable} font-sans`}>
      <Preloader />
      <Component {...pageProps} />
    </div>
  </ThemeProvider>
);

export default appWithTranslation(App);
