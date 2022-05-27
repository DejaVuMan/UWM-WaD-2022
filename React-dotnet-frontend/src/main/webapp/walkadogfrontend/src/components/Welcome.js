import React, {useEffect, useState} from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress'

const Welcome = (props) => {
    return (
    <div>
        <CircularProgress color = "secondary"/>
    </div>
    );
}

export default Welcome;