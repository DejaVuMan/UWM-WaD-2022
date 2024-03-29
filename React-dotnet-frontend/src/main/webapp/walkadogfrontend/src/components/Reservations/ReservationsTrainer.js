import React from 'react';
import { connect } from 'react-redux';

import {TextField, Grid} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar, Alert } from '@mui/material';
import {Typography} from '@mui/material';
import { addReservationWindow } from '../../services/index';

function ReservationsTrainer(props) {

    const [value, setValue] = React.useState(new Date());
    const today = new Date();

    const [open, successOpen] = React.useState(false);
    const [openF, failOpen] = React.useState(false);

    const handleSuccessOpen = () => {
        successOpen(true);
    }

    const handleFailOpen = () => {
        failOpen(true);
    }

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        successOpen(false);
    };

    const handleFailClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        failOpen(false);
      };

    const SaveReservation = (value, props) => {
        console.log(value);
        props.addReservationWindow(value, 60 ,localStorage.getItem('loggedId'))
            .then((response) => {
                console.log(response.data)
                handleSuccessOpen()
            })
            .catch((error) => {
                console.log(error.message)
                handleFailOpen()
            })
    }

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
                    <Typography>
                        <Typography variant="title">
                            Select a reservation slot
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDateTimePicker
                        disablePast
                        minDate={today}
                        openTo="day"
                        value={value}
                        onDismiss={() => {
                            console.log("Cancel is clicked")
                        }}
                        onAccept={() => {
                            console.log("OK is clicked")
                            SaveReservation(value, props)
                        }}
                        onChange={(newValue) => {
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
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    The time slot has been succesfully reserved.
                </Alert>
            </Snackbar>
            <Snackbar open={openF} autoHideDuration={6000} onClose={handleFailClose}>
                <Alert onClose={handleFailClose} severity="error" sx={{ width: '100%' }}>
                    "Your data ran away! Please try again."
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

const mapDispatchToProps = (dispatch) => { // dispatch
    return {
        addReservationWindow: (startWindow, reservationLength, trainerId) => dispatch (addReservationWindow(startWindow, reservationLength, trainerId))
    }
}

export default connect(null, mapDispatchToProps)(ReservationsTrainer);