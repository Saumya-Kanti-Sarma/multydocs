export async function GET() {
  const content = `# MultyDocs — LLM Context File

## Site Overview
MultyDocs is a free bulk certificate generator that lets users upload a certificate template (PNG/JPG), import recipient data via CSV, map fields, and generate personalized certificates in bulk — downloaded as a ZIP file. No account or sign-up is required.

## Base URL
https://multydocs.in

## Key Routes
| Route | Purpose |
|-------|---------|
| / | Home page — upload certificate template and start generating |
| /faqs | Frequently asked questions about bulk certificate generation |
| /blogs/how-to-generate-bulk-certificates | Step-by-step guide to bulk certificate generation |
| /blogs/how-to-generate-bulk-certificates-for-free | Free bulk certificate generation without sign-up |
| /blogs/how-to-generate-bulk-certificates-canva-alternative | Canva alternative for bulk certificates |
| /blogs/how-to-generate-many-certificates-for-hackathon | Bulk certificates for hackathon events |
| /blogs/how-to-create-same-certificate-for-many-users-for-free | Create certificates for many users at no cost |

## How Bulk Certificate Generation Works
1. Upload your certificate template (PNG or JPG).
2. Add recipient data using a CSV file (names, dates, scores, etc.).
3. Map CSV columns to text fields on your template.
4. Generate all certificates at once and download as a ZIP file.

## Features
- Free to use, no account required
- Supports PNG and JPG certificate templates
- CSV data import for recipient information
- Bulk generation of personalized certificates
- ZIP download of all generated certificates
- Works for schools, colleges, events, HR teams, hackathons, and more

## Contact
Founder email: developer.saumyasarma@gmail.com

## Sitemap
https://multydocs.in/sitemap.xml

## Robots
https://multydocs.in/robots.txt
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export default GET;
