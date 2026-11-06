import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/Components/Navbar/Navbar";
import Image from "next/image";
import { blogs } from "@/data/blogs";

const post = blogs.find(
  (p) => p.slug === "how-to-create-same-certificate-for-many-users-for-free"
)!;

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

export default function CreateSameCertificateManyUsersPage() {
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

      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-(--text) mb-6">
          Generate Many Certificates for Many Users from One Template
        </h1>
        <Image
          src={"/blogs/th2.webp"}
          alt="MultyDocs bulk certificate generator interface showing template upload and CSV mapping"
          width={800}
          height={400}
          className="rounded-xl shadow-md"
        />
        <br />
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Need to issue the same certificate to many users? Whether it is a
          training completion certificate, a workshop attendance certificate
          or a membership certificate, MultyDocs lets you generate many
          certificates for many users from one template for free. Upload your
          PNG or JPG template once, provide user data in a CSV file and
          generate every user&rsquo;s certificate in bulk &mdash; one CSV row,
          one certificate.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          This guide focuses on preparing the recipient data: which columns
          your CSV needs, how to handle names with special characters or long
          names, and how the files are named inside the ZIP you download.
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
          Use Cases for Creating Certificates for Many Users
        </h3>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>Course completion certificates for online classes.</li>
          <li>Workshop attendance certificates for all attendees.</li>
          <li>Membership certificates for club or organization members.</li>
          <li>Training certificates for employees or volunteers.</li>
          <li>Appreciation certificates for donors or supporters.</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 1: Upload Your Certificate Template
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Upload your certificate design in PNG or JPG format to MultyDocs.
          This will be the base layout used for every user certificate.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 2: Add User Data in a CSV File
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Create a CSV file with one row per user. Include columns such as
          Name, Email, Course, Date and Role. The first row must be the
          header row with column names. This file tells MultyDocs what
          information to place on each certificate, so every user gets a
          certificate with their own details.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 3: Map Fields to Your Template
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Position text fields on your certificate template and connect them
          to the matching CSV columns &mdash; for example, connect the Name
          column to the name field on your design. Each user receives a
          certificate with their own details in the right place. You can drag
          and reposition fields before generating.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 4: Generate and Download Certificates for Free
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Generate certificates for all users at once. MultyDocs fills each
          template with the mapped CSV data and lets you download the full
          set as a single ZIP file. No payment, no subscription and no
          account required.
        </p>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Why Choose MultyDocs for Many User Certificates?
        </h4>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>Create certificates for many users completely free.</li>
          <li>No sign-up or account creation required.</li>
          <li>Use your own certificate design as the template.</li>
          <li>Import user data from a CSV file.</li>
          <li>Download all certificates in one ZIP file.</li>
        </ul>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Preparing the CSV: Columns, Special Characters and Long Names
        </h4>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Use clear, simple column names such as Name, Email, Course and Date.
          Avoid extra spaces, merged cells or stray commas inside values.
          Save the CSV with UTF-8 encoding so recipient names with accents or
          special characters (for example Jos&eacute;, Ren&eacute; or
&ntilde;) import correctly and print properly on the certificates.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Long names can overlap other fields on your certificate. Leave
          generous empty space for the name field on your template, keep font
          sizes reasonable, and generate a couple of certificates first to
          check that long names fit before you run the full batch.
        </p>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          How Files Are Named Inside the ZIP
        </h4>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          When MultyDocs generates certificates for many users, every user
          gets a separate certificate file inside the downloaded ZIP. You can
          extract the ZIP and rename, sort or distribute the files however
          you need &mdash; for example, alphabetically by recipient name.
        </p>

        <p className="text-(--text-gray) leading-relaxed mb-8">
          Create the same certificate for many users today at{" "}
          <a
            href="https://multydocs.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--brand-orange) font-medium underline underline-offset-4 hover:opacity-80"
          >
            https://multydocs.in
          </a>
          .
        </p>

        <h5 className="text-base font-semibold text-(--text) mt-8 mb-2">
          Related Guides
        </h5>
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
          <li>
            <Link
              href="/blogs/how-to-generate-many-certificates-for-hackathon"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              Bulk Certificates for Hackathons and College Events
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
