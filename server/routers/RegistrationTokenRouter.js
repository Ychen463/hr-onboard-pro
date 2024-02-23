/* eslint-disable import/named */
import express from 'express';
import { generateRegiToken, updateTokenStatus, getTokenStatus } from '../controllers/RegistrationTokenController.js';
import { validateToken } from '../middlewares/RegistrationTokenMiddleware.js';
// import jwtVerifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registrationToken', generateRegiToken);
router.patch('/registrationToken/:token', validateToken, updateTokenStatus);
router.get('/registrationToken/:token', getTokenStatus);

// router.post('/logout', jwtVerifyToken, logout);
// router.get('/overview', jwtVerifyToken, redirectIfNotLoggedIn, overview);

export default router;
