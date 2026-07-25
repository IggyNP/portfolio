import ProjectDetail from "@/components/work/ProjectDetail";
import { PROJECTS } from "@/data/projects";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Ruta de detalle en español: /proyecto/<slug> (con prefijo de locale → en la
// práctica /es/proyecto/<slug>). Espejo de /project/[slug].js con el mismo
// componente. El enlace correcto por idioma lo compone projectHref().
export default function ProyectoPage({ slug }) {
  return <ProjectDetail slug={slug} />;
}

export async function getStaticPaths({ locales }) {
  // Genera cada slug para cada idioma (i18n no lo hace solo sin `locale`).
  return {
    paths: locales.flatMap((locale) =>
      PROJECTS.map((p) => ({ params: { slug: p.slug }, locale }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  return {
    props: {
      slug: params.slug,
      ...(await serverSideTranslations(locale)),
    },
  };
}
