// eslint-disable-next-line import/no-extraneous-dependencies
import { validationResult } from 'express-validator';
import FacilityReport from '../models/FacilityReportModel.js';
import UserAccount from '../models/UserAccountModel.js';

// get facility reports created by a single user with userAccountId, for employee
const getUserFacilityReports = async (req, res) => {
  const { userId } = req.user;

  try {
    const reportList = await FacilityReport.find({ createdBy: userId })
      .populate({
        path: 'comments.createdBy', // Use dot notation to specify the nested path
        model: 'UserAccount', // Model to populate from
        select: '_id username userRole',
      })
      .lean()
      .exec();
    // if no report found, will return an empty list
    res.status(200).json({
      message: 'Report list found.',
      reportList,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get facility reports related to a house with housingId, for HR
const getHouseFacilityReports = async (req, res) => {
  const { housingId } = req.body;
  // if req body does not contain housingId
  if (!housingId) {
    return res.status(422).json({
      message: 'Missing housingId to fetch the list of facility reports.',
    });
  }

  try {
    const reportList = await FacilityReport.find({ housing: housingId })
      .populate({
        path: 'createdBy', // Populate createdBy in facilityReportSchema
        model: 'UserAccount',
        select: '_id username userRole',
      })
      .populate({
        path: 'comments.createdBy', // Use dot notation to specify the nested path
        model: 'UserAccount', // Model to populate from
        select: '_id username userRole',
      })
      .lean()
      .exec();
    // if no report found, will return an empty list
    res.status(200).json({
      message: 'Report list found.',
      reportList,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create a new facility report, for employee
const createFacilityReport = async (req, res) => {
  const { userId } = req.user;
  const { title, description } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  // if no title or no description
  if (!(title && description)) {
    return res.status(422).json({ message: 'Missing title or description to create.' });
  }

  try {
    const account = await UserAccount.findById(userId).lean().exec();
    if (!account) {
      return res.status(422).json({ message: 'Can not find an account with the userId.' });
    }

    const newReport = {
      housing: account.housingId,
      title,
      description,
      createdBy: userId,
      createdDatetime: new Date(),
      status: 'Open',
      comments: [],
    };

    const reportCreated = await FacilityReport.create(newReport);

    if (reportCreated) {
      const report = await FacilityReport.populate(reportCreated, {
        path: 'createdBy',
        model: 'UserAccount',
        select: '_id username userRole',
      });
      res.status(201).json({
        message: 'Report created.',
        report,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// close a facility report, for employee
const closeFacilityReport = async (req, res) => {
  const { userId } = req.user;
  const { facilityReportId } = req.body;
  if (!facilityReportId) {
    return res.status(422).json({ message: 'Missing facilityReportId to get the report.' });
  }

  try {
    const reportFound = await FacilityReport.findById(facilityReportId).lean().exec();
    if (!reportFound) {
      return res.status(422).json({ message: 'Report is not found.' });
    }
    if (String(reportFound.createdBy) !== userId) {
      return res.status(403).json({ message: 'User is not closing his/her own report.' });
    }

    const updatedReport = await FacilityReport.findByIdAndUpdate(
      facilityReportId,
      { $set: { status: 'Closed' } },
      { new: true }
    )
      .populate({
        path: 'comments.createdBy', // Use dot notation to specify the nested path
        model: 'UserAccount', // Model to populate from
        select: '_id username userRole',
      })
      .lean()
      .exec();
    if (updatedReport) {
      res.status(200).json({
        message: 'Report closed.',
        updatedReport,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create a new facility report comment
const addFRComment = async (req, res) => {
  const { userId, userRole } = req.user;
  const { facilityReportId, description } = req.body;
  if (!(facilityReportId && description)) {
    return res.status(422).json({
      message: 'Missing facilityReportId or description to create the comment.',
    });
  }

  try {
    const newComment = {
      description,
      createdBy: userId,
      lastModifiedDatetime: new Date(),
    };

    const reportFound = await FacilityReport.findById(facilityReportId).lean().exec();

    if (!reportFound) {
      return res.status(404).json({ message: 'No report found with the id.' });
    }

    if (String(reportFound.createdBy) !== userId && userRole !== 'HR') {
      return res.status(403).json({
        message: 'User is not authorized to add comment to this report.',
      });
    }

    const newCommentList = [...reportFound.comments, newComment];

    const updatedReport = await FacilityReport.findByIdAndUpdate(
      facilityReportId,
      { comments: newCommentList, status: 'InProgress' },
      { new: true }
    )
      .populate({
        path: 'comments.createdBy', // Use dot notation to specify the nested path
        model: 'UserAccount', // Model to populate from
        select: '_id username userRole',
      })
      .lean()
      .exec();

    if (updatedReport) {
      res.status(200).json({
        message: 'Comment added.',
        updatedReport,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// edit a facility report comment
const editFRComment = async (req, res) => {
  const { userId } = req.user;
  const { facilityReportId, commentId, description } = req.body;
  if (!(facilityReportId && commentId && description)) {
    return res.status(422).json({
      message: 'Missing facilityReportId, commentId or description to create the comment.',
    });
  }

  try {
    const reportFound = await FacilityReport.findById(facilityReportId).lean().exec();

    if (!reportFound) {
      return res.status(404).json({ message: 'No report found with the id.' });
    }

    // Find the index of the comment to update in the array
    const commentIndex = reportFound.comments.findIndex(
      (comment) => String(comment._id) === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: 'No comment found with the id.' });
    }
    if (String(reportFound.comments[commentIndex].createdBy) !== userId) {
      return res.status(403).json({ message: 'User is not editting his/her own comment.' });
    }
    // Create a shallow copy of the comments array to modify
    const updatedCommentsList = [...reportFound.comments];
    updatedCommentsList[commentIndex].description = description;
    updatedCommentsList[commentIndex].lastModifiedDatetime = new Date();

    const updatedReport = await FacilityReport.findByIdAndUpdate(
      facilityReportId,
      { comments: updatedCommentsList },
      { new: true }
    )
      .populate({
        path: 'comments.createdBy', // Use dot notation to specify the nested path
        model: 'UserAccount', // Model to populate from
        select: '_id username userRole',
      })
      .lean()
      .exec();

    if (updatedReport) {
      res.status(200).json({
        message: 'Comment updated.',
        updatedReport,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getUserFacilityReports,
  getHouseFacilityReports,
  createFacilityReport,
  closeFacilityReport,
  addFRComment,
  editFRComment,
};
