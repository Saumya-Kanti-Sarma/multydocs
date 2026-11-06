import type { Metadata } from "next";
import CertificatePage from "./CertificatePage";

export const metadata: Metadata = {
  title: "Free Bulk Certificate Generator Online (CSV/Excel to Certificates) | MultyDocs",
  description:
    "Free bulk certificate generator. Upload your PNG/JPG template, import a CSV, map fields and download hundreds of personalized certificates as a ZIP. No sign-up required.",
  alternates: {
    canonical: "https://multydocs.in/",
  },
  openGraph: {
    title: "Free Bulk Certificate Generator Online (CSV/Excel to Certificates) | MultyDocs",
    description:
      "Free bulk certificate generator. Upload your PNG/JPG template, import a CSV, map fields and download hundreds of personalized certificates as a ZIP. No sign-up required.",
    type: "website",
    url: "https://multydocs.in/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MultyDocs free bulk certificate generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Bulk Certificate Generator Online (CSV/Excel to Certificates) | MultyDocs",
    description:
      "Free bulk certificate generator. Upload your PNG/JPG template, import a CSV, map fields and download hundreds of personalized certificates as a ZIP. No sign-up required.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return <CertificatePage />;
}
