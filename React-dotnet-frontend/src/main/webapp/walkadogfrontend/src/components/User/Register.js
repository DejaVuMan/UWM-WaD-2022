import React from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../services/index";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
          main: '#3f51b5',
          secondary: '#D3D3D3',
        },
        secondary: {
          main: '#f50057',
        },
      },
  });

const Register = (props) => {

    const dispatch = useDispatch();
    
    const [checked, setChecked] = React.useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
      };

    const saveUser = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

      dispatch(registerUser(data.get('firstname'),data.get('lastname'),data.get('username'),data.get('password'), checked? true : false))
        .then((response) => {
            console.log(response.data)
            return props.history.push("/login")
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

        return (
            <ThemeProvider theme={theme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="common.white">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={saveUser} noValidate sx={{ mt: 1}}> {/* changes color of text for remember me??? */}
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="firstname"
                        autoFocus
                        
                        sx={{

                            "& .MuiInputBase-root": {
                                "& > fieldset": {
                                    borderColor: 'primary.secondary'
                                }
                            },
                            "& label": {color: "primary.secondary"},
                            "& .MuiInputBase-input": {
                                color: '#D3D3D3'
                            }
                        }}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="lastname"
                        autoFocus
                        
                        sx={{

                            "& .MuiInputBase-root": {
                                "& > fieldset": {
                                    borderColor: 'primary.secondary'
                                }
                            },
                            "& label": {color: "primary.secondary"},
                            "& .MuiInputBase-input": {
                                color: '#D3D3D3'
                            }
                        }}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        sx={{
                            "& .MuiInputBase-root": {
                                "& > fieldset": {
                                    borderColor: 'primary.secondary'
                                }
                            },
                            "& label": {color: "primary.secondary"},
                            "& .MuiInputBase-input": {
                                color: '#D3D3D3'
                            }
                        }}
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
                        
                        sx={{

                            "& .MuiInputBase-root": {
                                "& > fieldset": {
                                    borderColor: 'primary.secondary'
                                }
                            },
                            "& label": {color: "primary.secondary"},
                            "& .MuiInputBase-input": {
                                color: '#D3D3D3'
                            }
                        }}
                        />
                        <FormControlLabel
                            control={<Switch size="small" checked={checked} onChange={toggleChecked} color="primary"/>}
                            label={
                                <Typography color="common.white">
                                    {checked? 'Trainer':'Dog Owner'}
                                </Typography>
                            }
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                        <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2" color="common.white">
                            {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </Container>
                </ThemeProvider>
            );
}

export default Register;
