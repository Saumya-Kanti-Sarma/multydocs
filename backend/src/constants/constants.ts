import { CorsOptions } from "cors";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
} as const;

export const CORS_settings = {
  origin: ['https://multydocs.in', 'https://app.multydocs.in', 'https://account.multydocs.in', 'https://www.multydocs.in'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
} as CorsOptions;