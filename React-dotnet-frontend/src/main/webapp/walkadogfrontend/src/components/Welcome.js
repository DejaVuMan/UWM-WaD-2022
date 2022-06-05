import React from "react";
//import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

const Welcome = (props) => {
    return (
        <Stack alignItems="center" style={{color: 'white'}}>
            <img src="https://64.media.tumblr.com/c9168657541398db4d9abf4bb4734c93/tumblr_mic0kpgDVM1rnfi40o1_400.gif" alt="Loading Animation"/>
            <h1>Loading...</h1>
        </Stack>
    );
}

export default Welcome;