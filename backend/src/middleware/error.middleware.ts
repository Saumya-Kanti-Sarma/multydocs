import { Response } from 'express';
import multer from 'multer';

export const errorHandler = (
  err: any,
  res: Response,
) => {

  // Multer errors
  if (err instanceof multer.MulterError) {

    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message: 'File size exceeds the maximum allowed limit of 5 MB'
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Other errors
  console.error(err);

  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};