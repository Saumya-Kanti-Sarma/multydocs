import type { Metadata } from "next";
import Navbar from "@/Components/Navbar/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Certificates from Excel or CSV in Bulk",
  description:
    "Create certificates from Excel or CSV in bulk: export as CSV, upload to MultyDocs, map fields and download certificates as a ZIP. Free, no sign-up.",
  alternates: {
    canonical: "https://multydocs.in/excel-to-certificate-generator",
  },
  openGraph: {
    title: "Create Certificates from Excel or CSV in Bulk",
    description:
      "Create certificates from Excel or CSV in bulk: export as CSV, upload to MultyDocs, map fields and download certificates as a ZIP. Free, no sign-up.",
    url: "https://multydocs.in/excel-to-certificate-generator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MultyDocs create certificates from Excel or CSV in bulk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Certificates from Excel or CSV in Bulk",
    description:
      "Create certificates from Excel or CSV in bulk: export as CSV, upload to MultyDocs, map fields and download certificates as a ZIP. Free, no sign-up.",
    images: ["/og-image.png"],
  },
};

const excelSteps = [
  {
    title: "Export your spreadsheet as CSV",
    description:
      "Open your Excel file, go to File &rarr; Save As, choose CSV UTF-8 (.csv) and save it. In Google Sheets, go to File &rarr; Download &rarr; Comma Separated Values (.csv). MultyDocs reads CSV files, so this export step is required.",
  },
  {
    title: "Upload your certificate template",
    description:
      "Go to MultyDocs and upload your certificate design in PNG or JPG format. This becomes the base layout used for every certificate.",
  },
  {
    title: "Upload the CSV and map fields",
    description:
      "Upload the exported CSV, then position text fields on your template and connect each field to the matching CSV column, for example Name to the name field on your certificate.",
  },
  {
    title: "Generate and download the ZIP",
    description:
      "Click generate to create one personalized certificate per CSV row, then download all certificates together in a ZIP file.",
  },
];

const faqs = [
  {
    question: "Can MultyDocs read Excel files directly?",
    answer:
      "No. MultyDocs reads CSV files. Save your Excel workbook as CSV UTF-8 first (File &rarr; Save As &rarr; CSV UTF-8), then upload the CSV to MultyDocs.",
  },
  {
    question: "Can I use Google Sheets instead of Excel?",
    answer:
      "Yes. In Google Sheets, go to File &rarr; Download &rarr; Comma Separated Values (.csv) and upload the downloaded file to MultyDocs.",
  },
  {
    question: "What columns should my CSV have?",
    answer:
      "One column per piece of information &mdash; for example Name, Course and Date &mdash; with one row per certificate. The first row must be a header row with column names.",
  },
  {
    question: "Is MultyDocs free and do I need an account?",
    answer:
      "Yes. Bulk certificate generation on MultyDocs is free and no sign-up or account creation is required.",
  },
];

export default function ExcelToCertificatePage() {
  return (
    <>
      <Navbar />

      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-(--text) mb-6">
          Create Certificates from Excel or CSV for Multiple Users
        </h1>

        <p className="text-(--text-gray) leading-relaxed mb-6">
          MultyDocs is a free bulk certificate generator that works with CSV
          data: you upload a PNG or JPG certificate template, import a CSV
          with recipient details, map the columns to the fields on your
          template, and generate personalized certificates for multiple users
          at once. Because MultyDocs reads CSV files, an Excel spreadsheet
          must first be exported as CSV before it can be used. This guide
          shows how to export from Excel and Google Sheets, what the CSV
          should look like, and the steps to generate certificates in bulk.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mt-10 mb-4">
          1. Export Your Spreadsheet as CSV
        </h2>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Microsoft Excel does not save CSV files directly from the regular
          Save command in all versions. Use File &rarr; Save As, choose
          <strong>CSV UTF-8 (.csv)</strong> as the file format, and save the
          file. UTF-8 encoding matters because it keeps accents and special
          characters in names intact.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          In Google Sheets, open your spreadsheet, go to File &rarr;
          Download &rarr; Comma Separated Values (.csv). The downloaded file
          is ready to upload to MultyDocs.
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mt-10 mb-4">
          2. What Your CSV Should Look Like
        </h2>
        <p className="text-(--text-gray) leading-relaxed mb-4">
          Your CSV needs one header row followed by one row per recipient.
          Here is a sample CSV with five fake rows:
        </p>
        <div className="overflow-x-auto mb-6 border border-gray-200 rounded-xl">
          <table className="w-full text-sm sm:text-base text-(--text-gray)">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-3 text-left font-semibold text-(--text)">
                  Name
                </th>
                <th className="border border-gray-200 p-3 text-left font-semibold text-(--text)">
                  Course
                </th>
                <th className="border border-gray-200 p-3 text-left font-semibold text-(--text)">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-3">Aarav Mehta</td>
                <td className="border border-gray-200 p-3">Python Programming</td>
                <td className="border border-gray-200 p-3">2026-11-01</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-3">Sneha Reddy</td>
                <td className="border border-gray-200 p-3">Web Development</td>
                <td className="border border-gray-200 p-3">2026-10-15</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-3">Arjun Singh</td>
                <td className="border border-gray-200 p-3">Data Science</td>
                <td className="border border-gray-200 p-3">2026-09-20</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-3">Isha Kapoor</td>
                <td className="border border-gray-200 p-3">Graphic Design</td>
                <td className="border border-gray-200 p-3">2026-08-10</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-3">Kabir Verma</td>
                <td className="border border-gray-200 p-3">Business Communication</td>
                <td className="border border-gray-200 p-3">2026-07-05</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Download this sample file to try the flow:
          <Link
            href="/sample-certificates.csv"
            className="text-(--brand-orange) font-medium underline underline-offset-4 hover:opacity-80"
          >
            sample-certificates.csv
          </Link>
          .
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mt-10 mb-4">
          3. Common Mistakes to Avoid
        </h2>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>
            <strong>Wrong encoding:</strong> save as CSV UTF-8 so names with
            accents or special characters import correctly.
          </li>
          <li>
            <strong>Extra commas:</strong> commas inside a value break the
            column structure unless the value is quoted.
          </li>
          <li>
            <strong>Merged cells:</strong> unmerge all cells before saving;
            merged cells do not convert to CSV cleanly.
          </li>
          <li>
            <strong>Blank rows or multiple header rows:</strong> keep one
            header row and one row per recipient only.
          </li>
        </ul>

        <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mt-10 mb-4">
          4. Generate Certificates in Bulk
        </h2>
        {excelSteps.map((step, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-lg font-semibold text-(--text) mb-2">
              {i + 1}. {step.title}
            </h3>
            <p className="text-(--text-gray) leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}

        <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mt-10 mb-4">
          Related Guides
        </h2>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>
            <Link
              href="/blogs/how-to-generate-bulk-certificates"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              How to Create Bulk Certificates (Step-by-Step Guide)
            </Link>
          </li>
          <li>
            <Link
              href="/blogs/how-to-generate-bulk-certificates-for-free"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              Free Online Bulk Certificate Generator: No Sign-Up
            </Link>
          </li>
        </ul>

        <div className="mt-10 rounded-xl border border-(--brand-orange)/20 bg-(--bg)/40 p-6">
          <p className="font-semibold text-(--text) mb-2">
            Generate certificates from your CSV now
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-(--brand-orange) px-8 py-3 font-bold text-white hover:opacity-90 transition-opacity"
          >
            Start generating bulk certificates for free
          </Link>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-200 bg-white p-5"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-(--text)">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="text-xl text-(--brand-orange) transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-(--text-gray)">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
