import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/certificate-editor/", "/admin", "/auth"],
    },
    sitemap: "https://multydocs.in/sitemap.xml",
  };
}
