import * as AT from "./authTypes";
import axios from "axios";

const AUTH_URL = 'http://localhost:4000/users/authenticate';

export const authenticateUser = (username, password) => async (dispatch) => {
    dispatch(loginRequest())
    try {
        const response = await axios.post(AUTH_URL, {
            username: username,
            password: password,
        });
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('loggedId', response.data.id);
        console.log(response.data)
        dispatch(success({username: response.data.username, isLoggedIn: true, isTrainer: response.data.isTrainer }));
        return Promise.resolve(response.data)
    } catch (error) {
        dispatch(failure());
        return Promise.reject(error)
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('loggedId');
        dispatch(success({username: '', isLoggedIn: false }))
    }
}

const loginRequest = () => {
    return {
        type: AT.LOGIN_REQUEST,
    }
}

const logoutRequest = () => {
    return {
        type: AT.LOGOUT_REQUEST,
    }
}


const success = isLoggedIn => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false
    };
};