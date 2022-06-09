import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

import {TextField, Grid, styled} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { Snackbar, Alert } from '@mui/material';
import { Button } from '@mui/material';

import {getReservationWindows} from "../../services/index";

function Reservations(props) {
    const [value, setValue] = React.useState(new Date());
    const today = new Date();

    const [open, successOpen] = React.useState(false);
    const [currentReservations, setCurrentReservations] = useState([]);



    const handleSuccessOpen = () => {
        successOpen(true);
    }

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        successOpen(false);
      };

    const willDisableDay = (day) => {
        const parseDay = day.getDate();
        const parseMonth = day.getMonth();
        if(props.reservations === undefined) return false; // check if is defined, will be undefined until async get returns result to state
        for(var i = 0; i < props.reservations.length; i++)
        {
            var date = new Date(props.reservations[i].startWindow); // is this really the most efficient way to do this???
            if(date.getDate() === parseDay && date.getMonth() === parseMonth)
            {
                if(!props.reservations[i].isReserved)
                {
                    return false;
                }
            }
        }
        return true; 
    }

    const reservationList = (day) => {
        const parseDay = day.getDate();
        const parseMonth = day.getMonth();
        if(props.reservations === undefined) return;
        for(var i = 0; i < props.reservations.length; i++)
        {
            var date = new Date(props.reservations[i].startWindow);
            if(date.getDate() === parseDay && date.getMonth() === parseMonth)
            {
                setCurrentReservations(oldArray => [...oldArray, date.toLocaleTimeString('en-US')]); // 'en-US' for now
                return;
            }
        }
    }

    const DisplayList = () => {
        console.log(currentReservations);
        return(
        <Grid item>
            <Stack direction="row">
                {currentReservations.map((availDates, x) => <Button key = {x} variant="contained" sx={{ mt: 3, mb: 2, ml: 2, mr: 2 }}>
                        {availDates}
                </Button>)}
            </Stack>
        </Grid>
        )
    }

    useEffect(() => { // missing dependency: "props" - include or remove dependency array and destructure props outside of useffect
        props.getReservationWindows(props.match.params.id)
      }, [props.getReservationWindows]);

    return(
        <ThemeProvider theme={theme}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignitems="center"
                justifyContent="center"
                style={{minHeight: '100vh'}}
            >
                <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        minDate={today}
                        //orientation="landscape"
                        openTo="day"
                        value={value}
                        shouldDisableDate={willDisableDay}
                        onDismiss={() => {
                            console.log("Cancel is clicked")
                        }}
                        onAccept={() => {
                            console.log("OK is clicked")
                            console.log(props.reservations)
                            console.log(props.reservations[0].startWindow)
                            handleSuccessOpen()
                        }}
                        onChange={(newValue) => {
                        reservationList(newValue);
                        setValue(newValue);
                        }}
                        renderInput={(params) => 
                        <TextField {...params} 
                        sx={{
                            svg: "#FFFFFF",
                            input: "#FFFFFF",
                            label: "#FFFFFF"
                        }}
                        />}
                    />
                    </LocalizationProvider>
                </Grid>
                <DisplayList/>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    The time slot has been succesfully reserved.
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
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
        getReservationWindows: (trainerId) => dispatch (getReservationWindows(trainerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations);