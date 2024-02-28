import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,
} from '@mui/material';

function AddCommentModal() {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddComment = () => {
    // Add comment processing logic here
    console.log(comment); // For demonstration
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Test add modal</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '600px',
            height: '350px',
          },
        }}
      >
        <DialogTitle>New Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="normal"
            id="comment"
            label="Comment"
            type="text"
            variant="outlined"
            multiline
            rows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter new comment"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddComment} variant="contained" color="primary">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCommentModal;
