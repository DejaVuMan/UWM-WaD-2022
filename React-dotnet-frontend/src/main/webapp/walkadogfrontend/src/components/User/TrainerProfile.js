import React, {Component} from "react";
import {connect} from "react-redux";
//import {useParams} from 'react-router-dom';
import {fetchTrainersAndDataById} from "../../services/index";

import { Grid, Typography, styled } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Rating } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import trainerIcon from '../../assets/trainer.png'

class TrainerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if(id)
        {
            this.props.fetchTrainersAndDataById(this.props.match.params.id);
        }
    }

    componentWillUnmount() {

    }

    render() {
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

        const trainersSum = this.props.trainersind;
        const trainersIndividual = trainersSum.users;

        const trainersDataInd = trainersSum.trainerdata;
        console.log("Displaying array data from UserProfile")
        console.log(trainersSum)
        console.log(trainersIndividual)
        console.log(trainersDataInd)

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
          })); 
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
                    <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="title">
                                {trainersIndividual.firstName} {trainersIndividual.lastName}
                            </Typography>
                            {<Box sx={{ ml: 1, display: 'flex', alignItems: 'center', }}> 
                                <img src={trainerIcon} alt="Trainer Icon" height="32"></img>
                            </Box>}
                        </Box>
                    </Grid>
                    <Grid item>
                        <Avatar 
                        src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/alone-Best-Dp-Profile-Images-For-Instagram-photo.gif"
                        sx={{ width: '40vh', height: '40vh', alignSelf: 'center' }} // use vh for good enough size on desktop and near ideal size on mobile
                        />
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                width: 300,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating value={trainersDataInd.currentRating === undefined ? 3 : trainersDataInd.currentRating} precision={0.5} readOnly/>
                            {<Box sx={{ ml: 8, display: 'flex', alignItems: 'center', }}> 
                                <Typography variant="rating" align="center">
                                    Rating based on {trainersDataInd.currentRating === undefined ? 0 : trainersDataInd.ratingCount} reviews
                                </Typography>
                            </Box>}
                        </Box>
                    </Grid>
                    <Divider sx={{mt:2, width:'75%'}}>
                        <Typography variant="primarypart">
                            About me
                        </Typography>
                    </Divider>
                    <Grid item style={{width:'50%'}}>
                    <Typography variant="secondarypart">
                        Passion, patience and understanding are three essential qualities I've developed as a Dog Trainer. 
                        These values have helped me educate over 300 dogs throughout my trainer career. 
                        My experience and love for training can enable me to help your dog reach better obedience.
                    </Typography>
                    </Grid>
                    <Divider sx={{mt:2, width:'75%'}}>
                        <Typography variant="primarypart">
                            Contact Info
                        </Typography>
                    </Divider>
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            <Item>Phone Number: +48 729 31X XXX</Item>
                            <Item>Email: dogTraXXXXXX@gmail.com</Item>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            Reserve me...
                        </Button>
                    </Grid>
                </Grid>
            </ThemeProvider>
          )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        trainersind: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrainersAndDataById: (id) => dispatch (fetchTrainersAndDataById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainerProfile);