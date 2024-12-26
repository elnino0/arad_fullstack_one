
import SubscriptionsComp from '../componets/SubscriptionsComp';
import apiClient from '../apiClient/apiClient';
import { useSelector, useDispatch } from 'react-redux';


import { createSelector } from 'reselect';
import rolesEnum from '../enums/rolesEnum';

const selectUsers = (state) => state.movies; 

const selectMovieNames = createSelector(
  [selectUsers],
  (movies) => movies.map((movie) => {
    movie.name
    return {name: movie.name, id: movie._id};
})
);

function SubscriptionsTab() {
    const subs = useSelector((state) => state.subscriptions);
    const options = useSelector(selectMovieNames);
    const roles = useSelector((state) => state.roles)
    const dispatch = useDispatch();
    const onNewSub = (data) => {
        apiClient.addSub(data).then((res) => {
            dispatch({type: 'ADD_SUBSCRIPTION', payload: data});
        })
    }

    const onEdit = (user) => {
        apiClient.patchUsers(user).then((res) => {
            dispatch({type: 'EDIT_SUBSCRIPTION', payload: user});
        })
    }

    const onDelete = (user) => {
        apiClient.deleteSubs(user.id).then((res) => {
            dispatch({type: 'DELETE_SUBSCRIPTION', payload: user});
        })
    }

    const renderSubs = () => {

        if(subs.length === 0) return <div>Loading...</div>;

        return <div>
            {
                subs.map((user,index) => (
                    <div key={index} ><SubscriptionsComp userDtails={user}  options={options} onNewSub = {roles.includes(rolesEnum.admin) || roles.includes(rolesEnum.CREATE_SUBSCRIPTIONS) ? onNewSub : null} 
                    onEdit = {roles.includes(rolesEnum.admin) || roles.includes(rolesEnum.UPDATE_SUBSCRIPTION) ? onEdit : null} onDelete = {roles.includes(rolesEnum.admin) || roles.includes(rolesEnum.DELETE_SUBSCRIPTIONS) ? onDelete : null}/></div>
                ))
            }
        </div>
        }

    return <div>This is tab 2
            {
                renderSubs()
            }
    </div>;

  }
  
  export default SubscriptionsTab