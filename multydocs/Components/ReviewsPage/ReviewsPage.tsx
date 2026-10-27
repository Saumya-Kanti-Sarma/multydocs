"use client";

import { useState } from "react";
import { BsStarFill, BsStarHalf, BsStar, BsGithub } from "react-icons/bs";

// ─── Data ───────────────────────────────────────────────────────────────────

const allReviews = [
  {
    name: "Priya M.",
    role: "School Administrator",
    rating: 5,
    text: "Used it to generate 300 report cards in under 5 minutes. Absolutely love how simple it is! Every teacher in our school now uses MultyDocs at the end of term.",
    avatar: "PM",
    category: "Education",
  },
  {
    name: "James K.",
    role: "Event Organiser",
    rating: 5,
    text: "Created participation certificates for our hackathon with 200 attendees. Worked perfectly and saved us at least a full day of manual work.",
    avatar: "JK",
    category: "Events",
  },
  {
    name: "Aarav S.",
    role: "HR Manager",
    rating: 4.5,
    text: "Super clean UI. We use it every quarter for employee appreciation certificates. Saves us so much time and looks completely professional.",
    avatar: "AS",
    category: "HR",
  },
  {
    name: "Meera T.",
    role: "College Committee Lead",
    rating: 5,
    text: "We issued 500+ certificates for our annual fest. The CSV upload and field mapping is incredibly intuitive — took us less than 10 minutes total.",
    avatar: "MT",
    category: "Education",
  },
  {
    name: "Rahul D.",
    role: "Bootcamp Instructor",
    rating: 5,
    text: "Our students love getting personalised certificates at the end of every cohort. MultyDocs makes it a 5-minute job instead of a 5-hour one.",
    avatar: "RD",
    category: "Training",
  },
  {
    name: "Sofia L.",
    role: "NGO Programme Coordinator",
    rating: 4.5,
    text: "We run volunteer programs across 12 cities. Generating recognition certificates for all volunteers used to be a nightmare. Not anymore.",
    avatar: "SL",
    category: "NGO",
  },
  {
    name: "Kiran P.",
    role: "Sports Club Manager",
    rating: 5,
    text: "Used it for our inter-school tournament. Kids were so happy to get proper certificates. The whole process was done in under 15 minutes.",
    avatar: "KP",
    category: "Sports",
  },
  {
    name: "Ananya R.",
    role: "Course Creator",
    rating: 4.5,
    text: "I sell online courses and needed a way to issue completion certificates. MultyDocs is exactly what I was looking for — free and easy.",
    avatar: "AR",
    category: "Training",
  },
  {
    name: "Dev B.",
    role: "Principal",
    rating: 5,
    text: "Highly recommend this to any school principal. We generate ID cards, report cards and certificates all from one tool. Remarkable.",
    avatar: "DB",
    category: "Education",
  },
];

const categories = ["All", "Education", "Events", "HR", "Training", "NGO", "Sports"];

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-(--brand-orange)">
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i) return <BsStarFill key={i} className="h-4 w-4" />;
        if (rating >= i - 0.5) return <BsStarHalf key={i} className="h-4 w-4" />;
        return <BsStar key={i} className="h-4 w-4" />;
      })}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReviewsPageContent() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? allReviews
    : allReviews.filter((r) => r.category === active);

  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);

  return (
    <main>

      {/* ── Hero ── */}
      <section className="bg-white px-6 py-20 text-center border-b border-gray-100">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--brand-orange)">Reviews</p>
          <h1 className="mb-4 text-4xl font-black text-(--text) sm:text-5xl">
            What People Are Saying
          </h1>
          <p className="text-base leading-relaxed text-(--text-gray)">
            Trusted by educators, HR teams, event organisers and more around the world.
          </p>

          {/* Summary stats */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <div>
              <p className="text-4xl font-black text-(--brand-orange)">{avgRating}</p>
              <div className="mt-1 flex justify-center">
                <StarRating rating={parseFloat(avgRating)} />
              </div>
              <p className="mt-1 text-xs text-(--text-gray)">Average rating</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <p className="text-4xl font-black text-(--text)">{allReviews.length}+</p>
              <p className="mt-1 text-xs text-(--text-gray)">Happy users</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <p className="text-4xl font-black text-(--text)">100%</p>
              <p className="mt-1 text-xs text-(--text-gray)">Free forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section className="bg-(--bg) px-6 py-16">
        <div className="mx-auto max-w-6xl">

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200
                  ${active === cat
                    ? "bg-(--brand-orange) text-white scale-105"
                    : "bg-white text-(--text-gray) hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <li
                key={i}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm
                           hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <StarRating rating={r.rating} />
                  <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-(--brand-orange)">
                    {r.category}
                  </span>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-(--text-gray)">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-(--brand-orange)">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-(--text)">{r.name}</p>
                    <p className="text-xs text-(--text-gray)">{r.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-sm text-(--text-gray)">No reviews in this category yet.</p>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-(--primary) px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <BsGithub className="mx-auto mb-4 h-10 w-10 text-white" />
          <h2 className="mb-3 text-3xl font-black text-white">Love MultyDocs?</h2>
          <p className="mb-8 text-sm leading-relaxed text-white/60">
            Star the repo on GitHub and help others discover it.
          </p>
          <a
            href="https://github.com/Saumya-Kanti-Sarma/multydocs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-(--brand-orange) px-6 py-3 text-sm font-semibold text-white
                       hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <BsGithub className="h-5 w-5" />
            Star on GitHub ⭐
          </a>
        </div>
      </section>

    </main>
  );
}
