/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
import express from 'express';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import { getHouseInfo, createNewHouse } from '../controllers/HousingController.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();

// get a house's full information with its _id
router.get('/housing', jwtVerifyToken, getHouseInfo);

// create a new house with basic house information:
// a name, an address, landlord information, capacity basic facility information
router.post('/housing', jwtVerifyToken, checkRole(['HR']), createNewHouse);

export default router;
