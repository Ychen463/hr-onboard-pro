/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function EditCommentModal({ currentComment }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSaveComment = () => {
    // Add save comment processing logic here
    console.log(comment);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        test Edit modal
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "600px",
            height: "350px",
          },
        }}
      >
        <DialogTitle>EDIT Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            id="comment"
            label="Comment"
            type="text"
            variant="outlined"
            multiline
            rows={6}
            value={currentComment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=""
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSaveComment}
            variant="contained"
            color="primary"
          >
            SAVE
          </Button>
          <Button onClick={handleClose} variant="contained">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCommentModal;
