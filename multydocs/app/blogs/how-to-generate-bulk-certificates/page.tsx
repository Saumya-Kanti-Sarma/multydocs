import type { Metadata } from "next";
import Navbar from "@/Components/Navbar/Navbar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "How to Generate Bulk Certificates | MultyDocs",
  description:
    "Learn how to generate bulk certificates online with MultyDocs. Upload your template, import CSV data, map fields and create personalized certificates for hundreds of recipients.",
  openGraph: {
    title: "How to Generate Bulk Certificates | MultyDocs",
    images: "/blogs/th1.webp",
    description:
      "Step-by-step guide to bulk certificate generation using MultyDocs, the free bulk certificate generator.",
    url: "https://multydocs.in/blogs/how-to-generate-bulk-certificates",
    siteName: "MultyDocs",
    type: "article",
  },
};

export default function GenerateBulkCertificatesPage() {
  return (
    <>
      <Navbar />

      <section className="px-6 py-20 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-black text-(--text) mb-6">
          How to Generate Bulk Certificates For free using multyDocs
        </h1>
        <div className="flex justify-center mb-6">
          <Image
            src={"/blogs/th1.webp"}
            alt="MultyDocs bulk certificate generator interface showing template upload and CSV mapping"
            width={800}
            height={400}
            className="rounded-xl shadow-md"
          />
        </div>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Instead of editing each certificate one by one, use <a href="https://multydocs.in" target="blank"><i><u className="text-(--brand-orange) font-medium underline underline-offset-4 hover:opacity-80">multyDocs</u> </i></a> to generate certificates for bulk audience. Just upload your
          certificate design, provide recipient data in a CSV file, map the
          columns to your template fields and generate all certificates at
          once. MultyDocs makes this fast, free and requires no sign-up. Below the complete steps are described in detail:
        </p>

        <a
          href="https://multydocs.in"
          target="_blank"
          rel="noopener noreferrer"
          className=" w-full text-center mt-7 inline-block rounded-xl bg-(--brand-orange) px-8 py-4 font-bold text-white hover:opacity-90 transition-opacity"
        >
          Try Multydocs Now
        </a>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 1: Upload Your Certificate Template
        </h3>
        <div className="flex justify-center mb-6">
          <Image
            src={"/blogs/img1.webp"}
            alt="Step 1: Upload certificate template in PNG or JPG format"
            width={600}
            height={300}
            className="rounded-xl shadow-md"
          />
        </div>

        <p className="text-(--text-gray) leading-relaxed mb-6">
          Start by uploading your existing certificate design in PNG or JPG
          format. This becomes the base layout that every generated
          certificate will use. Make sure your template has clear space for
          names, dates, scores and other variable details.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 2: Add Recipient Data with a CSV File
        </h3>
        <div className="flex justify-center mb-6">
          <Image
            src={"/blogs/img2.webp"}
            alt="Step 2: Add recipient data using a CSV file"
            width={600}
            height={300}
            className="rounded-xl shadow-md"
          />
        </div>

        <p className="text-(--text-gray) leading-relaxed mb-6">
          Prepare a CSV file containing one row per recipient. Common columns
          include name, date, course, score and instructor. Upload the CSV to
          MultyDocs so each row can be turned into a separate personalized
          certificate.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 3: Map CSV Columns to Template Fields
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Position text fields on your uploaded template and connect each
          field to the matching CSV column. For example, map the Name column
          to the name placeholder on your certificate. MultyDocs lets
          you drag and position fields visually.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 4: Generate and Download Certificates
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Click generate to create personalized certificates for every
          recipient in your CSV. Once generated, download all certificates
          together in a ZIP file for easy distribution.
        </p>

        <a
          href="https://multydocs.in"
          target="_blank"
          rel="noopener noreferrer"
          className=" w-full text-center mt-7 inline-block rounded-xl bg-(--brand-orange) px-8 py-4 font-bold text-white hover:opacity-90 transition-opacity"
        >
          Generate Certificates for Free
        </a>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Why Use MultyDocs for Bulk Certificates?
        </h4>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          MultyDocs is a free bulk certificate generator that requires no
          account. You can upload your own design, import CSV data, map
          fields and generate hundreds of certificates in minutes. It is
          ideal for schools, colleges, event organizers, HR teams and anyone
          who needs to issue many certificates at once.
        </p>

        <p className="text-(--text-gray) leading-relaxed mb-8">
          Ready to get started? Visit{" "}
          <a
            href="https://multydocs.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--brand-orange) font-medium underline underline-offset-4 hover:opacity-80"
          >
            https://multydocs.in
          </a>
          {" "}and generate your bulk certificates for free.
        </p>

        <h5 className="text-base font-semibold text-(--text) mt-8 mb-2">
          Related Resources
        </h5>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-8">
          <li>
            <a
              href="https://multydocs.in/blogs/how-to-generate-bulk-certificates-for-free"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              How to Generate Bulk Certificates for Free
            </a>
          </li>
          <li>
            <a
              href="https://multydocs.in/blogs/how-to-generate-bulk-certificates-canva-alternative"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              Bulk Certificates: A Canva Alternative
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
