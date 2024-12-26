import React, { useState } from 'react';
import apiClient from '../apiClient/apiClient';
import { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import MoviesTab from '../tabs/MoviesTab';
import SubscriptionsTab from '../tabs/SubTab';
import UsersTab from '../tabs/UserTab';
import { useNavigate } from 'react-router-dom';
import rolesEnum from '../enums/rolesEnum';

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [roles, setRoles] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
          
          if(apiClient.isAdmin() === 'true') {
            try {
              const response = await apiClient.getUsers();
                    dispatch({type: 'SET_USERS', payload: response.data});
              } catch (error) {
                console.error(error);
              }
          }

        };        
        const fecthRoles = async () => {
          try {
            const response = await apiClient.getProfile();
            dispatch({type: 'SET_ROLES', payload: response.data.roles});
            setRoles(response.data.roles);
          } catch (error) {
            console.error(error);
          }
        }
        const fecthMovies = async () => {
          try {
            const response = await apiClient.getMovies();
            dispatch({type: 'SET_MOVIES', payload: response.data});
          } catch (error) {
            console.error(error);
          }
        };

        const fetchSubscriptions = async () => {
          try {
            const response = await apiClient.getUsersSubs();
            dispatch({type: 'SET_SUBSCRIPTIONS', payload: response.data});
          } catch (error) {
            console.error(error);
          }
        }
        
        fecthRoles();
        fetchSubscriptions();
        fecthMovies();
        fetchUsers();
      }, []);

      const logout = () => {
        apiClient.logout();
        navigate('/login');
      };

      const profileSettings = () => {
        navigate('/profile');
      };

    return (
        <>
        {
          roles.includes(rolesEnum.admin) && <h1>Admin Page</h1>
        }
        {
          !roles.includes(rolesEnum.admin) && <h1>User Page</h1>
        }
            <div>
              <input type="button" value="Profile Settings"  onClick={profileSettings}/>
              <input type="button" value="Logout" onClick={logout}/>
            <ul>
                <li className={activeTab === 'tab1' ? 'active' : ''} onClick={() => setActiveTab('tab1')}>Movies</li>
                <li className={activeTab === 'tab2' ? 'active' : ''} onClick={() => setActiveTab('tab2')}>Subscriptions</li>
                {roles.includes(rolesEnum.admin) &&
                  <li className={activeTab === 'tab3' && roles.includes(rolesEnum.admin) ? 'active' : ''} onClick={() => setActiveTab('tab3')}>Users</li>
                }
                
            </ul>
            <div>
                {activeTab === 'tab1' && <MoviesTab />}
                {activeTab === 'tab2' && <SubscriptionsTab />}
                {roles.includes(rolesEnum.admin) && (activeTab === 'tab3') && roles.includes(rolesEnum.admin) && <UsersTab />}
                
            </div>
            </div>

        </>
    )
}



export default MainPage

