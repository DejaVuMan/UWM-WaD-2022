import React, {Component, setState} from "react";
import {connect} from "react-redux";
import {fetchDogs} from "../../services/index";
import {Link} from 'react-router-dom';
import "../../assets/css/Style.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import { Button } from "@mui/material";

class DogList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.props.fetchDogs(localStorage.getItem('loggedId'));
    }

    render() {
        console.log("display from doglist");

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

        //const dogsAll = this.props.dogs;
        //const dogsInd = dogsAll.users; // why is this undefined on leave and return to it?

        const dogsAll = this.props.dogs;
        var dogsInd = [{name:"temp"}, {name:"value"}];
        if(dogsAll.users !== undefined)
        {
            dogsInd = dogsAll.users;

        }

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
                        <Item>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Link to={"/dogs/"+dog.id}>
                                Name: {dog.name}
                            </Link>
                            {<Box sx={{ ml: 8, display: 'flex', alignItems: 'center', }}> 
                            <Avatar>
                                <PetsIcon />
                            </Avatar>
                            </Box>}
                        </Box>
                        </Item>
                        </Grid>
                    )}
                </Grid>
                <Link to={"/dogs/register"}>
                    <Button variant="contained" sx={{ mt: 3, mb: 2, borderRadius: 8 }}>
                        Add a new dog
                    </Button>
                </Link>
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