import type { Metadata } from "next";
import Navbar from "@/Components/Navbar/Navbar";
import FaqsPageContent from "@/Components/FaqsPage/FaqsPage";

export const metadata: Metadata = {
  title: "FAQs — MultyDocs",
  description: "Frequently asked questions about MultyDocs — the free bulk certificate, report card and ID generator.",
};

export default function FaqsPage() {
  return (
    <>
      <Navbar />
      <FaqsPageContent />
    </>
  );
}
