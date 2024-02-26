import express from 'express';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';
import getPresignedUrl from '../controllers/AWSS3Controller.js';

const router = express.Router();
// Emp
router.get('/generatePresignedUrl', jwtVerifyToken, checkRole(['employee']), getPresignedUrl);

export default router;
