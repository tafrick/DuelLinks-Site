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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('uname');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

export const auth = (token, email, uname, expireTime) => {
    return dispatch => {
        const expirationDate = new Date(new Date().getTime() + (expireTime * 1000));
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('uname', uname);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token, email, uname));
        dispatch(checkAuthTimeout(expireTime))
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const uname = localStorage.getItem('uname');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, email, uname));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
};