import nodemailer from "nodemailer";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { fullName, email, subject, message, token } = req.body;

  if (!fullName || !email || !subject || !message || !token) {
    return res.status(400).json({ success: false });
  }

  try {
    // Verificar reCAPTCHA
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" }
    );

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ success: false });
    }

    // Configurar SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.tu-servidor.com", // ej: smtp.gmail.com
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[Contacto] ${subject}`,
      text: `De: ${fullName} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
