import React, {Component, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {fetchDogById, dogUpdate} from "../../services/index";

import { Grid, Typography, styled } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera"

import Image from 'mui-image'

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            id: localStorage.getItem('loggedId'),
            editMode: false,
            Name: null,
            ObedienceLevel: null
        };

        this.updateMode = this.updateMode.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        //const id = this.props.match.params.id;
        this.props.fetchDogs(this.props.match.params.id);
    }

    updateMode() {
        this.setState(prevState => ({
            editMode: !prevState.editMode
        }));
        console.log(this.state.editMode);
    }

    updateInputValue(evt){
        const val = evt.target.value;
        console.log("Call on updateInputValue");
        console.log(val);
        this.setState({
            [evt.target.id]: val
        });
    }

    updateProfile() {
        this.props.dogUpdate(this.state.Name, this.state.ObedienceLevel, this.state.id);
        this.updateMode();
        this.props.history.push("/home");
    }

    render() {

        if(this.props.match.params.id !== this.state.id) // If LocalStorageID == ID of dog we're trying to update alongside the bearer token sent in request
        {
            console.log("non equal id");
            //this.props.history.push("/home");
        }

        const dogsAll = this.props.dogs;
        const dogIndividual = dogsAll.users;

        console.log(dogIndividual)

        return (
            <div>
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
                                {this.state.editMode? 
                                <TextField 
                                required id="firstName" 
                                label="Name" 
                                variant="filled" 
                                defaultValue={dogIndividual.Name} 
                                onChange={evt => this.updateInputValue(evt)}
                                sx={{m:1}}/> : dogIndividual.Name + ' '}
                            </Typography>
                            {<Box sx={{ ml: 1, display: 'flex', alignItems: 'center', }}> 
                                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                                onClick={this.updateMode} disabled={this.state.editMode} 
                                >
                                    Edit...
                                </Button>
                                {this.state.editMode? <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, ml: 2 }}onClick={this.updateProfile}> Save </Button> : null}
                            </Box>}
                        </Box>
                    </Grid>
                    <Grid item>
                        <Image
                        src="https://comparic.xyz/uploads/2021/06/doge-shiba-1200x900.jpg"
                        width='40vh' height='40vh' showLoading
                        style={{borderRadius: '50%'}}
                        // use vh for good enough size on desktop and near ideal size on mobile
                        />
                        {this.state.editMode? <IconButton color="primary" aria-label="upload picture" component="span"> <PhotoCamera /> </IconButton> : null}
                    </Grid>
                </Grid>
            </ThemeProvider>
            </div>
        )
    }
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

const mapStateToProps = (state) => { // state
    //console.log(state)
    return {
        trainersind: state.user,
    }
}

const mapDispatchToProps = (dispatch) => { // dispatch
    return {
        fetchDogById: (id) => dispatch (fetchDogs(id))
        dogUpdate: (Name, ObedienceLevel, id) => dispatch (userUpdate(Name, ObedienceLevel, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);