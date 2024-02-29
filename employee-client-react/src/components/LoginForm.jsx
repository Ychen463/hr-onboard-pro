/* eslint-disable import/no-extraneous-dependencies */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import beaconfireLogo from '../assets/beaconfireLogo.jpeg';

import { login } from '../store/slices/authSlice.js';

function LoginForm() {
  const [errorMessage, setErrormessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    try {
      const actionResult = await dispatch(login({ username, password }));
      const result = actionResult.payload;
      if (result.loginJwtToken) {
        navigate('/');
      }
      setErrormessage(result.message);
    } catch (error) {
      console.error('Login failed:', error);
    }
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

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              autoComplete="current-password"
            />
            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"

    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BeconFire
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();
export default LoginForm;
