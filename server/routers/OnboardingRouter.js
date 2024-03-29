import express from 'express';
import {
  applyUserOnboarding,
  getUserOnboarding,
  hrUpdateDecision,
  viewOnboardingApplicationsByStatus,
  getAllTokens,
  updateUserOnboarding,
} from '../controllers/OnboardingController.js';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();
// Emp
router.post('/onboarding', jwtVerifyToken, checkRole(['employee']), applyUserOnboarding);
router.post(
  '/onboardin/update/:userAccountId',
  jwtVerifyToken,
  checkRole(['employee']),
  updateUserOnboarding
);

router.get(
  '/onboarding/:userAccountId',
  jwtVerifyToken,
  checkRole(['HR', 'employee']),
  getUserOnboarding
);
// HR
router.patch(
  '/onboarding/:userAccountId/status',
  jwtVerifyToken,
  checkRole(['HR']),
  hrUpdateDecision
);

// Search/Filter all emps by Statuses
router.get(
  '/onboardings/status',
  jwtVerifyToken,
  checkRole(['HR']),
  viewOnboardingApplicationsByStatus
);
router.get('/onboardings', jwtVerifyToken, checkRole(['HR']), getAllTokens);

export default router;
