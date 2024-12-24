import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiClient from "../apiClient/apiClient";

const ProfilePage = () => {
    const { id } = useParams();
    const [profile , setProfile] = useState({});
    const [ password , setPassword] = useState({});
    const [confirmPassword , setConfirmPassword] = useState(false);
    useEffect(() => {
        // Fetch data based on the id parameter
        const fetchData = async () => {
            try {
                const response = await apiClient.getProfile(id);
                console.log("getProfile  ",response.data);
                    setProfile(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    },[])

    const onChangePassword = (newPassword) => {
        apiClient.changePassword(newPassword).then((res) => {
            console.log(res)
            setConfirmPassword(true)
        })
    }

    return (
        <div>ProfilePage
            <div>
                <h1>Profile for ID: {id}</h1>
                <div>Name : {profile.name}</div>
                <div>Email : {profile.email}</div>
                <div>Role : {profile.roles}</div>
            </div>

            <div> <h1>Changne Password</h1> 
                New Password : <input type="password" name="password" onChange={(e) => { setPassword({...password,newPassword: e.target.value}) }} />
                Old Password : <input type="password" name="password" onChange={(e) => { setPassword({...password,oldPassword: e.target.value}) }} />
                <button type="submit" onClick={() => { onChangePassword(password) }}>Change Password</button>
                {
                    confirmPassword && <div>Password Changed</div>
                }
            </div>
        </div>


    )
}

export default ProfilePage