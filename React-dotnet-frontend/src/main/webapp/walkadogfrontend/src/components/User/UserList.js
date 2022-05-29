import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchTrainersAndData} from "../../services/index";
import "../../assets/css/Style.css";
//fetchTrainers, fetchTrainerData
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';



class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            trainerdata: []
        };
    }

    componentDidMount() {
        //this.findAllRandomUsers();
        // this.props.fetchUsers();
        this.props.fetchTrainersAndData();
        //this.props.fetchTrainerData();
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
          });

        const trainersAll = this.props.trainers;
        const trainersInd = trainersAll.users;

        const trainersDataInd = trainersAll.trainerdata;
        console.log("Displaying array data from trainersInd")
        console.log(trainersInd)
        console.log(trainersDataInd)

        // console.log("Displaying array data from trainersDataInd")
        // console.log(trainersDataInd)

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
                        <Grid item xs={8} key={index}>
                            <Item>Name: {user.firstName} {user.lastName}</Item>
                            <Item>Username: {user.username}</Item>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        trainers: state.user,
        //trainersdata: state.trainerdata
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTrainersAndData: () => dispatch (fetchTrainersAndData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);