import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/Components/Navbar/Navbar";
import { blogs } from "@/data/blogs";

const post = blogs.find(
  (p) => p.slug === "how-to-generate-many-certificates-for-hackathon"
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

export default function GenerateManyCertificatesHackathonPage() {
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
          Bulk Certificates for Hackathons and College Events
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-(--text) mt-10 mb-4">
          Bulk Certificate Generation for Hackathon Events
        </h2>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Hackathons often have dozens or hundreds of participants, winners,
          mentors and volunteers. Creating certificates manually for each
          person is time-consuming. With MultyDocs, you can generate many
          certificates for hackathon attendees in bulk using one template and
          a CSV file with participant details &mdash; participant, winner and
          mentor certificates all from the same design.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          This guide covers the certificate types hackathons usually need,
          how to prepare the participant CSV, and how to name and distribute
          the certificates after generation.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Types of Hackathon Certificates You Can Generate
        </h3>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>Participation certificates for all hackathon attendees.</li>
          <li>Winner certificates for first, second and third place.</li>
          <li>Completion certificates for project submissions.</li>
          <li>Mentor and volunteer appreciation certificates.</li>
          <li>Best in category awards (UI/UX, innovation, etc.).</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 1: Design Your Hackathon Certificate Template
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Create your hackathon certificate design in any image editor and
          export it as PNG or JPG. Leave space for the participant name,
          hackathon name, date, prize or role, and organizer signature.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 2: Prepare a CSV of Hackathon Participants
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Make a CSV file with columns such as Name, Team, Role
          (Participant / Winner / Mentor), Prize Category and Date. The first
          row must be the header row. Save one row per person who should
          receive a certificate, and use the Role column to vary the text
          (&ldquo;Winner&rdquo; vs &ldquo;Participant&rdquo;) on each
          certificate.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 3: Upload Template, CSV and Map Fields
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Upload your certificate image and CSV to MultyDocs. Position text
          fields on the template and connect them to the matching CSV
          columns &mdash; for example, connect Name, Role and Prize Category
          to the right placeholders on your design. This maps each
          participant&rsquo;s name and award to the right place on the
          certificate.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-(--text) mt-8 mb-4">
          Step 4: Generate Many Certificates and Download ZIP
        </h3>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Generate all hackathon certificates at once &mdash; one certificate
          per CSV row, with the mapped name, role and prize filled in
          automatically. Download the complete set in a ZIP file, ready to
          email or hand out at the closing ceremony. Generation runs in your
          browser, so your participant data is not uploaded to a server.
        </p>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Benefits for Hackathon Organizers
        </h4>
        <ul className="list-disc pl-6 text-(--text-gray) leading-relaxed mb-6">
          <li>Generate certificates for hundreds of participants in minutes.</li>
          <li>No design skills required — use your own template.</li>
          <li>No account or sign-up needed.</li>
          <li>Free bulk generation with ZIP download.</li>
          <li>Professional, consistent certificates for every recipient.</li>
        </ul>

        <h4 className="text-lg font-semibold text-(--text) mt-8 mb-4">
          Naming and Distributing Hackathon Certificates
        </h4>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          After generation, every certificate is a separate image inside the
          ZIP. Name files consistently &mdash; for example,
          &ldquo;hackathon-participant-jane-doe.png&rdquo; &mdash; so you can
          sort and email them quickly. You can send participant certificates
          by email, hand out winner certificates at the closing ceremony, and
          mail mentor appreciation certificates afterward.
        </p>
        <p className="text-(--text-gray) leading-relaxed mb-6">
          Keep one CSV per hackathon edition so you can regenerate or
          reissue certificates later if a file is lost. Because MultyDocs is
          free and needs no sign-up, you can run the generator again anytime
          with the same template and CSV.
        </p>

        <p className="text-(--text-gray) leading-relaxed mb-8">
          Generate many certificates for your next hackathon at{" "}
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
              href="/blogs/how-to-create-same-certificate-for-many-users-for-free"
              className="text-(--brand-orange) underline underline-offset-4 hover:opacity-80"
            >
              Generate Many Certificates for Many Users from One Template
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
