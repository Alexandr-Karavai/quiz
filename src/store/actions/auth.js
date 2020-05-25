import axios from 'axios';
import {AUTH_LOG_OUT, AUTH_SUCCESS} from './actionTypes';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjJdxWIgguYwH9HrD81LVWlcNcV2vTpNE';

        if (isLogin) {
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjJdxWIgguYwH9HrD81LVWlcNcV2vTpNE';
        }
        const res = await axios.post(url, authData);
        const data = res.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogOut(data.expiresIn))
        // try {
        //     const res = await axios.post(url, authData);
        //     console.log(res.data);
        // } catch (e) {
        //     console.log(e);
        // }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogOut(time) {
    return  dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, time * 1000);
    }
}

export function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOG_OUT
    }
}

export function autoLogIn() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logOut());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}