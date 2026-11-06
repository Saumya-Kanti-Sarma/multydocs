import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/Components/Navbar/Navbar";
import { blogs } from "@/data/blogs";

const post = blogs.find(
  (p) => p.slug === "how-to-generate-bulk-certificates-for-free"
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

export default function GenerateBulkCertificatesFreePage() {
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
          Free Online Bulk Certificate Generator: No Sign-Up
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mt-10 mb-4">
          Free Bulk Certificate Generation Without Sign-Up
        </h2>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Many certificate generators charge per certificate or require a paid
          plan before you can download bulk output. MultyDocs is a free online
          bulk certificate generator: you can upload your template, import a
          CSV and generate personalized certificates for hundreds of recipients
          at no cost, with no account creation and no hidden fees. You only
          need your certificate template and a CSV file with recipient details.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Because there is no sign-up, there is nothing to remember or cancel.
          Open the site, upload your PNG or JPG certificate design, import your
          recipient CSV, map the columns and download the finished ZIP &mdash;
          the whole flow works without creating an account.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 1: Prepare Your Certificate Template
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Design or obtain your certificate in PNG or JPG format. Leave blank
          areas where recipient-specific information such as name, date and
          score should appear. Upload this image to MultyDocs as your base
          template &mdash; the same design is used for every certificate, so
          you only create it once no matter how many recipients you have.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 2: Create a CSV File with Recipient Data
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          A CSV file is a simple spreadsheet saved as comma-separated values.
          Include one column per piece of information (for example, Name,
          Date, Course, Score) and one row per recipient. The first row must
          be the header row with column names. You can create this in Google
          Sheets, Excel or any text editor and save it as .csv. Save with
          UTF-8 encoding if your recipient names include accents or special
          characters.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 3: Upload CSV and Map Fields
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Upload your CSV to MultyDocs. Then position text fields on your
          template and connect them to the corresponding CSV columns &mdash;
          for example, connect the Name column of your CSV to the name field
          on your template. This ensures each certificate gets the correct
          recipient information. You can drag fields anywhere on the design
          before you generate.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 4: Generate and Download for Free
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Click the generate button. MultyDocs creates a personalized
          certificate for every row in your CSV, fills in the mapped fields
          and lets you download the complete set as a ZIP file at no cost.
          Generation happens in your browser, so your template and recipient
          data are not uploaded to a server.
        </p>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Benefits of Using MultyDocs for Free Bulk Certificates
        </h4>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>No account or sign-up required.</li>
          <li>Free bulk generation for unlimited recipients.</li>
          <li>Supports PNG and JPG certificate templates.</li>
          <li>Download all certificates in a single ZIP file.</li>
          <li>Works for schools, colleges, events and HR teams.</li>
        </ul>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Is It Really Free? Limits and What to Expect
        </h4>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          MultyDocs does not charge per certificate and does not require a
          paid plan for bulk generation. There is no advertised recipient
          cap on the site, but because generation runs in your browser,
          very large CSV files may be limited by your device&rsquo;s memory
          and browser. For very large batches, split the CSV into smaller
          files and generate them separately.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          TODO(owner): verify whether any file-size, recipient-count or
          ZIP-size limits are enforced in the client code before stating
          exact numbers publicly.
        </p>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Privacy: Where Your Data Is Processed
        </h4>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          MultyDocs processes your template image and CSV data in your
          browser. Your certificate design and recipient details are not
          uploaded to a server, and no account is created, so nothing is
          stored by MultyDocs beyond your own device. Download the ZIP and
          keep the files wherever you like.
        </p>

        <p className="text-(--text-gray) leading-relaxed mb-8">
          Start generating free bulk certificates today at{" "}
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
