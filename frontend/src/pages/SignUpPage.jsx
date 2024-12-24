import apiClient from "../apiClient/apiClient"
import { useState } from "react"

const Signup = () => {
    
    const signup = async (userDetials) => {
        apiClient.postUsers(userDetials).then((res) => {
            console.log(res)
        })
    }

    const [userDetials, setUserDetails] = useState({});

    return (
        <div>
            <h1>Signup</h1>
            User Name: <input type="text" name="username" onChange={(e) => { setUserDetails({ ...userDetials, username: e.target.value }) }} />
            Password: <input type="password" name="password"  onChange={(e) => { setUserDetails({ ...userDetials, password: e.target.value }) }}/>
            <button type="submit" onClick={() => { signup(userDetials) }}>Signup</button>
        </div>
    )
}

export default Signup