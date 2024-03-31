import express from 'express';
import {
	loginUser,
	registerUser,
	resetPassword,
	forgotPassword,
	resetPasswordFromEmail,
} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-pass-from-email', resetPasswordFromEmail);
export default router;
