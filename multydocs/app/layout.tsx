import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import Image from "next/image";


const inter = Inter({ subsets: ['latin'] })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://multydocs.developer-saumyasarma.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "MultyDocs",
  description:
    "Generate bulk certificates effortlessly. Upload your design and create professional certificates in minutes.",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "MultyDocs",
    description:
      "Generate professional certificates in bulk with ease.",
    url: siteUrl,
    siteName: "MultyDocs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MultyDocs",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MultyDocs",
    description: "Generate professional certificates in bulk with ease.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}
        <footer className="bg-(--primary) px-6 pt-16 pb-8 text-white">
          <div className="mx-auto max-w-7xl">

            {/* Top grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">

              {/* Col 1 — Brand */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Image src="/white-logo.svg" alt="MultyDocs logo" width={36} height={36} />
                  <span className="text-lg font-black text-(--bg)">MultyDocs</span>
                </div>
                <p className="text-xs leading-relaxed text-white/50">
                  Generate certificates, report cards and IDs in bulk — free, fast and right in your browser.
                </p>
              </div>

              {/* Col 2 — Pages */}
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">All Pages</h3>
                <ul className="flex flex-col gap-3">
                  {[
                    { label: "Home", href: "/" },
                    { label: "FAQs", href: "/faqs" },
                    { label: "Reviews", href: "/reviews" },
                    { label: "GitHub", href: "https://github.com/Saumya-Kanti-Sarma/multydocs" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 — Socials */}
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Social Handles</h3>
                <ul className="flex flex-col gap-3">
                  {[
                    { label: "X: @wanderingIqpky", href: "https://x.com/wanderingIqpky" },
                    { label: "Instagram: @wanderingint", href: "https://instagram.com/wanderingint" },
                    { label: "wanderingint@gmail.com", href: "mailto:wanderingint@gmail.com" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/60 hover:text-white transition-colors duration-200 break-all"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4 — Founders */}

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Founder</h3>
                <p className="mb-4 text-sm font-semibold text-(--bg)"> Saumya Kanti Sarma</p>
                <ul className="flex flex-col gap-3">
                  {[
                    { label: "X: @devloper_saumya", href: "https://x.com/devloper_saumya" },
                    { label: "Instagram: @saumya_sama", href: "https://instagram.com/saumya_sama" },
                    { label: "developer.saumyasarma@gmail.com", href: "mailto:developer.saumyasarma@gmail.com" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/60 hover:text-white transition-colors duration-200 break-all"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 5 — Open Source */}
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Open Source</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/60">
                  <Link href="/" className="underline">MultyDocs</Link> is fully open source. Everyone is welcome for contribution.
                </p>
                <a
                  href="https://github.com/Saumya-Kanti-Sarma/multydocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white
                             hover:bg-white/20 transition-colors duration-200"
                >
                  <BsGithub className="h-4 w-4" />
                  Star on GitHub
                </a>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
              <p>© 2026 MultyDocs - All rights reserved</p>
              <p>Built by <a href="https://saumya-sarma.pages.dev" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">Saumya Kanti Sarma</a></p>
            </div>

          </div>
        </footer>
      </body>

    </html>
  );
}