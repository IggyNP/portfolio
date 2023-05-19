import Head from "next/head";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Head>
        <title>Iggy | Frontend Developer</title>
      </Head>
      <Navbar />
      <Welcome />
      <About />
      <Skills />
      <Work />
    </>
  );
}
