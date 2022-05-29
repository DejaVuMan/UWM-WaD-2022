import React, {Component} from "react";
import {connect} from "react-redux";
//import {useParams} from 'react-router-dom';
import {fetchTrainersAndDataById} from "../../services/index";

import { CardContent, CardHeader, CardMedia } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }



    componentDidMount() {
        const id = this.props.match.params.id;
        if(id)
        {
            this.props.fetchTrainersAndDataById(this.props.match.params.id);
        }
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
                color: '#3f51b5'
              }
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
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://s3.cfluent.com/cdn-uploads/3524/1497367462-dogs-training-2-1024x683.jpg"
                        alt="Dog in disguise as a Dog Trainer"
                    />
                    <CardContent>
                        Test
                    </CardContent>
                </Card>
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