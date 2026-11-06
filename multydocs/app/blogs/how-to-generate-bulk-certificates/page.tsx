import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/Components/Navbar/Navbar";
import Image from "next/image";
import { blogs } from "@/data/blogs";

const post = blogs.find((p) => p.slug === "how-to-generate-bulk-certificates")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: {
    canonical: `https://multydocs.in/blogs/${post.slug}`,
  },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `https://multydocs.in/blogs/${post.slug}`,
    type: "article",
    images: [
      {
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
  },
  twitter: {
    title: post.title,
    description: post.description,
    images: [post.image],
  },
};

export default function GenerateBulkCertificatesPage() {
  return (
    <>
      <Navbar />

      <nav className="max-w-4xl mx-auto px-6 pb-4 text-sm text-(--text-gray)">
        <Link href="/" className="text-(--brand-orange) hover:underline">
          Home
        </Link>{" › "}
        <Link href="/blogs" className="text-(--brand-orange) hover:underline">
          Blog
        </Link>{" › "}
        <span className="text-(--text) font-semibold">{post.title}</span>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://multydocs.in/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://multydocs.in/blogs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://multydocs.in/blogs/${post.slug}`,
              },
            ],
          }),
        }}
      />

      <section className="px-6 py-20 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-black text-(--text) mb-6">
          How to Create Bulk Certificates (Step-by-Step Guide)
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
          Creating certificates one by one is slow. If you need to issue
          certificates to dozens or hundreds of people, the fastest way is to{" "}
          <em>create bulk certificates</em> in one go: upload your certificate
          design once, provide the recipient details in a CSV file, map the
          columns to the text fields on your template, and generate every
          certificate at once. MultyDocs is a free bulk certificate generator
          built exactly for this workflow — upload your PNG or JPG template,
          import your CSV, map the fields and download all certificates as a
          ZIP file. No account or sign-up is required.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          This guide walks you through the complete process of how to create
          bulk certificates online: preparing your template and CSV file,
          mapping fields, generating the certificates and downloading the
          final ZIP. Whether you are a school teacher, college event
          organizer, HR manager or coach, the steps are the same.
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
          certificate will use, so pick the design you want every recipient
          to receive. Make sure your template has clear empty space for
          names, dates, scores and other variable details, and avoid placing
          important text too close to the edges where it could get cut off.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          MultyDocs runs entirely in your browser, so your template image is
          not uploaded to any server. It stays on your device while you
          position the fields.
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
          Prepare a CSV file (comma-separated values) containing one row per
          recipient. Common columns include name, date, course, score and
          instructor. The first row should be the header row with column
          names, and every following row is one recipient. Save the file with
          UTF-8 encoding so names with accents or special characters import
          correctly. Upload the CSV to MultyDocs so each row can be turned
          into a separate personalized certificate.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 3: Map CSV Columns to Template Fields
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Position text fields on your uploaded template and connect each
          field to the matching CSV column. For example, map the Name column
          to the name placeholder on your certificate. MultyDocs lets you
          drag and position fields visually, so you can place names, dates
          and scores exactly where they look right on your design. You can
          adjust font position for every field before generating.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 4: Generate and Download Certificates
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Click generate to create personalized certificates for every
          recipient in your CSV at once. Each row becomes one certificate
          with the mapped data filled in automatically. Once generated,
          download all certificates together in a single ZIP file for easy
          distribution — no need to save files one by one.
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

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          How to Prepare Your CSV for Bulk Certificates
        </h4>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Your CSV should have a header row followed by one row per
          recipient. Use simple column names such as name, date, course and
          score. Avoid merged cells, extra commas inside values and trailing
          spaces. If your recipients&rsquo; names contain accents or special
          characters (for example Jos&eacute; or Ren&eacute;), save the CSV
          with UTF-8 encoding so the text renders correctly on the
          certificates.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Keep recipient names short enough to fit the space you left on the
          template. Very long names can overlap other fields, so preview the
          generated certificates before distributing them. Inside the ZIP
          file, each certificate is saved as a separate image, so you can
          rename or sort the files however you need.
        </p>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Tips for Clean Bulk Certificates
        </h4>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>
            Use one template and one CSV per batch so every certificate in
            the ZIP shares the same layout.
          </li>
          <li>
            Leave generous empty space on your template for variable fields
            such as name, date and score.
          </li>
          <li>
            Double-check the column mapping before you generate &mdash; the
            Name column should connect to the name field on your template.
          </li>
          <li>
            Generate in batches if you have thousands of recipients, so the
            ZIP stays easy to handle.
          </li>
        </ul>

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
          Related Guides
        </h5>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>
            <Link
              href="/blogs/how-to-generate-bulk-certificates-for-free"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              Free Online Bulk Certificate Generator: No Sign-Up
            </Link>
          </li>
          <li>
            <Link
              href="/blogs/how-to-generate-bulk-certificates-canva-alternative"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              Canva Bulk Create Alternative: Free Bulk Certificates
            </Link>
          </li>
          <li>
            <Link
              href="/blogs/how-to-create-same-certificate-for-many-users-for-free"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              Generate Many Certificates for Many Users from One Template
            </Link>
          </li>
        </ul>

        <div className="mt-10 rounded-xl border border-(--brand-orange)/20 bg-(--bg)/40 p-6">
          <p className="font-semibold text-(--text) mb-2">
            Generate certificates now
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-(--brand-orange) px-8 py-3 font-bold text-white hover:opacity-90 transition-opacity"
          >
            Start creating bulk certificates for free
          </Link>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description,
              image: `https://multydocs.in${post.image}`,
              datePublished: post.datePublished,
              dateModified: post.dateModified,
              author: { "@type": "Person", name: post.author.name },
              publisher: {
                "@type": "Organization",
                name: "MultyDocs",
                url: "https://multydocs.in",
              },
            }),
          }}
        />
      </section>
    </>
  );
}
