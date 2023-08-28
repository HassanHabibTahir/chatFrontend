import React, { useEffect, useState } from 'react'
import './auth.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/actions/authAction';
const Login = () => {




    const navigate = useNavigate();



    const { loading, authenticate, error, successMessage, myInfo } = useSelector(state => state.auth);


    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const inputHendle = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        dispatch(userLogin(state))
    }

    useEffect(() => {
        if (authenticate) {
            navigate('/');
        }
        // if (successMessage) {
        //     alert.success(successMessage);
        //     dispatch({ type: SUCCESS_MESSAGE_CLEAR })
        // }
        // if (error) {
        //     error.map(err => alert.error(err));
        //     dispatch({ type: ERROR_CLEAR })
        // }

    }, [successMessage, error])

    return (
        <div><form onSubmit={(e) => login(e)}>
            <div className="container">
                <h1>Login</h1>
                <p> fill in this form to Login an account.</p>
                <hr />

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" onChange={(e) => inputHendle(e)} placeholder="Enter Email" name="email" id="email" required />

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" onChange={(e) => inputHendle(e)} placeholder="Enter Password" name="password" id="password" required />



                <button type="submit" className="registerbtn">Login</button>
            </div>


        </form>
        </div>
    )
}

export default Login