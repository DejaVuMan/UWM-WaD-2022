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

export const fetchUsersAndDataById = userId => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:4000/users/"+userId, localStorage.getItem('jwtToken'))
        .then(response => {
            dispatch(userSuccess(response.data))
        })
        .catch(error => {
            dispatch(userFailure(error.message))
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

export const fetchUsersAndData = () => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:4000/users/users", localStorage.getItem('jwtToken'))
        .then(response => {
            dispatch(userSuccess(response.data))
        })
        .catch(error => {
            dispatch(userFailure(error.essage))
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

export const userUpdate = (firstname, lastname, id) => async (dispatch) => { // username, password,
    dispatch(userRequest())
    try {
        axios.put("http://localhost:4000/users/" + id, {
                firstname: firstname,
                lastname: lastname
            }, localStorage.getItem('jwtToken'))
            .then(response => {
            console.log(response)})
        } catch(error) {
            console.log(error.message)
        }
}

export const registerDog = (userId, Name, Breed, ObedienceLevel) => async (dispatch) => {
    dispatch(userRequest())
    try {
        const response = await axios.post("http://localhost:4000/dogs/register", {
            userId: userId,
            Name: Name,
            Breed: Breed,
            ObedienceLevel: ObedienceLevel
        }, localStorage.getItem('jwtToken'));
        dispatch(dogSavedSuccess(response.data))
        console.log(response.data)
        return Promise.resolve(response.data)
    } catch(error) {
        console.log(error)
        dispatch(dogFailure(error.message))
        return Promise.reject(error)
    }
}

export const fetchDogs = (userId) => async (dispatch) => {
    dispatch(userRequest())
    try {
        const response = await axios.post("http://localhost:4000/dogs",{
            userId: userId
        },  localStorage.getItem('jwtToken'));
        dispatch(userSuccess(response.data))
        console.log(response.data)
        return Promise.resolve(response.data)
    } catch(error) {
        console.log(error)
        dispatch(userFailure(error.message))
        return Promise.reject(error)
    }
}

export const dogUpdate = (name, breed, obediencelevel, userId, id) => async (dispatch) => { // username, password,
    dispatch(userRequest())
    try {
        axios.put("http://localhost:4000/dogs/" + id, {
                Name: name,
                Breed: breed,
                ObedienceLevel: obediencelevel,
                userId: userId
            }, localStorage.getItem('jwtToken'))
            .then(response => {
            console.log(response)})
        } catch(error) {
            console.log(error.message)
        }
}

export const fetchDogById = (userId) => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:4000/dogs/" + userId, localStorage.getItem('jwtToken'))
        .then(response => {
            dispatch(userSuccess(response.data))
        })
        .catch(error => {
            dispatch(userFailure(error.message))
        })  
    }
}

export const removeDogById = (userId) => {
    return dispatch => {
        dispatch(userRequest())
        axios.delete("http://localhost:4000/dogs/" + userId, localStorage.getItem('jwtToken'))
        .then(response => {
            dispatch(userSuccess(response.data))
        })
        .catch(error => {
            dispatch(userFailure(error.message))
        })  
    }
}

export const addReservationWindow = (startWindow, reservationLength, trainerId) => async (dispatch) => {
    dispatch(userRequest())
    try {
        const response = await axios.post("http://localhost:4000/reservation/create", {
            startWindow: startWindow,
            reservationLength: reservationLength,
            trainerId: trainerId
        }, localStorage.getItem('jwtToken'));
        dispatch(userSuccess(response.data))
        console.log(response.data)
        return Promise.resolve(response.data)
    } catch(error) {
        console.log(error)
        dispatch(userFailure(error.message))
        return Promise.reject(error)
    }
}

export const getReservationWindows = (trainerId) => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:4000/reservation/" + trainerId, localStorage.getItem('jwtToken'))
        .then(response => {
            dispatch(resWindowSuccess(response.data))
        })
        .catch(error => {
            dispatch(userFailure(error.message))
        })  
    }
}

export const getReservationWindowsByUser = (userId) => {
    return dispatch => {
        dispatch(userRequest())
        axios.get("http://localhost:4000/reservation/user/" + userId, localStorage.getItem('jwtToken'))
        .then(response => {
            dispatch(resWindowSuccess(response.data))
        })
        .catch(error => {
            dispatch(userFailure(error.message))
        })  
    }
}

export const reserveReservation = (userId, reservationId) => async(dispatch) => {
    dispatch(userRequest())
    try {
        const response = await axios.put("http://localhost:4000/reservation", {
            userId: userId,
            reservationId: reservationId,
            isReserved: true
            }, localStorage.getItem('jwtToken'));
            console.log(response)
            dispatch(userSuccess(response.data))
            return Promise.resolve(response.data)
        } catch(error) {
            console.log(error)
            dispatch(userFailure(error.message))
            return Promise.reject(error)
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

const dogSavedSuccess = (dog) => {
    return {
        type: UT.DOG_SAVED_SUCCESS,
        payload: dog
    }
}

const dogFailure = (error) => {
    return {
        type: UT.DOG_FAILURE,
        payload: error
    }
}

const userSuccess = users => {
    return {
        type: UT.USER_SUCCESS,
        payload: users
    }
}

const resWindowSuccess = reswindows => {
    return {
        type: UT.RESWINDOW_SUCCESS,
        payload: reswindows
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