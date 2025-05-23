
import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import validate from '../middlewares/validationMiddleware.js';
import { registerSchema, loginSchema } from '../config/validators/authValidator.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.get('/profile', protect, getUserProfile);

export default router;