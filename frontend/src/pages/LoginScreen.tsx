import React from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import greenOasisLogoText from '../components/assets/images/GrüneOaseLogoText.png';
import greenOasisLogo from "../components/assets/images/GrüneOaseLogo.jpeg";
import { useWindowDimensions } from 'react-native';

const GreenOasisLogo = () => {
    const { height, width } = useWindowDimensions();

    return (
        <img className="object-cover h-28" src={width >= 920 ? greenOasisLogoText : greenOasisLogo}/>
    )
}

const LoginScreen: React.FC = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div className="flex h-screen">
      {/* Image container with Header and Footer */}
      <div className="flex flex-col w-2/3 bg-cover bg-center bg-go-login">
        <div className={`bg-goLight bg-opacity-80 text-white text-xl p-4 ${width <1920 ? 'flex items-center justify-center' : ''}`}>
          <GreenOasisLogo/>
        </div>
        <div className="flex-grow"></div>
        <div className="bg-goLight bg-opacity-80 text-white grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-3 text-center p-4">
          <div>Info 1</div>
          <div>Info 2</div>
          <div>Info 3</div>
        </div>
      </div>

      {/* Login Form container */}
      <div className="w-1/3 flex flex-col justify-center items-center p-4">
        <Paper elevation={6} className="p-6 max-w-xs">
          <div className='flex w-full justify-center items-center mb-2'>
            <img className="object-cover h-16" src={greenOasisLogo}/>
          </div>
          <Typography component="h1" variant="h5" className="text-center mb-6">
            Einloggen
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail Adresse"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{marginBottom: 1}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passwort"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{marginBottom: 1}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{marginTop: 2, backgroundColor: "#057038", "&:hover": {backgroundColor: '#97d045'}}}
            >
              Einloggen
            </Button>
          </form>
        </Paper>
    </div>
    </div>
  );
};

export default LoginScreen;