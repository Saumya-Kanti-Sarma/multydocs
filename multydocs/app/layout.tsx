import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import Footer from "@/Components/Footer/Footer";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("https://multydocs.in"),

  title: {
    default: "Free Bulk Certificate Generator Online (CSV/Excel to Certificates)",
    template: "%s | MultyDocs",
  },
  description:
    "Generate bulk certificates effortlessly. Upload your design and create professional certificates in minutes.",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: {
      default: "MultyDocs",
      template: "%s | MultyDocs",
    },
    description:
      "Generate professional certificates in bulk with ease.",
    siteName: "MultyDocs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MultyDocs - free bulk certificate generator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: {
      default: "MultyDocs",
      template: "%s | MultyDocs",
    },
    description: "Generate professional certificates in bulk with ease.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://multydocs.in/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={inter.className}>
      <body>
        {children}
        <Footer />
      </body>

    </html>
  );
}