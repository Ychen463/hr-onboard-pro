import express from 'express';
import { register, login, validateSession } from '../controllers/UserAccountController.js';
import RegiJwtVerifyToken from '../middlewares/RegistrationMiddlewares/RegistrationAuthMiddleware.js';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();

router.post('/register', RegiJwtVerifyToken, checkRole(['employee']), register);
// @todo: if there's existed token, LOG in skipped, redirected to main page of HR or employee
router.post('/login', login);
router.get('/session/validate', jwtVerifyToken, validateSession);

export default router;
