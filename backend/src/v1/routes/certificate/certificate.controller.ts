import { Request, Response } from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { HTTP_STATUS, s3 } from '../../../constants/constants';
import { env } from '../../../constants/env';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'No file provided' });
    }

    const key = randomUUID();
    await s3.send(
      new PutObjectCommand({
        Bucket: env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    return res.status(HTTP_STATUS.OK).json({ id: key });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.SERVER_ERROR).json({ message: 'Upload failed' });
  }
};