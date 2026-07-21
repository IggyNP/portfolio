import Head from "next/head";
import Image from "next/image";

export default function Maintenance() {
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F0F1A] px-6 text-center text-gray-200">
      {/* Icono o ilustración */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-14 w-14 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 3.75h4.5m-7.5 0h-.75A2.25 2.25 0 003 6v2.25m0 0h18M3 8.25v9A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25v-9M12 12v6m-3-3h6"
          />
        </svg>
      </div>

      {/* Texto principal */}
      <h1 className="mb-2 text-2xl font-semibold sm:text-3xl">
        🔧 Estamos en mantenimiento
      </h1>
      <p className="mb-10 max-w-md text-gray-400">
        Estamos mejorando la web para ofrecerte una mejor experiencia. Volvemos
        muy pronto.
      </p>

      {/* Logo */}
      <Image
        src="/images/inp.png"
        alt="IggyNP Logo"
        width={371}
        height={157}
        className="mb-2 h-14 w-auto opacity-90"
      />

      {/* Footer */}
      <p className="text-sm text-gray-500">IggyNP © {year}</p>
    </div>
    </>
  );
}
