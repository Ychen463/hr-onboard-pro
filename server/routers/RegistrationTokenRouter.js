import express from 'express';
import {
  generateRegiToken, updateTokenStatus, getTokenStatus, getAllTokens,
} from '../controllers/RegistrationTokenController.js';
import validateToken from '../middlewares/RegistrationMiddlewares/RegistrationTokenMiddleware.js';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();

router.post('/', jwtVerifyToken, checkRole(['HR']), generateRegiToken);
router.patch('/:token', validateToken, updateTokenStatus);
router.get('/:token', getTokenStatus);
router.get('/', getAllTokens);

export default router;
