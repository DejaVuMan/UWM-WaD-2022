import React, {Component} from "react";
import {connect} from "react-redux";
//import {useParams} from 'react-router-dom';
import {fetchUsersAndDataById} from "../../services/index";
import { Link } from "react-router-dom";
import { Grid, Typography, styled } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Rating } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import ownerIcon from '../../assets/owner.png'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.props.fetchUsersAndDataById(this.props.match.params.id);
    }

    componentWillUnmount() {

    }

    render() {
        const usersSum = this.props.trainersind;
        const usersIndividual = usersSum.users;

        //const trainersDataInd = trainersSum.trainerdata;
        console.log("Displaying array data from UserProfile")
        console.log(usersSum)
        console.log(usersIndividual)
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
                                {usersIndividual.firstName} {usersIndividual.lastName}
                            </Typography>
                            {<Box sx={{ ml: 1, display: 'flex', alignItems: 'center', }}> 
                                <img src={ownerIcon} alt="Owner Icon" height="32"></img>
                            </Box>}
                        </Box>
                    </Grid>
                    <Grid item>
                        <Avatar 
                        src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/alone-Best-Dp-Profile-Images-For-Instagram-photo.gif"
                        sx={{ width: '40vh', height: '40vh', alignSelf: 'center' }} // use vh for good enough size on desktop and near ideal size on mobile
                        />
                    </Grid>
                    <Divider sx={{mt:2, width:'75%'}}>
                        <Typography variant="primarypart">
                            About me
                        </Typography>
                    </Divider>
                    <Grid item style={{width:'50%'}}>
                    <Typography variant="secondarypart">
                        I like dogs.
                    </Typography>
                    </Grid>
                    <Divider sx={{mt:2, width:'75%'}}>
                        <Typography variant="primarypart">
                            Contact Info
                        </Typography>
                    </Divider>
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            <Item>Phone Number: +48 739 32X XXX</Item>
                            <Item>Email: dogOwnXXXXXX@gmail.com</Item>
                        </Stack>
                    </Grid>
                </Grid>
            </ThemeProvider>
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

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        trainersind: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersAndDataById: (id) => dispatch (fetchUsersAndDataById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);