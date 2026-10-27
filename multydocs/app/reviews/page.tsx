import type { Metadata } from "next";
import Navbar from "@/Components/Navbar/Navbar";
import ReviewsPageContent from "@/Components/ReviewsPage/ReviewsPage";

export const metadata: Metadata = {
  title: "Reviews — MultyDocs",
  description: "See what educators, HR managers, event organisers and more say about MultyDocs.",
};

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      <ReviewsPageContent />
    </>
  );
}
