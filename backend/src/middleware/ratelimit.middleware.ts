import rateLimit from "express-rate-limit";

const limiter = {
  accountLimiter: {
    get: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
    },
    post: {
      windowMs: 15 * 60 * 1000,
      max: 15,
    },
    put: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
  },
  certificateLimiter: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
  }
}

// all the requests from account.multydocs.in 
export const accountLimiter = {
  get: rateLimit({
    windowMs: limiter.accountLimiter.get.windowMs,
    max: limiter.accountLimiter.get.max,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests, please try again after 15 minutes'
  }),
  post: {
    windowMs: limiter.accountLimiter.post.windowMs,
    max: limiter.accountLimiter.post.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again after 15 minutes'
  },
  put: {
    windowMs: limiter.accountLimiter.put.windowMs,
    max: limiter.accountLimiter.put.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again after 15 minutes'
  }
}


// all request for uploading certificates
export const certificateLimiter = rateLimit({
  windowMs: limiter.certificateLimiter.windowMs,
  max: limiter.certificateLimiter.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again after 15 minutes'
})