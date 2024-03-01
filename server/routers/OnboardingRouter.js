import express from 'express';
import {
<<<<<<< HEAD
  applyUserOnboarding, getUserOnboarding, hrUpdateDecision,
  viewOnboardingApplicationsByStatus, getAllTokens,
=======
  applyUserOnboarding,
  getUserOnboarding,
  hrUpdateDecision,
  viewOnboardingApplicationsByStatus,
>>>>>>> d06cdbdbabf5acea40123bd387ff865e16a7a258
} from '../controllers/OnboardingController.js';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();
// Emp
router.post('/onboarding', jwtVerifyToken, checkRole(['employee']), applyUserOnboarding);
router.get(
  '/onboarding/:userAccountId',
  jwtVerifyToken,
  checkRole(['HR', 'employee']),
  getUserOnboarding
);
// HR
<<<<<<< HEAD
router.patch('/onboarding/:userAccountId/status', jwtVerifyToken, checkRole(['HR']), hrUpdateDecision);

// Search/Filter all emps by Statuses
router.get('/onboardings/status', jwtVerifyToken, checkRole(['HR']), viewOnboardingApplicationsByStatus);
router.get('/onboardings', jwtVerifyToken, checkRole(['HR']), getAllTokens);
=======
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
>>>>>>> d06cdbdbabf5acea40123bd387ff865e16a7a258

export default router;
