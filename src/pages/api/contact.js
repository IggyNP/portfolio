import nodemailer from "nodemailer";

// Límites defensivos: la API no confía en el cliente aunque el formulario
// ya restrinja los campos.
const MAX_LENGTHS = { fullName: 100, email: 200, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { fullName, email, subject, message, token } = req.body ?? {};

  const invalidField = Object.entries({ fullName, email, subject, message }).some(
    ([field, value]) =>
      typeof value !== "string" ||
      !value.trim() ||
      value.length > MAX_LENGTHS[field],
  );

  if (invalidField || typeof token !== "string" || !token || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid fields" });
  }

  try {
    // --- Verificar reCAPTCHA v3 ---
    const recaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      }
    );

    const recaptchaData = await recaptchaRes.json();

    // Validación extra para v3
    if (
      !recaptchaData.success ||                  // token inválido
      recaptchaData.action !== "contact_form" || // acción diferente
      recaptchaData.score < 0.5                  // score demasiado bajo
    ) {
      return res.status(400).json({ success: false, message: "reCAPTCHA failed" });
    }

    // --- Configurar nodemailer ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      },
    });

    // --- Enviar email ---
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[Contacto] ${subject}`,
      text: `De: ${fullName} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
