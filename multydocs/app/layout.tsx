import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import Footer from "@/Components/Footer/Footer";


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
      <body>
        {children}
        <Footer />
      </body>

    </html>
  );
}