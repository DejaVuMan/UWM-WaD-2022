import React from 'react';
import {useDispatch} from "react-redux";
import {registerDog} from "../../services/index";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
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

  const DogRegister = (props) => {

    const dispatch = useDispatch();
    
    const [checked] = React.useState(false);

    const saveDog = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

      dispatch(registerDog(localStorage.getItem('loggedId'),data.get('Name'),data.get('Breed'),data.get('ObedienceLevel'), checked? true : false))
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
                    <PetsIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="common.white">
                    Add your Best Friend
                </Typography>
                <Box component="form" onSubmit={saveDog} noValidate sx={{ mt: 1}}> {/* changes color of text for remember me??? */}
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    name="Name"
                    autoComplete="Name"
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
                    id="Breed"
                    label="Breed"
                    name="Breed"
                    autoComplete="Breed"
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
                    id="ObedienceLevel"
                    label="Obedience Level"
                    name="ObedienceLevel"
                    autoComplete="Obedience Level"
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
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Add Dog
                    </Button>
                </Box>
                </Box>
            </Container>
            </ThemeProvider>
        );
}

export default DogRegister;