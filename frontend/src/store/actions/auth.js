import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, email, uname) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        uEmail: email,
        uName: uname
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (token, email, uname) => {
    return dispatch => {
        dispatch(authSuccess(token, email, uname));
    };
};