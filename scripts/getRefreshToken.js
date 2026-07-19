const readline = require("readline");
const dotenv = require("dotenv");
const { google } = require("googleapis");

dotenv.config({ path: ".env.local" });

const oAuth2Client = new google.auth.OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "http://localhost:3000/oauth2callback",
);

const SCOPES = ["https://mail.google.com/"];

async function generateToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("\nAbre esta URL en el navegador:\n");
  console.log(authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\nPega aquí el código que aparece en la URL: ", async (code) => {
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      console.log("\nREFRESH TOKEN:\n");
      console.log(tokens.refresh_token);
      rl.close();
    } catch (err) {
      console.error("Error obteniendo token:", err);
      rl.close();
    }
  });
}

generateToken();
