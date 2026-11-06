import type { Metadata } from "next";
import Navbar from "@/Components/Navbar/Navbar";
import FaqsPageContent from "@/Components/FaqsPage/FaqsPage";

export const metadata: Metadata = {
  title: "FAQs: Bulk Certificate Generator",
  description:
    "Frequently asked questions about MultyDocs, the free bulk certificate generator: CSV import, PNG/JPG templates, ZIP download, limits and no sign-up.",
  alternates: {
    canonical: "https://multydocs.in/faqs",
  },
  openGraph: {
    title: "FAQs: Bulk Certificate Generator",
    description:
      "Frequently asked questions about MultyDocs, the free bulk certificate generator: CSV import, PNG/JPG templates, ZIP download, limits and no sign-up.",
    url: "https://multydocs.in/faqs",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MultyDocs FAQs - bulk certificate generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs: Bulk Certificate Generator",
    description:
      "Frequently asked questions about MultyDocs, the free bulk certificate generator: CSV import, PNG/JPG templates, ZIP download, limits and no sign-up.",
    images: ["/og-image.png"],
  },
};

export default function FaqsPage() {
  return (
    <>
      <Navbar />
      <FaqsPageContent />
    </>
  );
}
