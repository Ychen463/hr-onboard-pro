/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
} from '@mui/material';

import StatusLabel from './StatusLabel.jsx';
import AddCommentModal from './AddCommentModal.jsx';
import EditCommentModal from './EditCommentModal.jsx';

import {
  openAddCommentModal,
  openEditCommentModal,
} from '../../store/slices/FacilityRportModalSlice.js';

import {
  closeFacilityReport,
  selectFacilityReportById,
  selectFacilityReportState,
} from '../../store/slices/facilityReportSlice.js';

function FacilityReportCard({ reportData }) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const { createdBy, createdDatetime, description, housing, status, title } = reportData ?? {};
  const reportId = reportData?._id;
  const comments = reportData?.comments;

  const createdByUsername = createdBy.username ? createdBy.username : '';
  const createdDate = createdDatetime.split('T')[0];
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentReport = () => {
    dispatch(openAddCommentModal(reportId));
  };
  const handleEditComment = (payload) => {
    dispatch(openEditCommentModal(payload));
  };
  const handleCloseReport = () => {
    dispatch(closeFacilityReport(reportId));
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 800,
        margin: 'auto',
        mt: 2,
      }}
    >
      <AddCommentModal />
      <EditCommentModal />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" component="div" align="left">
            {title}
          </Typography>

          <StatusLabel status={status} />
        </Box>
        <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary" align="left">
          {description}
        </Typography>
        <Typography variant="body2" align="left">
          {createdByUsername}
        </Typography>
        <Typography variant="body2" align="left">
          {createdDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleExpandClick} sx={{ marginLeft: 'auto' }}>
          {expanded ? 'Hide Details' : 'View Details'}
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph align="left">
            Comments:
          </Typography>
          <List>
            {comments &&
              comments.map((comment) => (
                <ListItem key={comment._id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{comment.createdBy.username.split('', 1)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${comment.createdBy.username} (${comment.createdBy.userRole})`}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                          align="left"
                        >
                          <span>{comment.description}</span>
                          {comment.createdBy.userRole === 'employee' && (
                            <Button
                              onClick={() =>
                                handleEditComment({
                                  description: comment.description,
                                  commentId: comment._id,
                                  reportId: reportId,
                                })
                              }
                            >
                              EDIT
                            </Button>
                          )}
                        </Typography>
                        <Typography component="span" variant="body2" display="block" align="left">
                          {comment.lastModifiedDatetime.split('T')[0]}
                        </Typography>
                      </>
                    }
                    primaryTypographyProps={{ align: 'left' }}
                    secondaryTypographyProps={{ align: 'left' }}
                  />
                </ListItem>
              ))}
          </List>
        </CardContent>
        {status !== 'Closed' && (
          <CardActions>
            <Button size="small" variant="contained" onClick={handleCommentReport}>
              Comment
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCloseReport}
              sx={{ marginLeft: 'auto' }}
            >
              Close Report
            </Button>
          </CardActions>
        )}
      </Collapse>
    </Card>
  );
}

export default FacilityReportCard;
