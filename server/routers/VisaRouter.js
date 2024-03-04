/* eslint-disable max-len */
import express from 'express';
import {
  getVisaDetails,
  getCurrentStep,
  updateDoc,
  updateVisaDecision,
  getAll,
  getWithOnboardingAll,
} from '../controllers/VisaController.js';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();
// Emp & HR
router.get(
  '/:userAccountId/summary',
  jwtVerifyToken,
  checkRole(['HR', 'employee']),
  getVisaDetails
);
router.get(
  '/:userAccountId/currentStatus',
  jwtVerifyToken,
  checkRole(['HR', 'employee']),
  getCurrentStep
);
router.post(
  '/:userAccountId/docs/:docType',
  jwtVerifyToken,
  checkRole(['HR', 'employee']),
  updateDoc
);

// HR
// update decision
router.patch(
  '/:userAccountId/:docType/decision',
  jwtVerifyToken,
  checkRole(['HR']),
  updateVisaDecision
);
router.get('/all', jwtVerifyToken, checkRole(['HR']), getAll);
router.get(
  '/allwithOb',
  jwtVerifyToken,
  checkRole(['HR', 'employee']),
  getWithOnboardingAll
);

export default router;
