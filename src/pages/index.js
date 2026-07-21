import Seo from "@/components/seo/Seo";
import Navbar from "@/components/layout/Navbar";
import Intro from "@/components/intro/Intro";
import Work from "@/components/work/Work";
import Contact from "@/components/contact/Contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// JSON-LD Person: ayuda a Google a asociar el sitio con la identidad de Iggy
// (objetivo "que al buscar mi nombre salga el portfolio").
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ignacio Navarro",
  alternateName: "IggyNP",
  jobTitle: "Frontend Engineer",
  url: "https://iggynp.com",
  sameAs: [
    "https://github.com/IggyNP",
    "https://www.linkedin.com/in/ignacio-navarro-poves/",
  ],
};

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t("SEO_HOME_TITLE")} description={t("SEO_HOME_DESC")} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
      />
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
