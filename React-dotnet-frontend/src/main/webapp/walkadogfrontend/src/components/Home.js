import React, {useState, useEffect} from 'react';
import {connect, useSelector} from "react-redux";
import authToken from "../utils/authToken";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Typography, styled } from "@mui/material";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Box } from "@mui/system";
import { Stack } from "@mui/material";

import { getReservationWindowsByUser, getReservationWindows } from "../services/index";

function Home(props){
    if(localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
    }

    const auth = useSelector((state) => state.auth); 

    const DisplayList = () => { // onClick={e => updateFunc(e.target.value)} variant="contained" value = {obj.idx}
        console.log(props.reservations)
        if(props.reservations === undefined)
        {
            return(null)
        }
        return(
        <Grid item>
            <Stack direction="column">
                {props.reservations.map((obj) => <Item key = {obj.id} sx={{ mt: 3, mb: 2, ml: 2, mr: 2 }}>
                        {new Date(obj.startWindow).toLocaleDateString('pl-PL')} at {new Date(obj.startWindow).toLocaleTimeString('pl-PL')}
                </Item>)}
            </Stack>
        </Grid>
        )
    }

    useEffect(() => { // missing dependency: "props" - include or remove dependency array and destructure props outside of useffect
        auth.isTrainer? props.getReservationWindows(localStorage.getItem('loggedId')) : props.getReservationWindowsByUser(localStorage.getItem('loggedId'))
      }, [props.getReservationWindowsByUser, props.getReservationWindows]);

    return(
        <ThemeProvider theme={theme}>
            <Grid
                container
                //justifyContent = "center"
                alignItems = "center"
                direction = "column"
                style={{ minHeight: "100vh" }}
                rowSpacing={3}
            >
                <Grid item>
                    <Typography variant="title">
                        Welcome back, {auth.username}.
                    </Typography>
                </Grid>
                    <Divider sx={{mt:2, width:'75%', borderBottomWidth: 5}}>
                    </Divider>
                <Grid item>
                    <Box
                        sx={{
                            width: '40wh',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <Box sx={{ mr: 8, display: 'flex', alignItems: 'center', flexDirection:'column'}}> 
                            <Typography variant="primarypart">
                                Upcoming walks
                            </Typography>
                            <Stack direction="column" spacing={2}>
                                <DisplayList/>
                            </Stack>
                        </Box>
                        <Box sx={{ ml: 8, display: 'flex', alignItems: 'center', flexDirection:'column'}}> 
                            <Typography variant="primarypart">
                                Current walks
                            </Typography>
                            <Stack direction="column" spacing={2}>
                                <Item sx={{ mt: 3, mb: 2, ml: 2, mr: 2 }}>{auth.isTrainer? "Walking Nik's dog" : "10.06.2022 at 13:50"}</Item>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#3f51b5',
          secondary: '#D3D3D3',
        },
        secondary: {
          main: '#f50057',
        },
      },
    typography: {
        title:{
            color: '#D3D3D3',
            fontSize: 36,
        },
        rating:{
            color: '#D3D3D3',
        },
        primarypart:{
            color: '#D3D3D3',
            fontSize: 24,
        },
        secondarypart:{
            color: '#D3D3D3',
            fontSize: 18,
        }
      },
  });

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const mapStateToProps = (state) => { // ~3 calls per window load on average
    return {
        reservations: state.user.reswindows
    }
}

const mapDispatchToProps = (dispatch) => { // dispatch
    return {
        getReservationWindowsByUser: (userId) => dispatch (getReservationWindowsByUser(userId)),
        getReservationWindows: (trainerId) => dispatch (getReservationWindows(trainerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
