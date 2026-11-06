/*
For Future Saumya:
This is the 1st screen that is visible on the website launch.
When a user selects an image (jpg or png) this component becomes invisible
and the <CertificateEditor/> component takes over.
*/
"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoUpload } from "react-icons/go";
import { BsGithub, BsStarFill } from "react-icons/bs";
import {
  MdOutlinePeople,
  MdOutlineEventNote,
  MdOutlineSportsScore,
} from "react-icons/md";
import {
  PiChalkboardTeacherLight,
  PiCertificateLight,
} from "react-icons/pi";
import {
  TbBuildingCommunity,
  TbHeartHandshake,
  TbBarbell,
} from "react-icons/tb";
import { LuBriefcase, LuGraduationCap } from "react-icons/lu";
import Navbar from "@/Components/Navbar/Navbar";
import { CertificateInterface } from "@/types/types";
import AskGPT from "../AskGPT/AskGPT";

interface HomePageProps {
  onCertificateChange: (cert: CertificateInterface) => void;
}

const audiences = [
  { name: "HR Managers", icon: <LuBriefcase /> },
  { name: "School Teachers", icon: <PiChalkboardTeacherLight /> },
  { name: "Principals", icon: <TbBuildingCommunity /> },
  { name: "College Committees", icon: <LuGraduationCap /> },
  { name: "Course Creators", icon: <PiCertificateLight /> },
  { name: "Event Organisers", icon: <MdOutlineEventNote /> },
  { name: "Training Teams", icon: <TbBarbell /> },
  { name: "NGO Coordinators", icon: <TbHeartHandshake /> },
  { name: "Bootcamp Mentors", icon: <MdOutlinePeople /> },
  { name: "Sports Coaches", icon: <MdOutlineSportsScore /> },
];

const steps = [
  {
    number: "01",
    title: "Upload your template",
    description:
      "Upload your existing certificate, report card or ID card design in PNG or JPG format.",
  },
  {
    number: "02",
    title: "Add your recipient data",
    description:
      "Upload a CSV file containing names, dates, scores and other information for your documents.",
  },
  {
    number: "03",
    title: "Map your document fields",
    description:
      "Position text fields on your template and connect them to the corresponding CSV columns.",
  },
  {
    number: "04",
    title: "Generate documents in bulk",
    description:
      "Create personalized documents for all your recipients and download them together in a ZIP file.",
  },
];

const useCases = [
  {
    title: "Schools and Colleges",
    description:
      "Generate student certificates, academic report cards, participation certificates and achievement certificates for entire classes.",
    keywords:
      "Bulk student certificates, school certificate generator, college certificate generator",
  },
  {
    title: "Events and Workshops",
    description:
      "Create personalized participation, appreciation and completion certificates for hundreds of event attendees.",
    keywords:
      "Event certificate generator, bulk participation certificates, workshop certificates",
  },
  {
    title: "HR and Training Teams",
    description:
      "Generate employee recognition certificates, training completion certificates and professional documents in batches.",
    keywords:
      "Employee certificate generator, bulk training certificates, corporate certificates",
  },
  {
    title: "Sports and Competitions",
    description:
      "Create certificates for participants, winners, coaches and teams without manually editing every document.",
    keywords:
      "Sports certificate generator, competition certificates, award certificates",
  },
];

const faqs = [
  {
    question: "How can I generate certificates in bulk for free using multydocs?",
    answer:
      "Upload your certificate template to MultyDocs, add your recipient information using a CSV file, map the columns to your template and generate your certificates. You can download the generated certificates together in a ZIP file. For visual demonstration feel free to watch our youtube tutorial :)",
    link: "https://www.youtube.com/watch?v=itvQxmU-wts"
  },
  {
    question: "Can I generate certificates using Excel data?",
    answer:
      "Yes. Save your Excel spreadsheet as a CSV file and upload it to MultyDocs. You can then connect the CSV columns to the text fields on your certificate template.",
  },
  {
    question: "Can I generate certificates for hundreds of students?",
    answer:
      "Yes. MultyDocs is designed for batch document generation. You can use one template and a CSV dataset containing the details of multiple students to create personalized certificates.",
  },
  {
    question: "Can I create report cards and student ID cards?",
    answer:
      "Yes. You can use your own report card and student ID card designs as templates and personalize them using CSV data.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. MultyDocs can be used without creating an account or signing up.",
  },
  {
    question: "What image formats are supported for templates?",
    answer:
      "MultyDocs currently supports PNG and JPG image templates.",
  },
  {
    question: "How can I make CSV data from Google Docs?",
    answer:
      "Copy your data from Google Docs, paste it into an AI chat such as GPT and ask it to convert the data into a CSV file with the required columns. You can then download the CSV and upload it to MultyDocs.",
  },
  {
    question: "Can I export the certificates in PDF?",
    answer:
      "We are currently working on adding PDF export. Stay tuned for this feature.",
  },
  {
    question: "Can I send the certificates directly to the receiver using Multy Docs?",
    answer:
      "We are actively working on this feature to let you send certificates directly to recipients from MultyDocs.",
  },
  {
    question: "Can I make bulk certificates in Canva?",
    answer:
      "Yes, you can make bulk certificates in Canva, but it requires a paid Canva plan. With MultyDocs you can generate bulk certificates for free using your own design and a CSV file.",
  },
];

