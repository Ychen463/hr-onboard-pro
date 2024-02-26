/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
import express from 'express';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';
import {
  getAllProfileSummary, getEmployeeFullProfile, getProfile, updateProfile,
} from '../controllers/UserProfileController.js';

const router = express.Router();

// Get all employees' profile summary, sort by last name alphabetically
// Name, SSN, Work Authorization Title, Phone Number, email
router.get('/employee/profiles', jwtVerifyToken, checkRole(['HR']), getAllProfileSummary);

// View an employee’s entire profile, for HR
router.post('/employee/profile', jwtVerifyToken, checkRole(['HR']), getEmployeeFullProfile);

// View an employee’s entire profile, for employee
router.get('/profile', jwtVerifyToken, checkRole(['employee']), getProfile);

// Update a profile, for employee
router.patch('/profile', jwtVerifyToken, checkRole(['employee']), updateProfile);

// Create a profile for an employee??
router.post('/employee/profile', jwtVerifyToken);

export default router;
