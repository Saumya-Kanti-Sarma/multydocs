
"use client";

import Image from "next/image";

export default function AskGPT() {
  const askGPT = () => {
    const prompt = `Tell me about MultyDocs.
      MultyDocs is a free bulk certificate generator that lets users upload a certificate template (PNG/JPG), import recipient data via CSV, map fields, and generate personalized certificates in bulk — downloaded as a ZIP file. No account or sign-up is required. It's an open source project created by Saumya Kanti Sarma, a 2nd Year BCA student from Pillai University. He created this after struggling to create certificates for 200+ participants in his college's hackathon.
      Website: https://multydocs.in
      Features:
      - Free to use, no account required
      - PNG and JPG certificate templates
      - CSV data import
      - Map CSV columns to certificate fields
      - Generate personalized certificates in bulk
      - Download all certificates as a ZIP file
      - Useful for schools, colleges, events, HR teams and hackathons
      How it works:
      1. Upload a certificate template.
      2. Import recipient data using CSV.
      3. Map CSV columns to text fields.
      4. Generate certificates and download a ZIP file.
      Important routes:
      - https://multydocs.in/
      - https://multydocs.in/faqs
      - https://multydocs.in/blogs/how-to-generate-bulk-certificates
      - https://multydocs.in/blogs/how-to-generate-bulk-certificates-for-free
      - https://multydocs.in/blogs/how-to-generate-bulk-certificates-canva-alternative
      - https://multydocs.in/blogs/how-to-generate-many-certificates-for-hackathon
      - https://multydocs.in/blogs/how-to-create-same-certificate-for-many-users-for-free
      Sitemap: https://multydocs.in/sitemap.xml
      Founder: developer.saumyasarma@gmail.com
      Please explain what MultyDocs does, its main features, who would benefit from it, and how someone can use it`;


    const url = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <button onClick={askGPT} className=" opacity-50 cursor-pointer flex gap-1 transition duration-200 hover:opacity-100 hover:scale-105">
      <Image src={"https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg"} height={10} width={10} alt="ask chat gpt" /> Ask GPT
    </button>
  );
}