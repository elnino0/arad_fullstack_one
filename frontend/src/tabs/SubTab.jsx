
import SubscriptionsComp from '../componets/SubscriptionsComp';
import apiClient from '../apiClient/apiClient';
import { useSelector, useDispatch } from 'react-redux';


import { createSelector } from 'reselect';

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
    const users = useSelector((state) => state.users);
    const options = useSelector(selectMovieNames);
    const dispatch = useDispatch();
    console.log("SubscriptionsTab subs ",subs);
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

        if(users.length === 0) return <div>Loading...</div>;

        for (let user of users) {
            if(!user.subscriptions) {
                user.subscriptions = [];
            }

            user.subscriptions = subs.filter((sub) => sub.userid === user._id);
        }

        return <div>
            {
                users.map((user,index) => (
                    <div key={index} ><SubscriptionsComp userDtails={user}  options={options} onNewSub = {onNewSub} onEdit = {onEdit} onDelete = {onDelete}/></div>
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