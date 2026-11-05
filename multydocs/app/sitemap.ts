import { MetadataRoute } from "next";

const baseUrl = "https://multydocs.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs/how-to-generate-bulk-certificates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs/how-to-generate-bulk-certificates-for-free`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs/how-to-generate-bulk-certificates-canva-alternative`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blogs/how-to-generate-many-certificates-for-hackathon`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blogs/how-to-create-same-certificate-for-many-users-for-free`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
