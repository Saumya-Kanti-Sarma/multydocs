export interface BlogAuthor {
  name: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: BlogAuthor;
}

export const blogAuthor: BlogAuthor = {
  name: "Saumya Kanti Sarma",
};

export const blogs: BlogPost[] = [
  {
    slug: "how-to-generate-bulk-certificates",
    title: "How to Create Bulk Certificates (Step-by-Step Guide)",
    description:
      "Step-by-step guide to create bulk certificates online. Upload a PNG/JPG template, import a CSV, map fields and download personalized certificates as a ZIP.",
    excerpt:
      "The complete step-by-step guide to generating bulk certificates: upload a template, import a CSV, map fields and download a ZIP.",
    image: "/blogs/th1.webp",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    author: blogAuthor,
  },
  {
    slug: "how-to-generate-bulk-certificates-for-free",
    title: "Free Online Bulk Certificate Generator: No Sign-Up",
    description:
      "Free bulk certificate generator with no sign-up. Upload your PNG/JPG template, import a CSV and download personalized certificates as a ZIP at no cost.",
    excerpt:
      "Generate bulk certificates for free with no sign-up. Upload your template, import a CSV and download personalized certificates as a ZIP.",
    image: "/blogs/th1.webp",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    author: blogAuthor,
  },
  {
    slug: "how-to-create-same-certificate-for-many-users-for-free",
    title: "Generate Many Certificates for Many Users from One Template",
    description:
      "Generate many certificates for many users from one template. Upload your design, import a CSV of recipients and create personalized certificates in bulk.",
    excerpt:
      "One template, many recipients. Prepare a CSV with names and details, map columns and generate personalized certificates for every user.",
    image: "/blogs/th2.webp",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    author: blogAuthor,
  },
  {
    slug: "how-to-generate-bulk-certificates-canva-alternative",
    title: "Canva Bulk Create Alternative: Free Bulk Certificates",
    description:
      "Canva Bulk Create alternative for free bulk certificates. No paid plan or sign-up: use your own PNG/JPG template and download ZIP free. No account needed.",
    excerpt:
      "Canva Bulk Create needs a paid plan. MultyDocs is a free alternative: use your own PNG/JPG template and CSV data, no sign-up required.",
    image: "/blogs/th1.webp",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    author: blogAuthor,
  },
  {
    slug: "how-to-generate-many-certificates-for-hackathon",
    title: "Bulk Certificates for Hackathons and College Events",
    description:
      "Bulk certificates for hackathons and college events. Generate participation, winner and mentor certificates from one template and CSV, then download as ZIP.",
    excerpt:
      "Generate participation, winner and mentor certificates for hackathons and college events in bulk from one template and a CSV.",
    image: "/blogs/th2.webp",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    author: blogAuthor,
  },
];

export function getBlog(slug: string) {
  return blogs.find((post) => post.slug === slug);
}

export function blogUrl(slug: string) {
  return `https://multydocs.in/blogs/${slug}`;
}
