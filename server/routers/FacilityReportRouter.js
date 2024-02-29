/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
import express from 'express';
import jwtVerifyToken from '../middlewares/AuthMiddleware.js';
import checkRole from '../middlewares/CheckRoleMiddleware.js';
import {
  getUserFacilityReports, getHouseFacilityReports, createFacilityReport, closeFacilityReport,
  addFRComment, editFRComment,
} from '../controllers/FacilityReportController.js';

const router = express.Router();

// get facility reports created by a single user with userAccountId, for employee
router.get('/facilityReports/user', jwtVerifyToken, checkRole(['employee']), getUserFacilityReports);

// get facility reports related to a house with housingId, for HR
router.post('/facilityReports/house', jwtVerifyToken, checkRole(['HR']), getHouseFacilityReports);

// create a new facility report, for employee
router.post('/facilityReport', jwtVerifyToken, checkRole(['employee']), createFacilityReport);

// close a facility report, for employee
router.patch('/facilityReport', jwtVerifyToken, checkRole(['employee']), closeFacilityReport);

// create a new facility report comment
router.post('/facilityReport/comment', jwtVerifyToken, addFRComment);

// edit a facility report comment
router.patch('/facilityReport/comment', jwtVerifyToken, editFRComment);

export default router;
