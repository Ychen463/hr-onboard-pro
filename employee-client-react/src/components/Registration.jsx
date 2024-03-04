import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import beaconfireLogo from '../assets/beaconfireLogo.jpeg';

import { useSelector, useDispatch } from 'react-redux';
import {
  registration,
  selectAuthError,
  selectIsAuthLoading,
  selectIsLoggedIn,
  selectRegistrationInfo,
} from '../store/slices/authSlice.js';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function RegistrationForm() {
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsAuthLoading);
  const isLoggedin = useSelector(selectIsLoggedIn);
  const { email } = useSelector(selectRegistrationInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      navigate('/');
    }
  }, [isLoggedin]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    // Send create account request here

    console.log({
      username,
      password,
    });

    dispatch(registration({ username, password }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={beaconfireLogo} alt="Logo" />
          <Typography component="h1" variant="h5" margin={5}>
            Get Started With BeaconFire
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email "
              name="email"
              // disabled={true}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name "
              name="username"
              autoComplete="username"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegistrationForm;
