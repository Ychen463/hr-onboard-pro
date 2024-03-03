import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

import {
  selectisAddCommentModalOpen,
  closeAddCommentModal,
} from '../../store/slices/FacilityRportModalSlice.js';
import { addComment } from '../../store/slices/facilityReportSlice';

function AddCommentModal() {
  const dispatch = useDispatch();
  const open = useSelector(selectisAddCommentModalOpen);
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    // ????? how to get facilityReportId????
    //dispatch(addComment({ facilityReportId, description: comment }));
    console.log(comment);
    setComment('');
    dispatch(closeAddCommentModal());
  };

  return (
    <div>
      <Dialog
        open={open}
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
