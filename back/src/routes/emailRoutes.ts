import { Router } from 'express';
import { handleSendEmail } from '../controllers/emailController';

const router = Router();

router.post('/send-email', handleSendEmail);

export default router;
