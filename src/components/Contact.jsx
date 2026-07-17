import React, { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineChevronDoubleUp, HiArrowRight } from "react-icons/hi";
import { useTranslation, Trans } from "next-i18next";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ContactScene from "./contact-scene/ContactScene";

const inputClass =
  "w-full bg-transparent border-0 border-b-[1.5px] border-gray-500/40 dark:border-white/25 " +
  "px-0 py-3 md:py-2 text-[17px] text-gray-900 dark:text-[#f2f5fa] " +
  "placeholder:text-gray-500/70 dark:placeholder:text-[#6b7890] " +
  "focus:outline-none focus:ring-0 focus:border-[#FC5185] dark:focus:border-[#2ee6b6] transition-colors";

const labelClass =
  "block text-xs font-medium uppercase tracking-wider mb-2 text-gray-600 dark:text-[#8794aa]";

const linkClass =
  "underline text-[#FC5185] hover:opacity-80 dark:text-[#2ee6b6] dark:hover:text-[#5ff0cd]";

const ContactForm = () => {
  const { t } = useTranslation();
  const { executeRecaptcha } = useGoogleReCaptcha();

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
      if (!executeRecaptcha) {
        console.error("reCAPTCHA not yet available");
        setResultMsg(t("CONTACT_ERROR_MESSAGE"));
        return;
      }

      const token = await executeRecaptcha("contact_form");

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
    <form onSubmit={handleSubmit}>
      <div className="mb-7 grid gap-8 md:grid-cols-2">
        <div>
          <label className={labelClass}>{t("CONTACT_NAME")}</label>
          <input
            required
            type="text"
            name="fullName"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            placeholder={t("CONTACT_NAME_PLACEHOLDER")}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t("CONTACT_EMAIL")}</label>
          <input
            required
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            placeholder={t("CONTACT_EMAIL_PLACEHOLDER")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-7">
        <label className={labelClass}>{t("CONTACT_SUBJECT")}</label>
        <input
          required
          type="text"
          name="subject"
          autoCapitalize="sentences"
          enterKeyHint="next"
          placeholder={t("CONTACT_SUBJECT_PLACEHOLDER")}
          className={inputClass}
        />
      </div>

      <div className="mb-8">
        <label className={labelClass}>{t("CONTACT_MESSAGE")}</label>
        <textarea
          required
          name="message"
          rows="2"
          autoCapitalize="sentences"
          enterKeyHint="send"
          placeholder={t("CONTACT_MESSAGE_PLACEHOLDER")}
          className={`${inputClass} min-h-[120px] resize-y md:min-h-[60px]`}
        />
      </div>

      {/* PRIVACY */}
      <label className="-my-1 mb-2 flex cursor-pointer items-start gap-3 py-1 md:my-0 md:mb-3 md:py-0">
        <input
          type="checkbox"
          name="privacy"
          className="mt-[2px] h-5 w-5 shrink-0 accent-[#FC5185] dark:accent-[#2ee6b6] md:mt-[3px] md:h-4 md:w-4"
        />
        <span className="text-sm leading-relaxed text-gray-600 dark:text-[#aab4c7] md:text-[13px]">
          <Trans
            i18nKey="CONTACT_PRIVACY_CONSENT"
            components={{
              privacyLink: (
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                />
              ),
            }}
          />
        </span>
      </label>
      {privacyError && (
        <p className="mb-3 text-sm text-red-500">{t("CONTACT_PRIVACY_ERROR")}</p>
      )}

      <p className="mb-7 text-xs leading-relaxed text-gray-500 dark:text-[#7b8598]">
        <Trans
          i18nKey="CONTACT_RECAPTCHA_INFO"
          components={{
            privacyLink: (
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              />
            ),
            termsLink: (
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              />
            ),
          }}
        />
      </p>

      {/* SEND */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FC5185] px-6 py-4 font-heading text-[17px] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-60 dark:bg-[#2ee6b6] dark:text-[#0a0e17] md:w-auto md:active:scale-100 md:justify-start md:rounded-none md:bg-transparent md:px-0 md:py-0 md:text-gray-900 md:hover:gap-5 md:hover:text-[#FC5185] md:dark:bg-transparent md:dark:text-[#f2f5fa] md:dark:hover:text-[#2ee6b6]"
        >
          {loading ? t("CONTACT_SENDING") : t("CONTACT_SEND_SHORT")}
          <HiArrowRight className="text-xl md:hidden" />
          <span className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#FC5185] text-xl text-white transition-transform group-hover:scale-110 dark:bg-[#2ee6b6] dark:text-[#0a0e17] md:inline-flex">
            <HiArrowRight />
          </span>
        </button>

        {/* Social */}
        <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-[#8794aa] md:justify-start md:gap-4">
          <Link
            href="https://www.linkedin.com/in/ignacio-navarro-poves/"
            target="_blank"
            aria-label="LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center transition hover:-translate-y-0.5 hover:text-[#FC5185] dark:hover:text-[#2ee6b6] md:h-auto md:w-auto"
          >
            <FaLinkedin size={20} />
          </Link>
          <Link
            href="https://github.com/IggyNP"
            target="_blank"
            aria-label="GitHub"
            className="inline-flex h-11 w-11 items-center justify-center transition hover:-translate-y-0.5 hover:text-[#FC5185] dark:hover:text-[#2ee6b6] md:h-auto md:w-auto"
          >
            <FaGithub size={20} />
          </Link>
          <Link
            href="mailto:dev@iggynp.com"
            aria-label="Email"
            className="inline-flex h-11 w-11 items-center justify-center transition hover:-translate-y-0.5 hover:text-[#FC5185] dark:hover:text-[#2ee6b6] md:h-auto md:w-auto"
          >
            <HiOutlineMail size={22} />
          </Link>
        </div>
      </div>

      {resultMsg && (
        <p className="pt-5 text-sm text-gray-700 dark:text-[#aab4c7]">{resultMsg}</p>
      )}
    </form>
  );
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <section
        id="contact"
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
      >
        {/* Escena viva de fondo */}
        <ContactScene />

        {/* Overlay para legibilidad. Móvil: vertical suave (form a todo el ancho).
            Desktop: horizontal → protege el form (izquierda) y deja ver el vídeo
            a la derecha, sin lavarlo. */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(248,248,248,0.5)_0%,rgba(248,248,248,0.72)_55%,rgba(248,248,248,0.88)_100%)] dark:bg-[linear-gradient(180deg,rgba(10,14,23,0.55)_0%,rgba(10,14,23,0.78)_55%,rgba(10,14,23,0.92)_100%)] md:bg-[linear-gradient(90deg,rgba(248,248,248,0.97)_0%,rgba(248,248,248,0.88)_34%,rgba(248,248,248,0.45)_64%,rgba(248,248,248,0.08)_100%)] dark:md:bg-[linear-gradient(90deg,rgba(10,14,23,0.94)_0%,rgba(10,14,23,0.74)_40%,rgba(10,14,23,0.34)_70%,rgba(10,14,23,0.08)_100%)]"
        />

        {/* Contenido: mismo contenedor de 1240px que el resto; el formulario
            (620px) queda alineado a la izquierda de esa banda. */}
        <div className="relative z-[2] mx-auto w-full max-w-[1240px] px-6 py-16 md:py-20">
          <div className="w-full max-w-[620px] max-md:rounded-2xl max-md:bg-[#f8f8f8]/85 max-md:p-6 max-md:shadow-[0_8px_40px_rgba(10,14,23,0.25)] max-md:ring-1 max-md:ring-black/5 max-md:backdrop-blur-xl max-md:dark:bg-[#191825]/80 max-md:dark:ring-white/10">
            <p className="mb-2.5 font-heading text-sm font-medium uppercase tracking-[3px] text-[#FC5185] dark:text-[#2ee6b6]">
              {t("CONTACT_EYEBROW")}
            </p>
            <h2 className="mb-10 font-heading text-[38px] font-bold leading-[1.08] text-gray-900 dark:text-[#f2f5fa] md:text-[46px]">
              {t("CONTACT_HEADLINE_1")}{" "}
              <span className="text-[#FC5185] dark:text-[#2ee6b6]">
                {t("CONTACT_HEADLINE_ACCENT")}
              </span>{" "}
              {t("CONTACT_HEADLINE_2")}
            </h2>

            <ContactForm />
          </div>
        </div>

        {/* Back to top */}
        <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-[2] hidden md:block">
          <Link href="/#home" scroll={false} aria-label="Back to top">
            <div className="rounded-full bg-white/60 p-4 text-gray-700 backdrop-blur-sm transition hover:-translate-y-1 hover:text-[#FC5185] dark:bg-white/10 dark:text-[#f2f5fa] dark:hover:text-[#2ee6b6]">
              <HiOutlineChevronDoubleUp size={22} />
            </div>
          </Link>
        </div>
      </section>
    </GoogleReCaptchaProvider>
  );
};

export default Contact;
