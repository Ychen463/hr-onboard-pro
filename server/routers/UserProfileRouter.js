/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
import express from 'express';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';
import { getAllProfileSummary } from '../controllers/UserProfileController.js';

const router = express.Router();

// Get all employees' profile summary, sort by last name alphabetically
// Name, SSN, Work Authorization Title, Phone Number, email
router.get('/employees/profiles', jwtVerifyToken, checkRole('HR'), getAllProfileSummary);

//

export default router;
