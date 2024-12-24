import UserDetails from '../componets/UserDTails';
import { useState } from 'react';
import apiClient from '../apiClient/apiClient';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../componets/Pagination';
import { useEffect } from 'react';

function UsersTab() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [userDetials, setUserDetails] = useState({});
    const [mode, setMode] = useState('show');
    const [newUser, setNewUser] = useState({roles:[]});
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPge, SetPostsPerPage] = useState(10);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        apiClient.getRoles().then((res) => {
            setRoles(res.data.roles)
        })
    },[])

    const onEdit = (user) => {
        setUserDetails(user);
        setMode('edit');
    }

    const onDelete = (user) => {
        apiClient.deleteUser(user.id).then((res) => {
            console.log(res)
        })
        dispatch({type: 'DELETE_USER', payload: user.id});
    }


    const showUsers= () =>{

        const indexOfLastPost = currentPage * postsPerPge;
        const indexOfFirstPost = indexOfLastPost - postsPerPge;
        const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

        const handlePagination = (pageNumber) => {
            setCurrentPage(pageNumber);
          }

        return <div>
            <button onClick={() => { setMode('show') }}>all users</button>
            <button onClick={() => { setMode('add') }}>Add User</button>
            <Pagination length={users.length} postsPerPage={postsPerPge} handlePagination={handlePagination} currentPage={currentPage} />

            {
                currentPosts.map((user,index) => (
                    <div key={index} ><UserDetails details={user} onEdit={onEdit} onDelete={onDelete} /></div>
                ))
            }
        </div>
    }

    const addUser = () => {
        const onSubmit = () => {
            
            apiClient.addUser(newUser).then((res) => {
                console.log(res)
                setMode('show');
                dispatch({type: 'ADD_USER', payload: newUser});
            })
        }
        return <div>
            Name: <input type="text" name="username" onChange={(e) => { setNewUser({ ...newUser, username: e.target.value }) }} />
            Email: <input type="text" name="email" onChange={(e) => { setNewUser({ ...newUser, email: e.target.value }) }} />
            Roles: {
                roles.map((role) => (
                    <div key={role}>
                        <input type="checkbox" name="roles" value={role} checked={newUser.roles.includes(role) || selectedRoles.includes(role) } onChange={(e) => {
                            
                            if (e.target.checked) {
                                selectedRoles.push(role);
                            }

                            setSelectedRoles(selectedRoles);
                            setNewUser({ ...newUser, roles: selectedRoles });
                        }} />
                        {role}
                    </div>
                ))
            }
            <button type="submit" onClick={() => { onSubmit() }}>Add</button>
            <button onClick={() => { setMode('show') }}>Cancel</button>
            
        </div>
    }

    const edituser = () => {
        const onSubmit = () => {
            
            apiClient.updateUser(userDetials).then((res) => {
                console.log(res)
                setMode('show');
                dispatch({type: 'UPDATE_USER', payload: userDetials});
            })
        }

       return <div>
            Name: <input type="text" name="username" onChange={(e) => { setUserDetails({ ...userDetials, username: e.target.value }) }} />
            Email: <input type="text" name="email" onChange={(e) => { setUserDetails({ ...userDetials, email: e.target.value }) }} />
            Roles: {
                userDetials.roles.map((role) => (
                    <div key={role}>
                        <input type="checkbox" name="roles" value={role} checked={userDetials.roles.includes(role)} onChange={(e) => {
                            const newRoles = [];
                            if (e.target.checked) {
                                newRoles.push(role);
                            } else {
                                newRoles.splice(newRoles.indexOf(role), 1);
                            }
                            setUserDetails({ ...userDetials, roles: newRoles });
                        }} />
                        {role}
                    </div>
                ))
            }
            <button type="submit" onClick={() => { onSubmit() }}>Save</button>
            <button onClick={() => { setMode('show') }}>Cancel</button>

       </div>
    }

    const render = () => {
        return <div>
            {
                mode === 'show' && showUsers()
            }
            {
                mode === 'edit' && edituser()
            }
            {
                mode === 'add' && addUser()
            }
        </div>
    }

    return <div>This is tab 3
            {
                render()
            }
    </div>;
  }

  export default UsersTab