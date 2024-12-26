import { useState } from "react";
import DateSelector from "./dateSelectorComp";
import Autocomplete from "./AutoComplite"
import { Link } from "react-router-dom";

const MovieWatchComp = ({user, options, onNewSub}) => {
    const [mode, setMode] = useState('hide');
    const [movieDetials, setMovieDetails] = useState({date: new Date().toISOString()});
    const OpenEdit = () => {
        setMode('show');
    }

    const onAddSub = () => {
        const req = {movieName: movieDetials.name, userId: user._id, movieId: movieDetials.movieId, date: movieDetials.date};
        onNewSub(req);
        setMode('hide');
    }

    return <div>MovieWatchComp
        <button onClick={() => { OpenEdit()}}>Add new sub</button>
        {
            mode === 'show' && onAddSub && <div>
                <button onClick={() => { setMode('hide') }}>Cancel</button>
                <button onClick={() => { onAddSub() }}>Add Sub</button>
                <Autocomplete options={options.map(op => op.name)} onSelect={(selectedOption) => {
                    setMovieDetails({ ...movieDetials, movieId: options.find(op => op.name === selectedOption).id, name: selectedOption })
                }} />
                <DateSelector onChange={(date) => { setMovieDetails({ ...movieDetials, date }) }}/>
            </div> 
        }
        <br />
        Subs : 
            <div>
                {
                    user.subscriptions.map((movie,index) => (
                    <div key={index}>
                        <Link to={'/movies/' + movie.movieId} >  {movie.movieName}</Link>
                        <br />
                    </div>
                ))
                }
            </div>

        
    </div>;
}

export default MovieWatchComp