import NextDocument, { Html, Head, Main, NextScript } from "next/document";

function MyDocument({ locale }) {
  return (
    <Html lang={locale || "en"}>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  return { ...initialProps, locale: ctx.locale || "en" };
};

export default MyDocument;
