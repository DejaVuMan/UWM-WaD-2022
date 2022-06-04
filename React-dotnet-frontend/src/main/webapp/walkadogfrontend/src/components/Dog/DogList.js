import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchDogs} from "../../services/index";
import {Link} from 'react-router-dom';
import "../../assets/css/Style.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

class DogList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.props.fetchDogs(localStorage.getItem('loggedId'));
    }

    // findAllRandomUsers() {
    //     axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({users: data});
    //         });
    // };

    render() {
        console.log("display from doglist")

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

        const dogsAll = this.props.dogs;
        const dogsInd = dogsAll.users;

        console.log("Displaying array data")
        console.log(dogsAll)
        console.log(dogsInd)

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
                    {dogsInd.map((dog, index) =>
                        <Grid item xs={8} key={index}> {/* Index here related to the index of the element from mapping, NOT index of user.*/}
                        <Link to={"/dogs/"+dog.id}>
                            <Item>Name: {dog.name}</Item>
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
        dogs: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDogs: (id) => dispatch (fetchDogs(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogList);