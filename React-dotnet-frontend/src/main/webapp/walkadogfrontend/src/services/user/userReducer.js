import * as UT from "./userTypes";

const initialState = {
    users: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UT.USER_REQUEST:
            return {
                ...state
            }
        case UT.USER_SUCCESS:
            return {
                users: action.payload,
                error: ''
            }
        case UT.USER_SAVED_SUCCESS:
            return {
                message: action.payload,
                error: ''
            }
        case UT.USER_FAILURE:
            return {
                users: [],
                error: action.payload
            }
        case UT.TRAINER_SUCCESS:
            return {
                users: action.payload,
                trainerdata: action.traindat,
                error: ''
            }
        case UT.UPDATE_SUCCESS:
            return {
                users: action.payload,
                trainerdata: action.traindat,
                error: ''
            }
        case UT.UPDATE_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state;
    }
}

export default reducer;