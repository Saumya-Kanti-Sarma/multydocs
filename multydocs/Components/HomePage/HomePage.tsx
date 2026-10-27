/*
For Future Saumya:
This is the 1st screen that is visible on the website launch.
When a user selects an image (jpg or png) this component becomes invisible
and the <CertificateEditor/> component takes over.
*/
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { GoUpload } from "react-icons/go";
import {
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsGithub,
} from "react-icons/bs";
import { MdOutlinePeople, MdOutlineEventNote, MdOutlineSportsScore } from "react-icons/md";
import { PiChalkboardTeacherLight, PiCertificateLight } from "react-icons/pi";
import { TbBuildingCommunity, TbHeartHandshake, TbBarbell } from "react-icons/tb";
import { LuBriefcase, LuGraduationCap } from "react-icons/lu";
import Navbar from "@/Components/Navbar/Navbar";
import { CertificateInterface } from "@/types/types";
import Link from "next/link";

interface HomePageProps {
  onCertificateChange: (cert: CertificateInterface) => void;
}

// ─── Marquee — trusted user roles ──────────────────────────────────────────

const marqueeLogos = [
  { name: "HR Managers", icon: <LuBriefcase className="h-5 w-5" /> },
  { name: "School Teachers", icon: <PiChalkboardTeacherLight className="h-5 w-5" /> },
  { name: "Principals", icon: <TbBuildingCommunity className="h-5 w-5" /> },
  { name: "College Committees", icon: <LuGraduationCap className="h-5 w-5" /> },
  { name: "Course Creators", icon: <PiCertificateLight className="h-5 w-5" /> },
  { name: "Event Organisers", icon: <MdOutlineEventNote className="h-5 w-5" /> },
  { name: "Training Teams", icon: <TbBarbell className="h-5 w-5" /> },
  { name: "NGO Coordinators", icon: <TbHeartHandshake className="h-5 w-5" /> },
  { name: "Bootcamp Mentors", icon: <MdOutlinePeople className="h-5 w-5" /> },
  { name: "Sports Coaches", icon: <MdOutlineSportsScore className="h-5 w-5" /> },
];



// ─── Reviews ───────────────────────────────────────────────────────────────

const reviews = [
  {
    name: "Priya M.",
    role: "School Administrator",
    rating: 5,
    text: "Used it to generate 300 report cards in under 5 minutes. Absolutely love how simple it is!",
    avatar: "PM",
  },
  {
    name: "James K.",
    role: "Event Organiser",
    rating: 5,
    text: "Created participation certificates for our hackathon with 200 attendees. Worked perfectly.",
    avatar: "JK",
  },
  {
    name: "Aarav S.",
    role: "HR Manager",
    rating: 4.5,
    text: "Super clean UI. We use it every quarter for employee certificates. Saves us so much time.",
    avatar: "AS",
  },
];



// ─── Star Rating ────────────────────────────────────────────────────────────

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


// ─── Main Component ─────────────────────────────────────────────────────────

