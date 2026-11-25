import { Router } from 'express';
import { certificateLimiter } from '../middleware/ratelimit.middleware';
import certificateRoutes from "./routes/certificate/certificate.route";


const v1Router = Router();


// v1 sub-routes
v1Router.use('/certificate', certificateLimiter, certificateRoutes);


//  V1 root health/info endpoint
v1Router.get('/', (_req, res) => {
  res.json({
    success: true,
    version: 'v1',
    routes: {
      "/certificate": {
        post: {
          contentType: "form-data",
          fieldName: "file",
          maxSize: "5MB (5*1024*1024)",
          authentication: "not required",
          successResponse: {
            status: 200,
            data: {
              "id": "550e8400-e29b-41d4-a716-446655440000"
            },
          },
          possibleErrors: {
            status: {
              "400": "No file Provided",
              "413": "File exceeds size limit",
              "500": "upload failed",
            }
          }
        }
      }
    }
  });
});

export default v1Router;