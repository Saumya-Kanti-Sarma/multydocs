import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/Components/Navbar/Navbar";
import { TbError404 } from "react-icons/tb";
import { BsArrowLeft } from "react-icons/bs";

export const metadata: Metadata = {
  title: "404 — Page Not Found · MultyDocs",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-(--body-height) flex-col items-center justify-center gap-6 px-6 text-center bg-white">
        <TbError404 className="h-28 w-28 text-(--brand-orange)" aria-hidden="true" />

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-(--text)">Page Not Found</h1>
          <p className="text-base text-(--text-gray) max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-(--text) px-6 py-3 text-sm font-semibold text-white
                     hover:opacity-80 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <BsArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </main>
    </>
  );
}
