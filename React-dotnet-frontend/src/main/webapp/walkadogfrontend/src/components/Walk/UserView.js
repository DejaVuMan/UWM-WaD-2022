import React, {Component} from "react";
import {connect} from "react-redux";
import {trainerRatingUpdate, getTrainerReport} from "../../services/index";

import { Grid, Typography, styled, DialogTitle, DialogContent, DialogContentText, CardContent } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {IconButton} from "@mui/material";
import { Rating } from "@mui/material";
import { Stack } from "@mui/material";
import { Dialog, DialogActions } from "@mui/material";
import {Card} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

import Image from 'mui-image'

function UserView(props){

    const [open, setOpen] = React.useState(false);
    const [userRating, setUserRating] = React.useState(3);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendUpdate = (props) => {
        handleClose()
        props.trainerRatingUpdate(9, userRating)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error.message)
            //handleFailOpen()
        })
    }

    // TODO const getUpdates

    const getUpdates = (props => {
        props.getTrainerReport(9, localStorage.getItem('loggedId'))
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error.message)
        })
    })

    const DisplayList = () => { // props.reports
        return(
        <Stack direction="row">
            <Card sx={{ minWidth: 275 }}>
                { undefined === undefined?
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Andzrej hasn't sent any reports yet.
                    </Typography>
                </CardContent> 
                :
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Report #1
                    </Typography>
                    <Typography variant="body2">
                        Haha dog go brrrr!
                    </Typography>
                </CardContent>
                }
            </Card>
        </Stack>
        )
    }

    return(
        <ThemeProvider theme={theme}>
            <Grid
                container
                //justifyContent = "center"
                alignItems = "center"
                direction = "column"
                //style={{ minHeight: "100vh" }}
                rowSpacing={3}
            >
                <Grid item>
                    <Typography variant="title">
                        Benny is on a walk with Andrzej
                    </Typography>
                </Grid>
                <Grid item>
                    <Image
                    src="https://images.adsttc.com/media/images/5593/ebcd/e58e/ce2c/8300/038d/newsletter/Untitled.jpg?1435757512"
                    width='60vh' height='40vh' showLoading
                    // use vh for good enough size on desktop and near ideal size on mobile
                    />
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            width: '40wh',
                            display: 'flex',
                            //alignItems: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <Box sx={{ mr: 8, display: 'flex', alignItems: 'center', flexDirection:'column'}}> 
                            <Typography variant="primarypart">
                                Reports from Andzrej
                            </Typography>
                            <DisplayList/>
                            <IconButton aria-label="refresh" variant="contained" onClick={() => getUpdates(props)} sx={{ mt: 3, mb: 2 }}>
                                <RefreshIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ ml: 8, display: 'flex', alignItems: 'center', flexDirection:'column'}}> 
                            <Typography variant="primarypart">
                                Actions
                            </Typography>
                            <Stack direction="column" spacing={2}>
                                <Button fullWidth variant="contained" onClick={handleClickOpen} sx={{ mt: 3, mb: 2 }}>
                                    Review...
                                </Button>
                                <Button fullWidth variant="contained" color="error" sx={{ mt: 3, mb: 2 }}>
                                    Report
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>How did Andzrej do?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        How would you rate Andzrej on a scale of 1 to 5?
                    </DialogContentText>
                    <Rating name="trainer-rating" defaultValue={3} precision={0.5} onChange={(event, newValue) => setUserRating(newValue)}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => sendUpdate(props)}>Submit Rating</Button> 
                </DialogActions>
            </Dialog>
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
        reports: state.user,
    }
}

const mapDispatchToProps = (dispatch) => { // dispatch
    return {
        trainerRatingUpdate: (userId, currentRating) => dispatch (trainerRatingUpdate(userId, currentRating)),
        getTrainerReport: (trainerId, userId) => dispatch (getTrainerReport(trainerId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView);