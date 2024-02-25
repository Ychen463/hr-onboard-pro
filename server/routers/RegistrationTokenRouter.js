import express from 'express';
import { generateRegiToken, updateTokenStatus, getTokenStatus } from '../controllers/RegistrationTokenController.js';
import validateToken from '../middlewares/RegistrationMiddlewares/RegistrationTokenMiddleware.js';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();

// @todo: implement authorization: only HR can generate token
// router.post('/registrationToken', jwtVerifyToken, checkRole(['HR']), generateRegiToken);
router.post('/', jwtVerifyToken, checkRole(['HR']), generateRegiToken);
router.patch('/:token', validateToken, updateTokenStatus);
router.get('/:token', getTokenStatus);

export default router;