export default function HomePage({ onCertificateChange }: HomePageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setLoading(true);
    const fileUrl = URL.createObjectURL(file);
    const cert: CertificateInterface = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileUrl,
    };
    setTimeout(() => {
      setLoading(false);
      onCertificateChange(cert);
    }, 600);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <>
      <Navbar />

      <main>

        {/*Hero  */}
        <section
          id="hero-section"
          aria-labelledby="hero-heading"
          className="flex flex-col items-center justify-center gap-8 px-6 py-16 md:py-20 md:min-h-(--body-height) text-center"
        >
          {/* Row 1 — Logo + Heading */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-5xl">
            <Image
              src="/logo.svg"
              alt="MultyDocs logo"
              width={160}
              height={160}
              priority
              className="drop-shadow-sm shrink-0 w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56"
            />

            <div className="flex flex-col items-center md:items-start gap-4">
              <h1
                id="hero-heading"
                className="text-4xl text-center md:text-start font-black tracking-tight text-(--brand-orange) sm:text-5xl lg:text-5xl"
              >
                Generate Documents in
                Bulk
                in Seconds
              </h1>

              <p className="max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-(--text-gray) text-center md:text-start">
                Create hundreds of personalized certificates, student ID cards and
                report cards using your templates and CSV data. Map your fields,
                generate documents in bulk and download everything in a ZIP file.
                Free to use, with no sign-up required.
              </p>
            </div>
          </div>

          {/* Row 2 — Steps + Upload */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 w-full max-w-5xl">

            {/* How It Works */}
            <div className="flex justify-center items-center w-full md:flex-1">
              <div className="w-full max-w-md text-left">
                <h2 className="mb-4 text-lg sm:text-xl font-bold text-(--text)">
                  How to Generate Documents in Bulk
                </h2>

                <ol className="list-decimal space-y-3 pl-5 text-sm sm:text-base leading-relaxed text-(--text-gray)">
                  <li>
                    Upload your certificate or report card template.
                  </li>
                  <li>
                    Add the data or upload data in CSV format. ( <a
                      href="/guides/create-csv-for-certificates"
                      className="font-medium underline underline-offset-4 hover:opacity-80"
                    >
                      How to add CSV data?
                    </a>)
                  </li>
                  <li>
                    Map your CSV columns to the fields in your template.
                  </li>
                  <li>
                    Generate your documents and download them as a ZIP file.
                  </li>
                </ol>



              </div>

            </div>

            {/* Upload Area */}
            <div
              className="w-full md:flex-1 max-w-sm md:max-w-md"
              id="certificate-uploading-area"
            >
              {/* <h2 className="mb-3 text-lg sm:text-xl font-bold text-(--text)">
                Start Generating Your Documents
              </h2> */}
              <input
                ref={inputRef}
                type="file"
                name="certificate"
                id="certificate"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="hidden"
              />

              <label
                htmlFor="certificate"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`group flex cursor-pointer flex-col items-center justify-center gap-3
          rounded-2xl border-2 border-dashed px-6 py-12 text-center w-full
          transition-all duration-200 select-none
          ${dragging
                    ? "border-(--brand-orange) bg-red-50 scale-[1.02]"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:scale-[1.01]"
                  }`}
              >
                {loading ? (
                  <div
                    className="flex flex-col items-center gap-3"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-(--brand-orange) animate-spin" />
                    <p className="text-sm font-medium text-(--text-gray)">
                      Loading your template…
                    </p>
                  </div>
                ) : (
                  <>
                    <GoUpload
                      aria-hidden="true"
                      className={`h-10 w-10 transition-colors duration-200
                ${dragging
                          ? "text-(--brand-orange)"
                          : "text-gray-400 group-hover:text-gray-500"
                        }`}
                    />

                    <div>
                      <p className="text-sm font-semibold text-(--text-gray)">
                        {dragging
                          ? "Drop your template here!"
                          : "Click to upload or drag & drop"}
                      </p>

                      <p className="mt-2 text-xs text-(--text-gray)">
                        Supported formats: PNG and JPG
                      </p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>


          <h1 className="mt-5 font-semibold text-(--brand-orange)">
            Free to use. No sign-up required.
          </h1>



          {/* Trusted By / Audience Marquee */}
          <div className="border-y border-gray-200 w-full max-w-5xl">
            <div className="flex items-stretch">

              {/* Left Label */}
              <div className="hidden sm:flex shrink-0 w-52 items-center border-r border-gray-200 px-6 py-5">
                <p className="text-xs leading-snug text-(--text-gray)">
                  Useful for schools, colleges, event organizers and professionals
                </p>
              </div>

              {/* Scrolling Logos */}
              <div className="relative flex-1 overflow-hidden py-5">
                {/* Fade Edges */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-linear-to-r from-white to-transparent"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-linear-to-l from-white to-transparent"
                />

                <div
                  className="flex w-max h-full animate-marquee items-center gap-12"
                  aria-label="Industries and professionals that can use MultyDocs"
                >
                  {[...marqueeLogos, ...marqueeLogos].map((brand, i) => (
                    <div
                      key={`${brand.name}-${i}`}
                      className="flex shrink-0 items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity duration-300"
                    >
                      <span aria-hidden="true" className="text-(--text-gray)">
                        {brand.icon}
                      </span>

                      <span className="text-sm font-semibold text-(--text) tracking-tight whitespace-nowrap">
                        {brand.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ── Demo Video + Reviews ───────────────────────────────── */}
        <section
          id="demo-and-reviews"
          className=" px-6 py-20"
          aria-labelledby="demo-heading"
        >
          <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between">

            {/* Left — Video */}
            <div className="w-full lg:w-[46%] shrink-0">
              <h2 id="demo-heading" className="mb-2 text-3xl font-black text-(--text)">
                See It in Action ── Watch a tutorial video
              </h2>
              <div className="overflow-hidden rounded-2xl shadow-xl aspect-video">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="MultyDocs demo video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>


            {/* Right — Reviews */}
            <div className="w-full lg:flex-1" aria-labelledby="reviews-heading">
              <h2 id="reviews-heading" className="mb-2 text-3xl font-black text-(--text)">
                What People Are Saying
              </h2>
              <p className="mb-6 text-sm text-(--text)/60">
                Loved by educators, HR teams and event organisers.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((r, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white
                               p-6 shadow-sm min-h-50
                               hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <StarRating rating={r.rating} />
                    <p className="text-sm leading-relaxed text-(--text-gray) flex-1 overflow-hidden">&ldquo;{r.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-(--brand-orange)">
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
            </div>

          </div>
        </section>

        {/* ── Open Source CTA ────────────────────────────────────── */}
        <section className="bg-(--bg) px-4 py-20 text-center " aria-labelledby="oss-heading">
          <div className="mx-auto max-w-xl">
            <BsGithub className="mx-auto mb-4 h-12 w-12 text-(--text)" />
            <h2 id="oss-heading" className="mb-3 text-3xl font-black text-(--text)">
              We&rsquo;re Open Source
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-(--text-gray)">
              MultyDocs is fully open source. Explore the code, report issues, suggest features,
              or contribute — we welcome everyone.
            </p>
            <a
              href="https://github.com/Saumya-Kanti-Sarma/multydocs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-(--text) px-6 py-3 text-sm font-semibold text-(--bg)
                         hover:opacity-80 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <BsGithub className="h-5 w-5" />
              Star us on GitHub <BsStarFill className="inline-block h-4 w-4 align-middle" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
