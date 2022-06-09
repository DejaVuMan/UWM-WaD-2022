import React from "react";
import { useSelector} from "react-redux";
import authToken from "../utils/authToken";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Typography, styled } from "@mui/material";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Box } from "@mui/system";
import { Stack } from "@mui/material";

function Home(){
    if(localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
    }

    const auth = useSelector((state) => state.auth);

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
                        Welcome back, {auth.username}.
                    </Typography>
                </Grid>
                    <Divider sx={{mt:2, width:'75%', borderBottomWidth: 5}}>
                    </Divider>
                <Grid item>
                    <Box
                        sx={{
                            width: '40wh',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <Box sx={{ mr: 8, display: 'flex', alignItems: 'center', flexDirection:'column'}}> 
                            <Typography variant="primarypart">
                                Upcoming walks
                            </Typography>
                            <Stack direction="column" spacing={2}>
                                <Item>Walk 1</Item>
                                <Item>Walk 2</Item>
                            </Stack>
                        </Box>
                        <Box sx={{ ml: 8, display: 'flex', alignItems: 'center', flexDirection:'column'}}> 
                            <Typography variant="primarypart">
                                Current walks
                            </Typography>
                            <Stack direction="column" spacing={2}>
                                <Item>Walk 3</Item>
                                <Item>Walk 4</Item>
                            </Stack>
                        </Box>
                    </Box>
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

export default Home;
