import express from 'express';
import { applyUserOnboarding, getUserOnboarding } from '../controllers/OnboardingController.js';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';

const router = express.Router();
router.post('/onboarding', jwtVerifyToken, applyUserOnboarding);
router.get('/onboarding/:userAccountId', jwtVerifyToken, getUserOnboarding);

export default router;
