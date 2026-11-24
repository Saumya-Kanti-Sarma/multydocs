import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

const s3 = new S3Client({
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: "auto",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    return NextResponse.json({ error: "Only PNG and JPG are supported" }, { status: 400 });
  }

  const id = randomUUID();
  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase();
  const key = `${id}.${ext}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
      Key: key,
      Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: file.type,
    })
  );

  const url = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;

  return NextResponse.json({ id, url });
}
