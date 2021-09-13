import {authTypes} from '../types/index';
export const saveUserAuth = (user) => async (dispatch, getState) => {
    dispatch({
        type: authTypes.login,
        payload: {
            user
        }
    });
}

export const logout =() => async (dispatch, getState) => {
    dispatch({
        type: authTypes.logout
    });
}

export const auth = (user) => {
    return async (dispatch, getState) => {
        console.log('desde el action de redux');
        console.log(user);
    }
}