import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchUsers} from "../../services/index";
import "../../assets/css/Style.css";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            obecnaStrona: 1,
            usersNaStrone: 5,
        };
    }

    componentDidMount() {
        //this.findAllRandomUsers();
        this.props.fetchUsers();
    }

    // findAllRandomUsers() {
    //     axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({users: data});
    //         });
    // };

    render() {
        const userData = this.props.userData;
        const users = userData.users;
        console.log(users)

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
          }));
        // obecniUsers.map((user, index) =>(
        //     <tr key={index}>
        //         <td>{user.firstName}{' '}{user.lastName}</td>
        //         <td>{user.username}</td>
        //     </tr>
        // ))
        return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                {users.map((user, index) =>
                    <Grid item xs={8} key={index}>
                    <Item>{user.firstName} {user.lastName}</Item>
                    </Grid>
                )}
            </Grid>
            </Box>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);