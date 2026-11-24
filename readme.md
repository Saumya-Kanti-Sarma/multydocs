<p align="center">
  <a href="https://multydocs.in/" target="_blank">
    <img src="https://multydocs.in/logo.svg" alt="MultyDocs Logo" width="120" />
  </a>
</p>

<h1 align="center">MultyDocs</h1>

<p align="center">
  Open-source, full-stack certificate management platform for bulk certificate generation, email delivery, and authentication.
</p>

<p align="center">
  <a href="https://multydocs.in/" target="_blank">
    <img src="https://img.shields.io/badge/Website-multydocs.in-000000?style=for-the-badge" alt="Website" />
  </a>
  <a href="https://app.multydocs.in" target="_blank">
    <img src="https://img.shields.io/badge/Web%20App-app.multydocs.in-000000?style=for-the-badge" alt="Web App" />
  </a>
  <a href="https://github.com/Saumya-Kanti-Sarma/multydocs" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Source%20Code-000000?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
</p>

---

## About MultyDocs

MultyDocs is an open-source, full-stack certificate management platform. It lets you generate certificates in bulk, deliver them to recipients by email, and authenticate them. Bulk generation is free and needs no account or sign-up.

Upload a certificate template (PNG or JPG), add recipient data from a CSV file or by pasting it, position the fields on the template, and download every generated certificate as a single ZIP file. Email delivery and certificate authentication require a verified account and use a prepaid credit system.

MultyDocs is used mainly by schools, colleges, event organizers, HR teams, and hackathon organizers.

---

## Core pages

| Page | Description | Link |
|------|-------------|------|
| Home | Upload a certificate template and start generating certificates for free, with no sign-up. | [multydocs.in](https://multydocs.in) |
| FAQs | Answers to common questions about bulk certificate generation. | [multydocs.in/faqs](https://multydocs.in/faqs) |
| Web app | The main application where certificates are generated, delivered, and authenticated. | [app.multydocs.in](https://app.multydocs.in) |
| Register | Create an account to deliver and authenticate certificates. | [getstarted.multydocs.in/register](https://getstarted.multydocs.in/register) |
| Login | Sign in to an existing account. | [getstarted.multydocs.in/login](https://getstarted.multydocs.in/login) |

---

## Guides

- [How to generate bulk certificates](https://multydocs.in/blogs/how-to-generate-bulk-certificates) — Step-by-step guide to bulk certificate generation.
- [How to generate bulk certificates for free](https://multydocs.in/blogs/how-to-generate-bulk-certificates-for-free) — Generate bulk certificates without signing up.
- [Canva alternative for bulk certificates](https://multydocs.in/blogs/how-to-generate-bulk-certificates-canva-alternative) — Using MultyDocs as an alternative to Canva for bulk certificates.
- [Bulk certificates for hackathons](https://multydocs.in/blogs/how-to-generate-many-certificates-for-hackathon) — Generating many certificates for a hackathon.
- [Same certificate for many users](https://multydocs.in/blogs/how-to-create-same-certificate-for-many-users-for-free) — Creating certificates for many users at no cost.

Watch the [YouTube tutorial](https://youtu.be/itvQxmU-wts).

---

## How bulk generation works

1. Upload your certificate template (PNG or JPG).
2. Add recipient data (names, dates, scores, etc.) by pasting it or uploading a CSV file.
3. Map CSV columns to text fields on the template and adjust their position and style.
4. Click download. All certificates are generated and delivered as a ZIP file.

To deliver certificates by email automatically, create and verify an account, and make sure your data includes an email column.

---

## Pricing

- **Bulk certificate generation:** free, unlimited, no account required.
- **Email delivery and authentication:** requires a verified account and uses prepaid credits.
- **Credit recharge amounts:** ₹25, ₹50, ₹100, ₹250, ₹500, ₹1000.
- **Cost of sending emails:** ₹12 per 100 emails.
- **Payment:** any Indian credit/debit card or UPI, processed through Razorpay.
- **Sign-up bonus:** ₹200 in credits after you register and verify your account.
- **Authentication:** certificates stay validated for 1 year. Annual renewal costs ₹199.

---

## Optional

- [Sitemap](https://multydocs.in/sitemap.xml): Full list of public pages.
- [robots.txt](https://multydocs.in/robots.txt): Crawler rules.
- [GitHub repository](https://github.com/Saumya-Kanti-Sarma/multydocs): Source code (open source).
- [Delete account](https://getstarted.multydocs.in/delete-account): Account deletion page.
- Support: support@mail.multydocs.in
- Founder: developer.saumyasarma@gmail.com

---

## Tech stack

MultyDocs is a monorepo with three parts:

| Folder | Purpose | Tech |
|--------|---------|------|
| `multydocs/` | Web app (app.multydocs.in) | Next.js 16, React 19, Tailwind CSS |
| `express-server/` | Backend API (email delivery, auth, credits) | Express, Cloudflare Workers, TypeScript |
| `onboarding/` | Register/login flows (getstarted.multydocs.in) | Vite, React 19, Tailwind CSS |


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is open source. See the [GitHub repository](https://github.com/Saumya-Kanti-Sarma/multydocs) for details.
