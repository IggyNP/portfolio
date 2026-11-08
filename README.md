# iggynp.com — Portfolio

Personal portfolio of Ignacio Navarro (IggyNP), product engineer. Bilingual (EN/ES), scroll-driven, with light/dark themes.

**Live:** [iggynp.com](https://iggynp.com)

## Stack

- [Next.js 13](https://nextjs.org/) (Pages Router) + React 18
- [Tailwind CSS](https://tailwindcss.com/) with class-based dark mode ([next-themes](https://github.com/pacocoursey/next-themes))
- [Framer Motion](https://www.framer.com/motion/) for scroll-driven animations
- [next-i18next](https://github.com/i18next/next-i18next) for EN/ES localization
- Contact form: reCAPTCHA v3 + [Resend](https://resend.com/) via API route, with best-effort in-memory rate limiting
- Deployed on [Vercel](https://vercel.com/)

## Getting started

Requires Node 20 (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See [`.env.example`](.env.example) for the full list: reCAPTCHA v3 keys, the Resend API key + destination address for the contact form, and `MAINTENANCE_MODE`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (also runs in CI) |

## Notes

- **i18n:** translations live in `public/locales/{en,es}/common.json`. The dev server must be restarted after editing them.
- **Branches:** `develop` is the working branch (previews); `main` is production. The maintenance page is toggled per-environment with `MAINTENANCE_MODE`, not with code.
- **CI:** GitHub Actions runs `lint` + `build` on pushes and PRs to `develop` and `main`.
