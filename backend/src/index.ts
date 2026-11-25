import express, { json, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { CORS_settings } from './constants/constants';


// configurations
dotenv.config()
const app = express();

// middlewares
app.use(json());
app.use(cors(CORS_settings));
app.use('/api/v1',)



// routes
app.get('/', (_, res: Response) => {
  res.json({ message: 'Hello from Express TypeScript!' });
});


// port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});   