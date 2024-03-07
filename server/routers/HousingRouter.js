/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
import express from 'express';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import {
  getHouseInfo,
  createNewHouse,
  getHousesSummary,
  getUserHousing,
} from '../controllers/HousingController.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';

const router = express.Router();

// get the information of the house that the user is assigned to with a user’s _id
router.get('/housing/user', jwtVerifyToken, getUserHousing);

// get summary information of all houses
// may need pagination, but currently not
router.get('/housing/summary', jwtVerifyToken, checkRole(['HR']), getHousesSummary);

// get a house's full information with its _id
router.get('/housing/:houseID', jwtVerifyToken, getHouseInfo);

// create a new house with basic house information:
// a name, an address, landlord information, capacity basic facility information
router.post('/housing', jwtVerifyToken, checkRole(['HR']), createNewHouse);

export default router;
