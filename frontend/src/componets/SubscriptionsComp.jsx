import MovieWatchComp from "./MovieWatchComp"

const SubscriptionsComp = ({userDtails ,options ,onNewSub, onEdit, onDelete}) => {
    return <div>Subscriptions {userDtails.name}
        Email: {userDtails.email}
        <br />
        City : {userDtails?.address?.city}
        <br />
        <button onClick={() => {onEdit(userDtails)}} >edit</button>
        <button onClick={() => {onDelete(userDtails)}} >delete</button>
        <div>
            <MovieWatchComp user={userDtails} options={options} onNewSub={onNewSub} />
        </div>
    </div>


}

export default SubscriptionsComp