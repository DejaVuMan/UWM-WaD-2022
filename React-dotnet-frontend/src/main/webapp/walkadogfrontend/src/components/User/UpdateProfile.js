import React, {Component} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
//import {useParams} from 'react-router-dom';
import {fetchTrainersAndDataById} from "../../services/index";

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

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            id: localStorage.getItem('loggedId')
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if(id)
        {
            console.log(id);
        }
    }

    render() {
        if(this.props.match.params.id === this.state.id)
        {
            return(
                <h1> hello world! </h1>
            )
        }
        else
        {
            return(
                <h1> no auth! </h1>
            )
        }

    }
}

const mapStateToProps = () => { // state
    //console.log(state)
    return {
        //trainersind: state.user,
    }
}

const mapDispatchToProps = () => { // dispatch
    return {
        //fetchTrainersAndDataById: (id) => dispatch (fetchTrainersAndDataById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);