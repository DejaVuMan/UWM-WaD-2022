import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchDogById, dogUpdate, removeDogById} from "../../services/index";

import { Grid, Typography, styled } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import { Divider } from "@mui/material";
import { Stack } from "@mui/material";

import Image from 'mui-image'

function UserView(props){
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
                    <Typography variant="title">
                        Taking a walk...
                    </Typography>
                </Grid>
                <Grid item>
                    <Image
                    src="https://images.adsttc.com/media/images/5593/ebcd/e58e/ce2c/8300/038d/newsletter/Untitled.jpg?1435757512"
                    width='60vh' height='40vh' showLoading
                    // use vh for good enough size on desktop and near ideal size on mobile
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
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

export default UserView;