/* eslint-disable max-len */
import express from 'express';
import {
  getVisaDetails, getCurrentStep, updateOptReceipt, updateOptEAD, updateI983,
  updateI20, updateVisaDecision, getAll,
} from '../controllers/VisaController.js';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();
// Emp & HR
router.get('/:userAccountId/summary', jwtVerifyToken, checkRole(['HR', 'employee']), getVisaDetails);
router.get('/:userAccountId/currentStatus', jwtVerifyToken, checkRole(['HR', 'employee']), getCurrentStep);
router.post('/:userAccountId/docs/optReceipt', jwtVerifyToken, checkRole(['HR', 'employee']), updateOptReceipt);
router.post('/:userAccountId/docs/optEAD', jwtVerifyToken, checkRole(['HR', 'employee']), updateOptEAD);
router.post('/:userAccountId/docs/i983', jwtVerifyToken, checkRole(['HR', 'employee']), updateI983);
router.post('/:userAccountId/docs/i20', jwtVerifyToken, checkRole(['HR', 'employee']), updateI20);
// HR
// update decision
router.patch('/:userAccountId/:docType/decision', jwtVerifyToken, checkRole(['HR']), updateVisaDecision);
router.get('/all', jwtVerifyToken, checkRole(['HR']), getAll);

export default router;
