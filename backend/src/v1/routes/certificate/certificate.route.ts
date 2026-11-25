import { Router } from 'express';
import { uploadFile } from './certificate.controller';
import { certificateMulterConfig } from '../../../constants/constants';

const router = Router();

router.post('/', certificateMulterConfig.single('file'), uploadFile);


export default router;