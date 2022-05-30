import React, {Component} from "react";
import {connect} from "react-redux";
//import {useParams} from 'react-router-dom';
import {fetchTrainersAndDataById} from "../../services/index";

import { Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Rating } from "@mui/material";
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

class UserProfile extends Component {
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
                    fontSize: 36
                },
                rating:{
                    color: '#D3D3D3',
                    textAlign: 'center' 
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

        // const Item = styled(Paper)(({ theme }) => ({
        //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        //     ...theme.typography.body2,
        //     padding: theme.spacing(1),
        //     textAlign: 'center',
        //     color: theme.palette.text.secondary,
        //   })); 
          return(
            <ThemeProvider theme={theme}>
                <Grid
                    container
                    justify = "center"
                    alignItems = "center"
                    direction = "column"
                    style={{ minHeight: "100vh" }}
                    rowSpacing={3}
                >
                    <Grid item>
                        <Typography variant="title">
                            {trainersIndividual.firstName} {trainersIndividual.lastName}
                        </Typography>
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
                                <Typography variant="rating">
                                    Rating based on {trainersDataInd.currentRating === undefined ? 0 : trainersDataInd.ratingCount} reviews
                                </Typography>
                            </Box>}
                        </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);