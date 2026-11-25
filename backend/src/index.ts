import express, { json, Response } from 'express';
import cors from "cors";
import { CORS_settings } from './constants/constants';
import v1Router from './v1';
import { env } from './constants/env';
import { errorHandler } from './middleware/error.middleware';


const app = express();

// middlewares
app.use(json());
app.use(cors(CORS_settings));
app.use('/api/v1', v1Router)
app.use(errorHandler); //must be registered after all routes


// routes
app.get('/', (_, res: Response) => {
  res.json({ message: 'Hello from Express TypeScript!' });
});


// port
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});   