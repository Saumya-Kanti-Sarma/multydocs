import { NextResponse } from "next/server";

const content = `google.com, pub-8949360149342362, DIRECT, f08c47fec0942fa0
`;

export async function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
