import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchTrainersAndData} from "../../services/index";
import {Link} from 'react-router-dom';
import "../../assets/css/Style.css";
//fetchTrainers, fetchTrainerData
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating'
import { createTheme, ThemeProvider } from '@mui/material/styles';



class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.props.fetchTrainersAndData();
    }

    // findAllRandomUsers() {
    //     axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({users: data});
    //         });
    // };

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

        const trainersAll = this.props.trainers;
        const trainersInd = trainersAll.users;

        const trainersDataInd = trainersAll.trainerdata;
        console.log("Displaying array data")
        console.log(trainersInd)
        console.log(trainersDataInd)

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
          })); 
        return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    {trainersInd.map((user, index) =>
                        <Grid item xs={8} key={index}> {/* Index here related to the index of the element from mapping, NOT index of user.*/}
                        <Link to={"/users/"+user.id}>
                            <Item>Name: {user.firstName} {user.lastName}</Item>
                            {TrainerRating(trainersDataInd, user.id, Item)}
                        </Link>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </ThemeProvider>
        );
    }
}

function TrainerRating(trainersDataInd, id, Item) {
    for(var i = 0; i < trainersDataInd.length; i++)
    {
        if(trainersDataInd[i].userId === id)
        {
            if(trainersDataInd[i].ratingCount < 1)
            {
                return(
                    <Item>
                        <Typography component="legend" color="primary.secondary">This trainer doesn't have any reviews yet!</Typography>
                        <Rating name="read-only" value={0} readOnly />
                    </Item>
                )  
            }
            return(
                <Item>
                    <Typography component="legend" color="primary.secondary">Rating based on {trainersDataInd[i].ratingCount} reviews:</Typography>
                    <Rating name="read-only" value={trainersDataInd[i].currentRating} precision={0.5} readOnly />
                </Item>
            )
        }
    }
    return(
        <Item>
            <Typography component="legend" color="primary.secondary">This trainer doesn't have any reviews yet!</Typography>
            <Rating name="read-only" value={0} readOnly />
        </Item>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        trainers: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTrainersAndData: () => dispatch (fetchTrainersAndData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);