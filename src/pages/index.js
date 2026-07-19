import Head from "next/head";
import Navbar from "@/components/Navbar";
import Intro from "@/components/Intro";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home() {
  return (
    <>
      <Head>
        <title>IggyNP | Frontend Developer</title>
      </Head>
      <Navbar />
      <Intro />
      <Work />
      <Contact />
    </>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
