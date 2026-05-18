This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Защита панели оператора

Раздел `/operator` защищён аутентификацией по логину/паролю с JWT-сессией в httpOnly cookie.

### Настройка

1. Сгенерировать bcrypt-хеш пароля:
   ```bash
   node scripts/generate-password-hash.mjs "ваш-надёжный-пароль"
   ```
   Скопировать вывод в `.env.local`.
2. Сгенерировать JWT-секрет:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. В `.env.local` задать:
   ```
   OPERATOR_LOGIN=admin
   OPERATOR_PASSWORD_HASH=...
   JWT_SECRET=...
   ```
4. На Vercel — добавить те же три переменные в Project Settings → Environment Variables → Production (после сохранения сделать Redeploy).

### Архитектура

- `app/lib/auth.ts` — bcryptjs (проверка пароля) + jose (подпись/проверка JWT).
- `app/api/operator/login` — выдаёт HS256-JWT в httpOnly cookie на 8 часов.
- `app/api/operator/logout` — стирает cookie.
- `middleware.ts` — проверяет JWT на каждом запросе к `/operator/**` и редиректит на форму логина при отсутствии или истечении токена.

Cookie настроено как `httpOnly`, `sameSite=lax`, `secure` в проде — защита от XSS и CSRF.

