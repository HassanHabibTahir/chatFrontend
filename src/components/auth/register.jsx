import React, { useEffect, useState } from 'react'
import './auth.css'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../../store/actions/authAction'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { loading, authenticate, error, successMessage, myInfo } = useSelector(state => state.auth);

    const [state, setstate] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accountType: 'seller'
    })
    const inputChangeHandler = e => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userRegister(state))
    }

    useEffect(() => {
        if (authenticate) {
            Navigate('/');
        }
        // if(successMessage){
        //      alert.success(successMessage);
        //      dispatch({type : SUCCESS_MESSAGE_CLEAR })
        // }
        // if(error){
        //      error.map(err=>alert.error(err));
        //      dispatch({type : ERROR_CLEAR })
        // }

    }, [successMessage, error])

    console.log(myInfo, "myInfo")

    return (
        <div><form onSubmit={(e) => submitHandler(e)}>
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label htmlFor="firstName"><b>Name</b></label>
                <input type="text" onChange={(e) => inputChangeHandler(e)} placeholder="Enter firstName" name="firstName" id="name" required />
                <label htmlFor="lastName"><b>Name</b></label>
                <input type="text" onChange={(e) => inputChangeHandler(e)} placeholder="Enter lastName" name="lastName" id="name" required />
                <label htmlFor="email"><b>Email</b></label>
                <input type="email" onChange={(e) => inputChangeHandler(e)} placeholder="Enter Email" name="email" id="email" required />
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" onChange={(e) => inputChangeHandler(e)} placeholder="Enter Password" name="password" id="password" required />


                <hr />
                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                <button type="submit" className="registerbtn">Register</button>
            </div>

            <div className="container signin">
                <p>Already have an account? <a href="#">Sign in</a>.</p>
            </div>
        </form>
        </div>
    )
}

export default Register