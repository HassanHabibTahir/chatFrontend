import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../types/authType";
import { url } from '../../config';




export const userRegister = (data) => {
    return async (dispatch) => {

        const config = {
            headers: {
                'Content-Type': 'application/josn'
            }, ...data
        }
        try {

            const response = await axios.post(`${url}/api/auth/register`, config);

            localStorage.setItem('authToken', JSON.stringify(response.data));

            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: response.data.success,
                    token: response.data.token,
                    message: response.data.message,
                    data: response.data.user
                }
            })

        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }

    }
}


export const getUser = (data) => {
    return async (dispath) => {
        dispath({
            type: USER_LOGIN_SUCCESS,
            payload: {
                successMessage: data.success,
                token: data.token,
                message: data.message,
                data: data.user
            }
        })
    }
}




export const userLogin = (data) => {
    return async (dispath) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }, ...data
        }

        try {
            console.log(data, "data")
            const response = await axios.post(`${url}/api/auth/login`, config);
            console.log(response, "response--->login")
            localStorage.setItem('authToken', JSON.stringify(response.data));
            dispath({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.success,
                    token: response.data.token,
                    message: response.data.message,
                    data: response.data.user
                }
            })
        } catch (error) {
            console.log(error)
            dispath({
                type: USER_LOGIN_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }
    }
}

export const userLogout = () => async (dispatch) => {
    try {
        const response = await axios.post(`${url}/api/auth/logout`);
        if (response.data.success) {
            localStorage.removeItem('authToken');
            dispatch({
                type: 'LOGOUT_SUCCESS'
            })
        }

    } catch (error) {
        console.log(error)
    }
}




