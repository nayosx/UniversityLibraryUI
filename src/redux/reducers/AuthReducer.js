import {authTypes} from '../types/index';

const initState = {
    user: null,
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case authTypes.login:
            return {
                ...state,
                user: action.payload.user
            };
            break;

        case authTypes.logout:
            return {
                user: null,
            } 
            break;
        default:
            return state;
    }
}

export default AuthReducer;