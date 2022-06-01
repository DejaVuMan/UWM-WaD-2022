import * as UT from './userTypes'
import axios from "axios";

const REGISTER_URL = 'http://localhost:4000/users/register';
// old fetchUsers example data: https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole

export const fetchUsers = () => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:4000/users", localStorage.getItem('jwtToken'))
            .then(response => {
                dispatch(userSuccess(response.data))
            })
            .catch(error => {
                dispatch(userFailure(error.message))
            })
    }
}

export const fetchTrainers = () => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:4000/users/trainers", localStorage.getItem('jwtToken'))
        .then(response => {
            dispatch(userSuccess(response.data))
        })
        .catch(error => {
            dispatch(userFailure(error.message))
        })
    }
}

export const fetchTrainerData = () => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:4000/users/trainersdata", localStorage.getItem('jwtToken'))
        .then(response => {
            dispatch(userSuccess(response.data))
        })
        .catch(error => {
            dispatch(userFailure(error.message))
        })        
    }
}

export const fetchTrainersAndDataById = trainerId => {
    return dispatch => {
        dispatch(userRequest())
        axios.all([axios.get("http://localhost:4000/users/" + trainerId, localStorage.getItem('jwtToken')),
        axios.get("http://localhost:4000/users/trainersdata/" + trainerId, localStorage.getItem('jwtToken'))]) // if empty return null
        .then(axios.spread((...responses) =>{
            dispatch(trainerSuccess(responses[0].data, responses[1].data))
            //dispatch(userSuccess(responses[1].data))
        })
        )
        .catch(errors => {
            dispatch(userFailure(errors.message))
        })
    }
}

export const openfetchTrainersAndDataById = trainerId => {
    return dispatch => {
        dispatch(userRequest())
        axios.all([axios.get("http://localhost:4000/users/" + trainerId, localStorage.getItem('jwtToken')),
        axios.get("http://localhost:4000/users/opentrainersdata/" + trainerId, localStorage.getItem('jwtToken'))]) // if empty return null
        .then(axios.spread((...responses) =>{
            dispatch(trainerSuccess(responses[0].data, responses[1].data))
            //dispatch(userSuccess(responses[1].data))
        })
        )
        .catch(errors => {
            dispatch(userFailure(errors.message))
        })
    }
}


export const fetchTrainersAndData = () => {
    return dispatch => {
        dispatch(userRequest())
        axios.all([axios.get("http://localhost:4000/users/trainers", localStorage.getItem('jwtToken')),
        axios.get("http://localhost:4000/users/trainersdata", localStorage.getItem('jwtToken'))])
        .then(axios.spread((...responses) =>{
            dispatch(trainerSuccess(responses[0].data, responses[1].data))
        })
        )
        .catch(errors => {
            dispatch(userFailure(errors.message))
        })
    }
}

export const registerUser = (firstname, lastname, username, password, isTrainer) => async (dispatch) => {
    dispatch(userRequest())
    try {
        const response = await axios.post(REGISTER_URL, {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
            isTrainer: isTrainer
        });
        dispatch(userSavedSuccess(response.data))
        return Promise.resolve(response.data)
    } catch(error) {
        dispatch(userFailure(error.message))
        return Promise.reject(error)
    }
}

export const userUpdate = (firstname, lastname, username, password, id) => async (dispatch) => {
    return dispatch => {
        dispatch(userRequest()) // might change this to userUpdate()?
            axios.put("http://localhost:4000/users/" + id, {
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password
            }).then(response => {
                dispatch(updateSuccess(response))
            }).catch(error => {
                dispatch(updateFailure(error))
            })
    }
}

const userRequest = () => {
    return {
        type: UT.USER_REQUEST
    }
}

const userSavedSuccess = (user) => {
    return {
        type: UT.USER_SAVED_SUCCESS,
        payload: user
    }
}

const userSuccess = users => {
    return {
        type: UT.USER_SUCCESS,
        payload: users
    }
}

const updateSuccess = (users, traindat) => { // return copy of new record after PUT
    return {
        type: UT.UPDATE_SUCCESS,
        payload: users, traindat // if user is not trainer, traindat remains empty
    }
}

const updateFailure = (error) => {
    return {
        type: UT.UPDATE_FAILURE,
        payload: error
    }
}

const trainerSuccess = (users, traindat) => {
    return {
        type: UT.TRAINER_SUCCESS,
        payload: users, traindat
    }
}

const userFailure = error => {
    return {
        type: UT.USER_FAILURE,
        payload: error
    }
}