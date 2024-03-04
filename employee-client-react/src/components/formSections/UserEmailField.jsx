import { Typography, Grid, TextField, FormControl } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectorCurrentUser } from '../../store/slices/authSlice.js';

function UserEmailField() {
  const currentUser = useSelector(selectorCurrentUser);

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Email
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Email"
              name="userEmail"
              type="email"
              value={currentUser?.email || ''}
              fullWidth
              required
              disabled={true}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserEmailField;
