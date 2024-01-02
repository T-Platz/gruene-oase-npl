import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import background from "../components/assets/images/LoginBackground.jpg";
import greenOasisLogoText from '../components/assets/images/GrüneOaseLogoText.png';
import greenOasisLogo from "../components/assets/images/GrüneOaseLogo.jpeg";
import { LocalShippingTwoTone } from "@mui/icons-material";

const GreenOasisLogoText = () => {
    return (
        <img className="object-cover h-28" src={greenOasisLogoText}>
        </img>
    )
}

const GreenOasisLogo = () => {
    return (
        <img className="m-4 object-cover h-28" src={greenOasisLogo}>
        </img>
    )
}

function LandingPage() {
    return (
        <div>
            <Grid container component="main" sx={{height: '100vh'}}>
                {/*left side again split into grid*/}
                <Grid
                    item
                    xs={8}
                    sm={8}
                    sx={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'white',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Grid container sx={{height: '100%'}}>
                        {/*top left: Logo*/}
                        <Grid item sm={12} xs={12} sx={{
                            backgroundColor: '#97d045', height: '20vh', opacity: 0.8
                        }}>
                            <Box
                                sx={{
                                    display: 'flex', flexDirection: 'row',
                                }}
                                >
                                <div className="w-1/10"/>
                                <GreenOasisLogoText/>
                                <div className="w-2/10"/>
                            </Box>
                        </Grid>
                        {/*bottom*/}
                        <Grid item sm={4} sx={{
                            backgroundColor: '#97d045', opacity: 0.8, border: '3px solid'
                        }}>
                           <Box sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                            }}>
                                <Avatar sx={{
                                    m: 1,
                                    backgroundColor: '#97d045',
                                    color: '#e55523',
                                    width: 100,
                                    height: 100,
                                    borderRadius: 15,
                                    border: '3px solid'
                                }}>
                                    <LocalShippingTwoTone sx={{fontSize: 80}}></LocalShippingTwoTone>
                                </Avatar>
                                <div className="bg-goOrange">
                                    <h6 className="text-center">OVERVIEW</h6>
                                    <p className="text-center">Single place for tenders and
                                        communication</p>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item sm={4} sx={{
                            backgroundColor:  '#97d045', opacity: 0.8, border: '3px solid'
                        }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                            }}>
                                <Avatar sx={{
                                    m: 1,
                                    backgroundColor: '#97d045',
                                    color: '#e55523',
                                    width: 100,
                                    height: 100,
                                    borderRadius: 15,
                                    border: '3px solid'
                                }}>
                                    <LocalShippingTwoTone sx={{fontSize: 80}}></LocalShippingTwoTone>
                                </Avatar>
                                <div className="bg-goOrange">
                                    <h6 className="text-center">OVERVIEW</h6>
                                    <p className="text-center">Single place for tenders and
                                        communication</p>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item sm={4} sx={{
                            backgroundColor: '#97d045', opacity: 0.8, border: '3px solid'
                        }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                            }}>
                                <Avatar sx={{
                                    m: 1,
                                    backgroundColor: '#97d045',
                                    color: '#e55523',
                                    width: 100,
                                    height: 100,
                                    borderRadius: 15,
                                    border: '3px solid'
                                }}>
                                    <LocalShippingTwoTone sx={{fontSize: 80}}></LocalShippingTwoTone>
                                </Avatar>
                                <div className="bg-goOrange">
                                    <h6 className="text-center">OVERVIEW</h6>
                                    <p className="text-center">Single place for tenders and
                                        communication</p>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} sm={4} elevation={6} component={Paper} square>
                    <Box
                        sx={{
                            my: 20, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}
                    >
                        <GreenOasisLogo/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={() => {}}
                            sx={{mt: 1}}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={'Password'}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onMouseEnter={() => {}}
                                onMouseLeave={() => {}}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Typography align="center" variant="h3" color='#057038'>
                                    {"Don't have an account? Sign up"}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default LandingPage;