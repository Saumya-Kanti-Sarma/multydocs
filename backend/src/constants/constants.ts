import { S3Client } from "@aws-sdk/client-s3";
import { CorsOptions } from "cors";

import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
} as const;
const origin = {
  production: ['https://multydocs.in', 'https://app.multydocs.in', 'https://account.multydocs.in', 'https://www.multydocs.in'],
  development: true
}
export const CORS_settings = {
  origin: process.env.SERVER == "production" ? origin.production : origin.development,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
} as CorsOptions;

export const s3 = new S3Client({
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: "auto",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export const certificateMulterConfig = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});