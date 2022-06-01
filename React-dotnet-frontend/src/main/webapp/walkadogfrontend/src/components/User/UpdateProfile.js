import React, {Component} from "react";
import {connect} from "react-redux";
//import {useParams} from 'react-router-dom';
import {openfetchTrainersAndDataById} from "../../services/index";

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
import ownerIcon from '../../assets/owner.png'
import Image from 'mui-image'

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            id: localStorage.getItem('loggedId')
        };
    }

    componentDidMount() {
        //const id = this.props.match.params.id;
        this.props.openfetchTrainersAndDataById(this.props.match.params.id);
    }

    render() {
        if(this.props.match.params.id !== this.state.id) // If LocalStorageID == ID of user we're trying to update alongside the bearer token sent in request
        {
            this.props.history.push("/home");
        }

        const userSum = this.props.trainersind;
        const userIndividual = userSum.users;
        const userDataInd = userSum.trainerdata;

        console.log(userIndividual)

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

        return (
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
                                {userIndividual.firstName} {userIndividual.lastName}
                            </Typography>
                            {<Box sx={{ ml: 1, display: 'flex', alignItems: 'center', }}> 
                                <img src={userIndividual.isTrainer? trainerIcon : ownerIcon} alt="Trainer or User Icon" height={userIndividual.isTrainer? "32" : "48"}></img>
                                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                                    onClick={() =>{

                                    }}
                                >
                                    Edit...
                                </Button>
                            </Box>}
                        </Box>
                    </Grid>
                    <Grid item>
                        <Image
                        src="https://i.kym-cdn.com/entries/icons/original/000/021/807/ig9OoyenpxqdCQyABmOQBZDI0duHk2QZZmWg2Hxd4ro.jpg"
                        width='40vh' height='40vh' showLoading
                        style={{borderRadius: '50%'}}
                        // use vh for good enough size on desktop and near ideal size on mobile
                        />
                    </Grid>
                    <Divider sx={{mt:2, width:'75%'}}>
                        <Typography variant="primarypart">
                            Contact Info
                        </Typography>
                    </Divider>
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            <Item>Phone Number: +1 773 32X XXXX</Item>
                            <Item>Email: dogOwnXXXXXX@aol.com</Item>
                        </Stack>
                    </Grid>
                </Grid>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => { // state
    //console.log(state)
    return {
        trainersind: state.user,
    }
}

const mapDispatchToProps = (dispatch) => { // dispatch
    return {
        openfetchTrainersAndDataById: (id) => dispatch (openfetchTrainersAndDataById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);