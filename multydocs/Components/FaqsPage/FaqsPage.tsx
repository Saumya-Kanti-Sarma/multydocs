"use client";

import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";

// ─── Data ───────────────────────────────────────────────────────────────────

const faqCategories = [
  {
    category: "Getting Started",
    faqs: [
      {
        q: "What is MultyDocs?",
        a: "MultyDocs is a free, browser-based tool for generating certificates, report cards, and ID cards in bulk. Upload your template, add a CSV of recipient data, map the fields, and download a ZIP of all your documents.",
      },
      {
        q: "Do I need to create an account?",
        a: "No. MultyDocs requires zero sign-up. Just open the website and start generating documents immediately.",
      },
      {
        q: "Is MultyDocs really free?",
        a: "Yes — completely free with no subscriptions, no hidden charges, and no usage limits. It runs entirely in your browser.",
      },
      {
        q: "Which devices and browsers does MultyDocs support?",
        a: "MultyDocs works on any modern browser (Chrome, Firefox, Safari, Edge) on desktop and mobile. For the best experience, we recommend a desktop or laptop.",
      },
    ],
  },
  {
    category: "Templates & Files",
    faqs: [
      {
        q: "What file formats can I upload as a template?",
        a: "You can upload any JPG or PNG image as your certificate or document template. Vector formats like SVG and PDF are not supported yet.",
      },
      {
        q: "How do I prepare my CSV file?",
        a: "Create a spreadsheet in Excel or Google Sheets with one column per field (e.g., Name, Score, Date). Export it as a CSV file. Each row will generate one document. You can also paste your raw data into ChatGPT and ask it to format it as a CSV.",
      },
      {
        q: "How many rows can my CSV have?",
        a: "There is no hard limit. MultyDocs will generate one document per row. Very large CSVs (1000+ rows) may take a few seconds to process depending on your device.",
      },
      {
        q: "Can I enter data manually instead of uploading a CSV?",
        a: "Yes. You can type data directly into the tool without uploading a CSV file.",
      },
    ],
  },
  {
    category: "Field Mapping & Customisation",
    faqs: [
      {
        q: "How do I place text fields on my template?",
        a: "After uploading your template and CSV, you can drag and drop text fields anywhere on the template preview. Each field corresponds to a column in your CSV.",
      },
      {
        q: "Can I customise font, size and colour?",
        a: "Yes. For each field you can choose the font family, font size, text colour, and apply bold, italic, or underline styling.",
      },
      {
        q: "Can I add a static text field that is the same on every document?",
        a: "Currently every text field is mapped to a CSV column. Static text support is planned for a future release.",
      },
    ],
  },
  {
    category: "Generating & Downloading",
    faqs: [
      {
        q: "What format are the generated documents in?",
        a: "Documents are generated as individual image files (PNG/JPG based on your template) and bundled into a single ZIP file for download.",
      },
      {
        q: "Does my data get uploaded to a server?",
        a: "No. Everything is processed 100% locally in your browser. Your templates, CSV data, and generated documents never leave your device.",
      },
      {
        q: "Can I preview a document before generating all of them?",
        a: "Yes. The editor shows a live preview as you map your fields. You can also navigate through records using the prev/next arrows before generating the full batch.",
      },
    ],
  },
  {
    category: "Open Source & Contributing",
    faqs: [
      {
        q: "Is MultyDocs open source?",
        a: "Yes. The full source code is available on GitHub under the MIT licence. You are free to fork, modify, and contribute.",
      },
      {
        q: "How can I contribute?",
        a: "Open an issue or submit a pull request on GitHub. All contributions — bug fixes, features, docs, and design improvements — are welcome.",
      },
      {
        q: "I found a bug. Where do I report it?",
        a: "Please open an issue on the GitHub repository with a clear description of the bug and steps to reproduce it.",
      },
    ],
  },
];

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-(--text)
                   hover:text-(--brand-orange) transition-colors duration-200"
        aria-expanded={open}
      >
        <span>{q}</span>
        <HiOutlineChevronDown
          className={`h-5 w-5 shrink-0 text-(--text-gray) transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 pb-5" : "max-h-0"}`}>
        <p className="text-sm leading-relaxed text-(--text-gray)">{a}</p>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FaqsPageContent() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].category);

  const current = faqCategories.find((c) => c.category === activeCategory)!;

  return (
    <main>

      {/* ── Hero ── */}
      <section className="bg-white px-6 py-20 text-center border-b border-gray-100">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--brand-orange)">Support</p>
          <h1 className="mb-4 text-4xl font-black text-(--text) sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-base leading-relaxed text-(--text-gray)">
            Everything you need to know about MultyDocs. Can&apos;t find an answer?{" "}
            <a
              href="mailto:wanderingint@gmail.com"
              className="font-semibold text-(--brand-orange) hover:underline"
            >
              Email us.
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ body ── */}
      <section className="bg-(--bg) px-6 py-16">
        <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-10">

          {/* Sidebar — categories */}
          <aside className="lg:w-56 shrink-0">
            <ul className="flex flex-row flex-wrap lg:flex-col gap-2">
              {faqCategories.map((cat) => (
                <li key={cat.category}>
                  <button
                    onClick={() => setActiveCategory(cat.category)}
                    className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-all duration-200
                      ${activeCategory === cat.category
                        ? "bg-(--brand-orange) text-white"
                        : "bg-white text-(--text-gray) hover:bg-gray-100"
                      }`}
                  >
                    {cat.category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* FAQ panel */}
          <div className="flex-1 rounded-2xl border border-gray-100 bg-white px-6 shadow-sm">
            <h2 className="border-b border-gray-100 py-5 text-base font-black text-(--text)">
              {current.category}
            </h2>
            {current.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>

        </div>
      </section>

      {/* ── Still have questions ── */}
      <section className="bg-white px-6 py-16 text-center border-t border-gray-100">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-3 text-2xl font-black text-(--text)">Still have questions?</h2>
          <p className="mb-8 text-sm leading-relaxed text-(--text-gray)">
            Reach out directly or open a GitHub issue — we typically respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:wanderingint@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-(--brand-orange) px-6 py-3 text-sm font-semibold text-white
                         hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Email Us
            </a>
            <a
              href="https://github.com/Saumya-Kanti-Sarma/multydocs/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-(--primary) px-6 py-3 text-sm font-semibold text-white
                         hover:opacity-80 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <BsGithub className="h-4 w-4" />
              Open an Issue
            </a>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-(--primary) px-6 py-16 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-3 text-2xl font-black text-white">Ready to get started?</h2>
          <p className="mb-8 text-sm text-white/60">
            No sign-up. No cost. Generate your first batch of documents in under a minute.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-(--brand-orange) px-6 py-3 text-sm font-semibold text-white
                       hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Try MultyDocs Free →
          </Link>
        </div>
      </section>

    </main>
  );
}
