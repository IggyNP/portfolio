import React, { useRef, useState } from "react";
import Image from "next/image";
import Ignacio from "public/images/ignacio2.png";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineChevronDoubleUp } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { Trans } from "next-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const recaptchaRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [privacyError, setPrivacyError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResultMsg("");
    setPrivacyError(false);

    const form = e.target;

    if (!form.privacy.checked) {
      setPrivacyError(true);
      return;
    }

    setLoading(true);

    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.value,
          email: form.email.value,
          subject: form.subject.value,
          message: form.message.value,
          token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResultMsg(t("CONTACT_SUCCESS_MESSAGE"));
        form.reset();
      } else {
        setResultMsg(t("CONTACT_ERROR_MESSAGE"));
      }
    } catch (error) {
      console.error(error);
      setResultMsg(t("CONTACT_ERROR_MESSAGE"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="m-auto w-full px-6 lg:pt-40">
      <div className="m-auto w-full max-w-[1240px] px-2 pt-16">
        {/* Title */}
        <div className="flex flex-col items-center justify-center pb-10">
          <h1 className="inline border-b-4 border-[#FC5185] pt-6 text-4xl font-bold capitalize dark:border-[#30E3CA]">
            {t("CONTACT_TITLE")}
          </h1>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[40%_60%]">
          {/* LEFT COLUMN */}
          <div className="flex h-full flex-col items-center justify-center rounded-xl shadow-sm shadow-gray-400">
            <Image
              src={Ignacio}
              className="w-[50%] rounded-full py-6"
              alt="Ignacio Navarro"
            />

            <h2 className="text-2xl font-bold capitalize">Ignacio Navarro</h2>
            <h3 className="py-2 text-lg capitalize">{t("CONTACT_ROLE")}</h3>

            <p className="px-6 py-2 text-center normal-case">
              {t("CONTACT_DESCRIPTION")}
            </p>

            <h2 className="pt-6 text-lg font-bold uppercase text-[#FC5185] dark:text-[#30E3CA]">
              {t("CONTACT_CONNECT")}
            </h2>

            <div className="grid grid-cols-2 py-4 md:pb-6 lg:flex lg:gap-4 lg:pb-12">
              <Link
                className="m-2 rounded-full p-6 shadow-sm shadow-gray-400 transition hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] dark:hover:shadow-[#30E3CA]"
                href="https://www.linkedin.com/in/ignacio-navarro-poves/"
                target="_blank"
              >
                <FaLinkedin size={30} />
              </Link>

              <Link
                className="m-2 rounded-full p-6 shadow-sm shadow-gray-400 transition hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] dark:hover:shadow-[#30E3CA]"
                href="https://github.com/IggyNP"
                target="_blank"
              >
                <FaGithub size={30} />
              </Link>

              <Link
                className="m-2 rounded-full p-6 shadow-sm shadow-gray-400 transition hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] dark:hover:shadow-[#30E3CA]"
                href="mailto:ignacionp94@gmail.com"
              >
                <HiOutlineMail size={30} />
              </Link>

              <Link
                className="m-2 rounded-full p-6 shadow-sm shadow-gray-400 transition hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] dark:hover:shadow-[#30E3CA]"
                href={t("CV")}
                locale={false}
                target="_blank"
              >
                <BsFillPersonLinesFill size={30} />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col justify-between rounded-xl shadow-sm shadow-gray-400"
          >
            {/* Inputs */}
            <div>
              <div className="grid w-full py-2 md:grid-cols-2">
                <div className="w-full px-6 text-left">
                  <label className="block pt-6 text-xl font-bold">
                    {t("CONTACT_NAME")}
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    className="my-4 w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:ring-[#FC5185] dark:bg-[#191825]"
                  />
                </div>

                <div className="w-full px-6 text-left">
                  <label className="block pt-6 text-xl font-bold">
                    {t("CONTACT_EMAIL")}
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="my-4 w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:ring-[#FC5185] dark:bg-[#191825]"
                  />
                </div>
              </div>

              <div className="w-full px-6 text-left">
                <label className="block pt-6 text-xl font-bold">
                  {t("CONTACT_SUBJECT")}
                </label>
                <input
                  required
                  type="text"
                  name="subject"
                  className="my-4 w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:ring-[#FC5185] dark:bg-[#191825]"
                />
              </div>

              <div className="w-full px-6 text-left">
                <label className="block pt-6 text-xl font-bold">
                  {t("CONTACT_MESSAGE")}
                </label>
                <textarea
                  required
                  name="message"
                  rows="7"
                  className="my-4 w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:ring-[#FC5185] dark:bg-[#191825]"
                />
              </div>

              {/* PRIVACY */}
              <div className="px-6">
                <p className="mt-1 pb-4 text-sm text-gray-500 dark:text-gray-400">
                  <Trans
                    i18nKey="CONTACT_RECAPTCHA_INFO"
                    components={{
                      privacyLink: (
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-gray-500 transition-colors duration-300 hover:decoration-[#FC5185] dark:decoration-gray-400 dark:hover:decoration-[#30E3CA]"
                        />
                      ),
                      termsLink: (
                        <a
                          href="https://policies.google.com/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-gray-500 transition-colors duration-300 hover:decoration-[#FC5185] dark:decoration-gray-400 dark:hover:decoration-[#30E3CA]"
                        />
                      ),
                    }}
                  />
                </p>

                <label className="mt-2 flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    name="privacy"
                    className="mt-1 shrink-0"
                  />
                  <span className="leading-relaxed">
                    <Trans
                      i18nKey="CONTACT_PRIVACY_CONSENT"
                      components={{
                        privacyLink: (
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whitespace-nowrap underline hover:opacity-80"
                          />
                        ),
                      }}
                    />
                  </span>
                </label>

                {privacyError && (
                  <p className="pt-2 text-sm text-red-600">
                    {t("CONTACT_PRIVACY_ERROR")}
                  </p>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col items-center py-6">
              <button
                type="submit"
                disabled={loading}
                className="rounded border-2 px-6 py-2 uppercase transition hover:bg-[#FC5185] hover:text-white dark:hover:bg-[#30E3CA]"
              >
                {loading ? t("CONTACT_SENDING") : t("CONTACT_SEND")}
              </button>

              {resultMsg && <p className="pt-4 text-center">{resultMsg}</p>}
            </div>

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="invisible"
            />
          </form>
        </div>

        {/* BACK TO TOP */}
        <div className="flex justify-center py-16">
          <Link href="/#home" scroll={false}>
            <div className="rounded-full p-6 shadow-sm shadow-gray-400 transition hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#FC5185] dark:hover:shadow-[#30E3CA]">
              <HiOutlineChevronDoubleUp size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
