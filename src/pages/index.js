import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Intro from "@/components/intro/Intro";
import Work from "@/components/work/Work";
import Contact from "@/components/contact/Contact";
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
