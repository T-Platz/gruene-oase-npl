import React, { FormEvent, useState } from 'react';
import { TextField, Button, Container, Paper, Typography, FormControlLabel, Checkbox, Box } from '@mui/material';
import greenOasisLogoText from '../components/assets/images/GrüneOaseLogoText.png';
import greenOasisLogo from "../components/assets/images/GrüneOaseLogo.jpeg";
import { useWindowDimensions } from 'react-native';
import { infoDescriptionList, infoIconList, infoTitleList } from '../utils/Common';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../Routes';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import api from '../utils/ApiService';


interface GreenOasisLogoProps {
    showText: boolean
}

const GreenOasisLogo = (props: GreenOasisLogoProps) => {
    return (
        <img className="object-cover h-28" src={props.showText ? greenOasisLogoText : greenOasisLogo}/>
    )
}

interface InfoBoxProps {
    index: number
}

function InfoBox(props: InfoBoxProps) {
    return (
        <div className='h-2/10 flex flex-col justify-start items-center border-white border-l border-r border-b px-4 py-8'>
            {infoIconList[props.index]}
            <Typography variant='h5' color="white" sx={{textAlign: 'center', marginY: 1}}>{infoTitleList[props.index]}</Typography>
            <Typography variant='body1' color="white" sx={{textAlign: 'center'}}>{infoDescriptionList[props.index]}</Typography>
        </div>
    );
}

const LoginScreen: React.FC = () => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();
  const [register,setRegister] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [getNotifications, setGetNotifications] = useState<boolean>(true);
  const dispatch = useDispatch();

  interface User {
    name: string;
    email: string;
    notify: boolean;
    auth: string;
  }

  const login = async (event: any) => {
    try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //check for valid email format
        const email = data.get('email')?.toString().trimEnd().trimStart()
        const password = data.get('password')?.toString();
        let noError : boolean =true
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email? email : "")) {
            setEmailError(true);
            noError = false;
        }
        if (password && password.length < 6) {
            setPasswordError(true);
            noError = false;
        }
        if (noError) {
            const credentials = {email: email, password: password, notify: getNotifications};

            const response = await api.post(register ? 'auth/register' : 'auth/login', {
              body: JSON.stringify(credentials),
              headers: {
                  'Content-Type': 'application/json'
              }
            });
            console.log('Response', response);
            const user = await response.json() as User;
            console.log('User', user);  

            dispatch(setUser({ token: user.auth }))
            navigate(ROUTES.GARDENS);
        }
    } catch (e) {
        alert('Login failed.');
    }
}



  return (
    <div className="flex h-screen">
      {/* Image container with Header and Footer */}
      {width >= 640 ?
      <div className="flex flex-col w-3/5 bg-cover bg-center bg-go-login">
        <div className={`bg-goLight bg-opacity-80 text-white text-xl p-4 ${width <1920 ? 'flex items-center justify-center' : ''}`}>
          <GreenOasisLogo showText={width >= 840}/>
        </div>
        <div className="flex-grow"></div>
        <div className="bg-goLight bg-opacity-80 text-white grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-1">
          <InfoBox index={0}/>
          <InfoBox index={1}/>
          <InfoBox index={2}/>
        </div>
      </div> : <></>}

      {/* Login Form container */}
      <div className={`flex flex-col justify-center items-center p-4 ${width >= 640 ? 'w-2/5' : 'w-full bg-cover bg-no-repeat bg-center bg-go-login'}`}>
        <Paper elevation={6} className="p-6 max-w-xs">
          <div className='flex w-full justify-center items-center mb-2 text-center'>
            <img className={`object-cover ${width >= 640 ? "h-16":  "w-full"}`} src={width >= 640 ? greenOasisLogo : greenOasisLogoText}/>
          </div>
          <Typography component="h1" variant="h5" sx={{marginY: 2, textAlign: 'center'}}>
            {register? "Jetzt registrieren!" : "Willkommen zurück!"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={login}
            sx={{mt: 1}}
          >
            <TextField
                variant="outlined"
                error={emailError}
                helperText={emailError ? "Geben Sie eine valide E-Mail-Adresse ein." : ""}
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-Mail-Adresse"
                name="email"
                autoFocus
                sx={{
                    '& label.Mui-focused': {
                    color: '#057038', // Change color of the label on focus
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'grey', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'grey', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#057038', // Border color on focus
                        },
                    },
                    backgroundColor: 'white',
                    marginBottom: 1
                }}
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
                error={passwordError}
                helperText={passwordError ? "Ein Passwort muss aus mindestens 6 Buchstaben bestehen." : ""}
                sx={{
                    '& label.Mui-focused': {
                    color: '#057038', // Change color of the label on focus
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'grey', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'grey', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#057038', // Border color on focus
                        },
                    },
                    backgroundColor: 'white',
                    marginBottom: 1
                }}
            />
            {register? 
            <div className='flex w-full justify-center items-center my-4'>
                <FormControlLabel
                    control={
                    <Checkbox checked={getNotifications} onChange={(event) => {setGetNotifications(event.target.checked)}} 
                        sx={{color: '#057038', '&.Mui-checked': { color: '#057038',},}} />}
                    label="Ich möchte Meldungen über meinen Garten per Mail erhalten"
                />
            </div> 
            : <div/>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{marginTop: 2, backgroundColor: "#057038", "&:hover": {backgroundColor: '#97d045'}}}
            >
                Einloggen
            </Button>
          </Box>
        </Paper>
        <div onClick={() => {setRegister(!register);}}>
            <Typography align="center" color={width >= 640 ? "#057038" : 'white'} variant="body1" sx={{marginY: 3, cursor: 'pointer'}}>
                {register ? "Sie haben schon einen Account? Jetzt anmelden" : "Noch kein Account? Jetzt registrieren"}
            </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;