export default function HomePage({
  onCertificateChange,
}: HomePageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState("");

  const processFile = (file: File) => {
    if (
      !["image/png", "image/jpeg"].includes(file.type)
    ) {
      return;
    }

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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) processFile(file);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLLabelElement>
  ) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) processFile(file);
  };

  const handleEmailSend = () => {
    const recipient = "developer.saumyasarma@gmail.com";
    const subject = "MultyDocs Feedback";
    const body = contactMessage;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipient
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar />

      <main>
        {/* Hero section */}
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="flex flex-col items-center justify-center gap-10 px-6 py-16 md:py-20"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-5xl relative">
            <Image
              src="/logo.svg"
              alt="MultyDocs bulk document generator logo"
              width={160}
              height={160}
              priority
              className="shrink-0 w-18 h-18 md:w-40 md:h-40 lg:w-56 lg:h-56"
            />
            <span className="absolute right-0 top-0 z-10 inline-flex items-center rounded-full  bg-white px-3 py-1.5 text-xs font-semibold text-black/60 shadow-md">
              <AskGPT />
            </span>
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
              <h1
                id="hero-heading"
                className="text-xl md:text-5xl font-black tracking-tight text-(--brand-orange) text-center md:text-start"
              >
                Free Bulk Certificate Generator Online
              </h1>

              <p className="max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-(--text-gray) text-center md:text-start">
                Generate hundreds of personalized certificates,
                student ID cards and report cards in seconds.
                Upload your template, add details
                using CSV data, map your fields and create
                multiple documents at once. Download everything
                in a ZIP file. Free to use, with no sign-up
                required.
              </p>
            </div>
          </div>

          {/* Upload and instructions */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 w-full max-w-5xl">
            {/* <div className="flex justify-center items-center w-full md:flex-1">
              <div className="w-full max-w-md text-left">
                <h2 className="mb-5 text-xl sm:text-2xl font-bold text-(--text)">
                  How to Generate Certificates in Bulk
                </h2>

                <ol className="list-decimal space-y-4 pl-5 text-sm sm:text-base leading-relaxed text-(--text-gray)">
                  <li>
                    Upload your existing certificate or
                    document template.
                  </li>
                  <li>
                    Add recipient information or upload
                    your data in CSV format.{" "}
                    <a
                      href="/guides/create-csv-for-certificates"
                      className="font-medium underline underline-offset-4 hover:opacity-80"
                    >
                      Learn how to create CSV data
                    </a>.
                  </li>
                  <li>
                    Map your CSV columns to the corresponding
                    fields in your template.
                  </li>
                  <li>
                    Generate multiple personalized documents
                    and download them as a ZIP file.
                  </li>
                </ol>

                <p className="mt-6 text-sm text-(--text-gray)">
                  No need to manually edit names, dates or
                  other details on every certificate.
                </p>
              </div>
            </div> */}

            {/* Upload area */}
            <div
              className="w-full md:flex-1"
              id="certificate-uploading-area"
            >
              <h2 className="mb-3 text-xl md:text-4xl  text-center font-bold text-(--brand-orange)">
                Start Generating Your Certificates
              </h2>

              <input
                ref={inputRef}
                type="file"
                name="certificate"
                id="certificate"
                accept="image/jpeg,image/png"
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
                className={`group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center w-full h-60 md:h-80 transition-all duration-200 select-none ${dragging
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
                      Loading your template...
                    </p>
                  </div>
                ) : (
                  <>
                    <GoUpload
                      aria-hidden="true"
                      className="h-10 w-10 text-gray-400 group-hover:text-gray-500"
                    />

                    <div>
                      <p className="text-sm md:text-xl font-semibold text-(--text-gray)">
                        {dragging
                          ? "Drop your template here!"
                          : "Click to upload or drag and drop"}
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



          {/* Audience marquee */}
          <div className="border-y border-gray-200 w-full max-w-5xl">
            <div className="flex items-stretch">
              <div className="hidden sm:flex shrink-0 w-52 items-center border-r border-gray-200 px-6 py-5">
                <p className="text-xs leading-snug text-(--text-gray)">
                  A free bulk certificate and document generator
                  for schools, colleges, events and professionals.
                </p>
              </div>

              <div className="relative flex-1 overflow-hidden py-5">
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
                  aria-label="Professionals who can use MultyDocs"
                >
                  {[...audiences, ...audiences].map(
                    (audience, i) => (
                      <div
                        key={`${audience.name}-${i}`}
                        className="flex shrink-0 items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity duration-300"
                      >
                        <span
                          aria-hidden="true"
                          className="text-xl text-(--text-gray)"
                        >
                          {audience.icon}
                        </span>

                        <span className="text-sm font-semibold text-(--text) whitespace-nowrap">
                          {audience.name}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="px-6 py-20 bg-(--bg)"
          aria-labelledby="how-it-works-heading"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2
                id="how-it-works-heading"
                className="text-3xl sm:text-4xl font-black text-(--text)"
              >
                Create Hundreds of Certificates in Four Simple Steps
              </h2>

              <p className="mt-4 text-(--text-gray) leading-relaxed">
                Generate bulk certificates online using your
                existing design and recipient data. No need
                to create every certificate individually.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <span className="text-3xl font-black text-(--brand-orange)">
                    {step.number}
                  </span>

                  <h3 className="mt-5 text-lg font-bold text-(--text)">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-(--text-gray)">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section
          id="use-cases"
          className="px-6 py-20"
          aria-labelledby="use-cases-heading"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl mb-12">
              <h2
                id="use-cases-heading"
                className="text-3xl sm:text-4xl font-black text-(--text)"
              >
                One Bulk Certificate Generator for Every Organization
              </h2>

              <p className="mt-4 text-(--text-gray) leading-relaxed">
                Whether you are organizing a college event,
                managing employee training or preparing
                certificates for hundreds of students,
                MultyDocs makes bulk document generation simple.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {useCases.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-gray-200 p-6 sm:p-8"
                >
                  <h3 className="text-xl font-bold text-(--text)">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-sm sm:text-base text-(--text-gray)">
                    {item.description}
                  </p>

                  <p className="mt-5 text-xs leading-relaxed text-(--text-gray)">
                    {item.keywords}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Other document types */}
        <section
          id="document-types"
          className="px-6 py-20 bg-(--bg)"
          aria-labelledby="document-types-heading"
        >
          <div className="mx-auto max-w-5xl text-center">
            <h2
              id="document-types-heading"
              className="text-3xl sm:text-4xl font-black text-(--text)"
            >
              Generate More Than Just Certificates
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-(--text-gray) leading-relaxed">
              Use your own document templates to create
              personalized documents for multiple recipients.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 text-left">
              <article className="rounded-xl bg-white border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-(--text)">
                  Bulk Certificates
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--text-gray)">
                  Create participation, achievement,
                  appreciation and completion certificates.
                </p>
              </article>

              <article className="rounded-xl bg-white border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-(--text)">
                  Student ID Cards
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--text-gray)">
                  Generate personalized student identification
                  cards using a single design and recipient data.
                </p>
              </article>

              <article className="rounded-xl bg-white border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-(--text)">
                  Report Cards
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--text-gray)">
                  Create personalized academic report cards
                  for multiple students from your template.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Demo video */}
        <section
          id="demo"
          className="px-6 py-20"
          aria-labelledby="demo-heading"
        >
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <h2
                id="demo-heading"
                className="text-3xl sm:text-4xl font-black text-(--text)"
              >
                Watch How to Generate Certificates in Bulk
              </h2>

              <p className="mt-3 text-(--text-gray)">
                See how to upload a certificate template,
                import CSV data and generate multiple
                personalized certificates using MultyDocs.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-xl aspect-video mb-6">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/itvQxmU-wts"
                title="How to generate certificates in bulk using MultyDocs"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Guides and tutorials */}
        <section
          id="guides"
          className="px-6 py-20"
          aria-labelledby="guides-heading"
        >
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2
                id="guides-heading"
                className="text-3xl sm:text-4xl font-black text-(--text)"
              >
                Guides and Tutorials
              </h2>
              <p className="mt-4 text-(--text-gray) leading-relaxed">
                Step-by-step guides to help you generate bulk certificates
                online for free, with no sign-up required.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: "How to Create Bulk Certificates (Step-by-Step Guide)",
                  href: "/blogs/how-to-generate-bulk-certificates",
                  description:
                    "The complete pillar guide: upload a PNG/JPG template, import a CSV, map fields and download hundreds of certificates as a ZIP.",
                },
                {
                  title: "Free Online Bulk Certificate Generator: No Sign-Up",
                  href: "/blogs/how-to-generate-bulk-certificates-for-free",
                  description:
                    "Why bulk certificate generation is free on MultyDocs, what the limits are and how to get started without creating an account.",
                },
                {
                  title: "Canva Bulk Create Alternative: Free Bulk Certificates",
                  href: "/blogs/how-to-generate-bulk-certificates-canva-alternative",
                  description:
                    "Honest comparison with Canva Bulk Create: no paid plan, your own PNG/JPG template and free ZIP download.",
                },
              ].map((guide) => (
                <article
                  key={guide.href}
                  className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col"
                >
                  <h3 className="text-lg font-black text-(--text) mb-2">
                    <Link
                      href={guide.href}
                      className="hover:text-(--brand-orange) transition-colors"
                    >
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="text-(--text-gray) leading-relaxed mb-6 flex-1">
                    {guide.description}
                  </p>
                  <Link
                    href={guide.href}
                    className="inline-block rounded-xl bg-(--brand-orange) px-6 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity"
                  >
                    Read guide
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section
          id="faqs"
          className="px-6 py-20 bg-(--bg)"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h2
                id="faq-heading"
                className="text-3xl sm:text-4xl font-black text-(--text)"
              >
                Frequently Asked Questions About Bulk Certificate Generation
              </h2>

              <p className="mt-4 text-(--text-gray)">
                Everything you need to know about generating
                certificates and documents in bulk with MultyDocs.
              </p>
            </div>

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
                    {faq.answer} {faq.link && (<a
                      href={faq.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 items-center gap-2 text-sm font-medium text-(--brand-orange) underline underline-offset-4 hover:opacity-80 block"
                    >
                      Watch on YouTube
                    </a>)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact founder */}
        <section
          id="contact-founder"
          className="px-6 pb-10 bg-(--bg) text-center"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-2xl">
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-black text-(--text)"
            >
              Have any questions or suggestions?
            </h2>
            <br />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!contactMessage.trim()) return;
                handleEmailSend();
              }}
            >
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Type your question or suggestion..."
                className="w-full sm:w-96 rounded-xl border border-gray-200 bg-white p-4 text-(--text-gray) focus:outline-none focus:ring-2 focus:ring-(--brand-orange) resize-none"
                rows={6}
              /> <br />

              <button
                type="submit"
                className="rounded-xl bg-(--brand-orange) px-8 py-3 font-bold text-white hover:opacity-90 transition-opacity"
              >
                Send via Gmail
              </button>
            </form>

          </div>
        </section>

        {/* Final CTA */}
        <section
          id="get-started"
          className="px-6 py-20 text-center"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-black text-(--brand-orange)"
            >
              Ready to Generate Certificates in Bulk?
            </h2>

            <p className="mt-4 text-(--text-gray) leading-relaxed">
              Stop creating certificates one at a time.
              Upload your template and generate hundreds
              of personalized documents for free.
            </p>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("certificate-uploading-area")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
              }
              className="mt-7 rounded-xl bg-(--brand-orange) px-8 py-4 font-bold text-white hover:opacity-90 transition-opacity"
            >
              Generate Certificates for Free
            </button>

            <p className="mt-4 text-sm text-(--text-gray)">
              No account required. No manual editing.
            </p>
          </div>
        </section>

        {/* Open source */}
        <section
          id="open-source"
          className="bg-(--bg) px-6 py-20 text-center"
          aria-labelledby="oss-heading"
        >
          <div className="mx-auto max-w-xl">
            <BsGithub className="mx-auto mb-4 h-12 w-12 text-(--text)" />

            <h2
              id="oss-heading"
              className="mb-3 text-3xl font-black text-(--text)"
            >
              Free and Open Source
            </h2>

            <p className="mb-8 text-sm leading-relaxed text-(--text-gray)">
              MultyDocs is open source. Explore the code,
              report issues, suggest features or contribute
              to the project.
            </p>

            <a
              href="https://github.com/Saumya-Kanti-Sarma/multydocs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-(--text) px-6 py-3 text-sm font-semibold text-(--bg) hover:opacity-80 transition-opacity"
            >
              <BsGithub className="h-5 w-5" />
              Star MultyDocs on GitHub
              <BsStarFill className="h-4 w-4" />
            </a>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "MultyDocs",
              url: "https://multydocs.in/",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: 0,
                priceCurrency: "INR",
              },
              description:
                "Free bulk certificate generator. Upload your PNG/JPG template, import a CSV, map fields and download hundreds of personalized certificates as a ZIP. No sign-up required.",
            }),
          }}
        />
      </main>
    </>
  );
}
