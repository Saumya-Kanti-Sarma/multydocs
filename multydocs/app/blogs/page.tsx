import type { Metadata } from "next";
import Navbar from "@/Components/Navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Bulk Certificate Guides and Tutorials",
  description:
    "Step-by-step guides to generate bulk certificates online for free. Upload templates, import CSV data, map fields and download certificates as ZIP with MultyDocs.",
  alternates: {
    canonical: "https://multydocs.in/blogs",
  },
  openGraph: {
    title: "Bulk Certificate Guides and Tutorials",
    description:
      "Step-by-step guides to generate bulk certificates online for free. Upload templates, import CSV data, map fields and download certificates as ZIP with MultyDocs.",
    url: "https://multydocs.in/blogs",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MultyDocs bulk certificate guides and tutorials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Certificate Guides and Tutorials",
    description:
      "Step-by-step guides to generate bulk certificates online for free. Upload templates, import CSV data, map fields and download certificates as ZIP with MultyDocs.",
    images: ["/og-image.png"],
  },
};

export default function BlogsHubPage() {
  return (
    <>
      <Navbar />

      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-(--text) mb-6">
          Bulk Certificate Guides and Tutorials
        </h1>
        <p className="text-(--text-gray) leading-relaxed mb-12">
          Learn how to generate bulk certificates online with MultyDocs.
          Step-by-step guides for uploading templates, importing CSV data,
          mapping fields and downloading personalized certificates as a ZIP.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col"
            >
              <div className="flex justify-center mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="rounded-xl shadow-md"
                />
              </div>
              <h3 className="text-xl font-black text-(--text) mb-2">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="hover:text-(--brand-orange) transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-(--text-gray) leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              <Link
                href={`/blogs/${post.slug}`}
                className="inline-block rounded-xl bg-(--brand-orange) px-6 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity"
              >
                Read guide
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-12 text-(--text-gray) leading-relaxed">
          Need to generate certificates right away?{" "}
          <Link
            href="/"
            className="text-(--brand-orange) font-medium underline underline-offset-4 hover:opacity-80"
          >
            Start generating for free
          </Link>
          .
        </p>
      </section>
    </>
  );
}
