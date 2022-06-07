import React, {useState, setState} from 'react';
import {TextField, Grid, styled} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { Button } from '@mui/material';

function Reservations() {
    const [value, setValue] = React.useState(new Date());
    const today = new Date();

    const [open, successOpen] = React.useState(false);

    const [dateFree, setDateFree] = useState([
        { date:8, isFree:true },
        { date:9, isFree:false },
        { date:10, isFree:false },
        { date:11, isFree:true },
        { date:12, isFree:true },
        { date:13, isFree:false }
    ]);
    const [dateReservations, setDateReservations] = useState([{ date:8, avail:["10:00AM", "1:00PM"] },
                                                            { date:11, avail:["1:00PM", "3:00PM", "6:00PM"] },
                                                            { date:12, avail:["2:00PM", "4:00PM", "5:00PM"] }]);
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
        for(var i = 0; i < dateFree.length; i++)
        {
            if(dateFree[i].date === parseDay)
            {
                if(dateFree[i].isFree)
                {
                    return false;
                }
            }
        }
        return true; 
    }

    const reservationList = (day) => {
        const parseDay = day.getDate();
        for(var i = 0; i < dateReservations.length; i++)
        {
            if(dateReservations[i].date === parseDay)
            {
                setCurrentReservations(dateReservations[i].avail);
                return;
            }
        }
    }

    const DisplayList = () => {
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

export default Reservations;