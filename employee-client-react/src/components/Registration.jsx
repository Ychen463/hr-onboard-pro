import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import beaconfireLogo from '../assets/beaconfireLogo.jpeg';

const defaultTheme = createTheme();

function RegistrationForm() {
  const USER_EMAIL = 'sampleemail@gmail.com';

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    const verifyPassword = data.get('verifypassword');

    // Send create account request here

    console.log({
      username,
      password,
      verifyPassword,
    });
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
              id="email"
              label="email "
              name="email"
              disabled
              defaultValue={USER_EMAIL}
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="verifypassword"
              label="Verify Password "
              name="verifypassword"
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegistrationForm;
