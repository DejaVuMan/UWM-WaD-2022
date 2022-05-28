import React, {useEffect, useState} from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

const Welcome = (props) => {
    return (
        <Stack alignItems="center" style={{color: 'white'}}>
            <h1>Loading...</h1>
            <CircularProgress color = "secondary"/>
        </Stack>
    );
}

export default Welcome;