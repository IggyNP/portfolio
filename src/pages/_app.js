import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }) => (
  <ThemeProvider enableSystem={true} attribute="class">
    <Component {...pageProps} />
  </ThemeProvider>
);

export default appWithTranslation(App);
