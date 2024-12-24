import apiClient from '../apiClient/apiClient';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
/**
 * A functional component for the login page.
 * It allows users to enter their username and password and submit their credentials.
 * On successful login, it logs the response to the console.
 * A link is provided for users to register if they do not have an account.
 */
const LoginPage = () => {
    const [userDetials, setUserDetails] = useState({email: 'Sincere@april.biz', password: 'defualte'});
    const navigate = useNavigate();
    const login = async (userDetials) => {
        apiClient.login(userDetials).then((res) => {
            console.log(res)
            navigate('/admin')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <h1>login</h1>
            Email: <input defaultValue="Sincere@april.biz" type="text" name="username" onChange={(e) => { setUserDetails({ ...userDetials, email: e.target.value }) }}  />
            Password: <input defaultValue="defualte" type="password" name="password" onChange={(e) => { setUserDetails({ ...userDetials, password: e.target.value }) }} />
            <button type="submit" onClick={() => { login(userDetials) }}>Login</button>
            CeateAccout : <a href="/register">Register</a>
        </div>
    )
}

export default LoginPage