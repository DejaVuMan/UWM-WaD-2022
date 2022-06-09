import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchUsersAndData} from "../../services/index";
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

    componentDidMount() {
        this.props.fetchUsersAndData();
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


        const usersAll = this.props.users;
        var usersInd = [{firstName:"temp", lastName:"temp", id:1}, {firstName:"temp", lastName:"temp", id:2}];
        if(usersAll.users !== undefined)
        {
            usersInd = usersAll.users;

        }

        //const trainersDataInd = usersAll.trainerdata;
        console.log("Displaying array data")
        console.log(usersInd)
        //console.log(trainersDataInd)

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
                    {usersInd.map((user, index) =>
                        <Grid item xs={8} key={index}> {/* Index here related to the index of the element from mapping, NOT index of user.*/}
                        <Link to={"/users/"+user.id}>
                            <Item>Name: {user.firstName} {user.lastName}</Item>
                        </Link>
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
        users: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersAndData: () => dispatch (fetchUsersAndData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);