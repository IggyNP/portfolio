import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Remitente: dominio verificado en Resend (iggynp.com). Destinatario real en
// EMAIL_TO. El replyTo apunta a quien rellena el formulario.
const FROM = "Portfolio iggynp.com <dev@iggynp.com>";

// Límites defensivos: la API no confía en el cliente aunque el formulario
// ya restrinja los campos.
const MAX_LENGTHS = { fullName: 100, email: 200, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting best-effort en memoria. En serverless solo cubre ráfagas
// desde una instancia caliente (no es global entre instancias/regiones);
// la defensa principal sigue siendo reCAPTCHA v3. Upgrade durable: Upstash.
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_MAX = 5; // envíos por IP y ventana
const rateHits = new Map(); // ip -> number[] (timestamps)

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (rateHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    rateHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateHits.set(ip, recent);
  return false;
}

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ success: false, message: "Too many requests" });
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

    if (
      !recaptchaData.success ||                  // token inválido
      recaptchaData.action !== "contact_form" || // acción diferente
      recaptchaData.score < 0.5                  // score demasiado bajo
    ) {
      return res.status(400).json({ success: false, message: "reCAPTCHA failed" });
    }

    // --- Enviar email con Resend ---
    const { error } = await resend.emails.send({
      from: FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[Contacto] ${subject}`,
      text: `De: ${fullName} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return res.status(502).json({ success: false, message: "Email send failed" });
    }

    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
