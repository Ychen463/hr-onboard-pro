/* eslint-disable react/prop-types */
import { useState } from "react";
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
} from "@mui/material";

import StatusLabel from "./StatusLabel.jsx";
import AddCommentModal from "./AddCommentModal.jsx";
import EditCommentModal from "./EditCommentModal.jsx";

function FacilityReportCard({ reportData }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { comments, status, title, description, createdDatetime, createdBy } =
    reportData;

  const handleCommentReport = () => {};

  const handleCloseReport = () => {};
  const handleEditComment = (currentComment) => {
    // dispatch open edit modal with payload of currentComment
    console.log("comment.description", currentComment);
  };
  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 800,
        margin: "auto",
        mt: 2,
      }}
    >
      <AddCommentModal />
      <EditCommentModal />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="div" align="left">
            {title}
          </Typography>

          <StatusLabel status={status} />
        </Box>
        <Typography
          sx={{ mt: 1.5, mb: 1.5 }}
          color="text.secondary"
          align="left"
        >
          {description}
        </Typography>
        <Typography variant="body2" align="left">
          {createdBy}
        </Typography>
        <Typography variant="body2" align="left">
          {createdDatetime}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleExpandClick} sx={{ marginLeft: "auto" }}>
          {expanded ? "Hide Details" : "View Details"}
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph align="left">
            Comments:
          </Typography>
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.user} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{comment.user}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${comment.createdBy} (${comment.role})`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        display="block"
                        align="left"
                      >
                        {comment.description}
                        <br />
                        *Will conditional Button after connecting api*
                        <Button
                          onClick={() => handleEditComment(comment.description)}
                        >
                          Edit
                        </Button>
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        display="block"
                        align="left"
                      >
                        {comment.lastModifiedDatetime}
                      </Typography>
                    </>
                  }
                  primaryTypographyProps={{ align: "left" }}
                  secondaryTypographyProps={{ align: "left" }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={handleCommentReport}
          >
            Comment
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={handleCloseReport}
            sx={{ marginLeft: "auto" }}
          >
            Close Report
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default FacilityReportCard;
