import React from 'react';
import {useDispatch} from "react-redux";
import {authenticateUser} from "../../services/index";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import Dialog from '@mui/material/Dialog';

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

const Login = (props) => {

    const dispatch = useDispatch();

    const validateUser = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

      dispatch(authenticateUser(data.get('username'), data.get('password')))
        .then((response) => {
            console.log(response.data)
            return props.history.push("/home")
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={validateUser} noValidate sx={{ mt: 1}}> {/* changes color of text for remember me??? */}
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
                        control={<Checkbox value="remember" color="primary" sx={{ color: "primary.main", '&.Mui-checked': { color: "primary.main", }, }}/>}
                        label={
                            <Typography color="common.white">
                                Remember Me?
                            </Typography>}
                        />
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
                            <Link href="#" variant="body2" color="common.white">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="./Register" variant="body2" color="common.white">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </Container>
                </ThemeProvider>
            );
}

export default Login;
