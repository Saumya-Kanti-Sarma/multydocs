import { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";

const baseUrl = "https://multydocs.in";
const staticDates = {
  home: new Date("2026-11-07T14:30:45Z"),
  faqs: new Date("2026-11-05T11:20:35Z"),
  blogs: new Date("2026-11-03T09:15:25Z"),
  excel: new Date("2026-11-02T16:40:55Z"),
  llm: new Date("2026-11-01T08:10:15Z"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: staticDates.home,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: staticDates.faqs,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: staticDates.blogs,
    },
    {
      url: `${baseUrl}/excel-to-certificate-generator`,
      lastModified: staticDates.excel,
    },
    {
      url: `${baseUrl}/llm.txt`,
      lastModified: staticDates.llm,
    },
  ];

  const blogUrls: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.dateModified),
  }));

  return [...staticUrls, ...blogUrls];
}
