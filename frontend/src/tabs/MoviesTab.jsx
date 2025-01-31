import MoviesDtails from '../componets/MovieDtails';
import { useState } from 'react';
import apiClient from '../apiClient/apiClient';
import { useDispatch, useSelector } from 'react-redux';
import FilterComponent from '../componets/FilterComponent';
import { useEffect } from 'react';
import Pagination from '../componets/Pagination';
import rolesEnum from '../enums/rolesEnum';
import DateSelector from '../componets/dateSelectorComp';



function MoviesTab() {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);
    const roles = useSelector((state) => state.roles);
    const [movieDetials, setMovieDetails] = useState({premiered: new Date().toISOString()});
    const [filteredData, setFilteredData] = useState([]);
    const [mode, setMode] = useState('show');   
    const [newMovie, setNewMovie] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPge, SetPostsPerPage] = useState(10);
    
    useEffect(() => {
        setFilteredData(movies);
    }, [movies]);

    const onEdit = (movie) => {
        setMovieDetails(movie);
        setMode('edit');
    }

    const onDelete = (movie) => {
        apiClient.deleteMovie(movie._id).then((res) => {
            console.log(res)
            dispatch({type: 'DELETE_MOVIE', payload: movie._id});
        })
    }

    const onFind = (query) =>{
        if(!query.name || query.name === ''){
            setFilteredData(movies);
            return
        }

        setFilteredData(movies.filter((item) => item.name.includes(query.name)));
    }
    const showMovies= () =>{


        const indexOfLastPost = currentPage * postsPerPge;
        const indexOfFirstPost = indexOfLastPost - postsPerPge;
        const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
      
        const handlePagination = (pageNumber) => {
          setCurrentPage(pageNumber);
        }

        return <div>
            <button onClick={() => { setMode('show'); setFilteredData(movies) }}>all movies</button>
            <button onClick={() => { setMode('add') }}>Add Movie</button>
            <FilterComponent onFind={onFind}/>
            <Pagination length={filteredData.length} postsPerPage={postsPerPge} handlePagination={handlePagination} currentPage={currentPage} />
            {
                currentPosts.map((movie,index) => (
                    <div key={index} ><MoviesDtails details={movie} OnDelete={(roles.includes(rolesEnum.admin) || roles.includes(rolesEnum.DELETE_MOVIES)) ? onDelete : null} OnEdit={(roles.includes(rolesEnum.admin) || roles.includes(rolesEnum.UPDATE_MOVIE)) ? onEdit : null } /></div>
                ))
            }
            </div>
    }
    
    const addMovie = () => {
       const onSubmit = () => {
           apiClient.postMovies(newMovie).then((res) => {
               console.log(res)
               setMode('show');
               dispatch({type: 'ADD_MOVIE', payload: newMovie});
           })
       }
        return <div>
            Name: <input type="text" name="name" onChange={(e) => { setNewMovie({ ...newMovie, name: e.target.value }) }} />
            Description: <input type="text" name="description" onChange={(e) => { setNewMovie({ ...newMovie, description: e.target.value }) }} />
            Premiered: <DateSelector onChange={(date) => { setMovieDetails({ ...movieDetials, premiered: date }) }}/>
            <button type="submit" onClick={() => { onSubmit() }}>Add</button>
            <button onClick = {() => { setMode('show') }}>Cancel</button>
        </div>
    }

    const editMovie = () => {
        const onSubmit = () => {
            console.log(movieDetials)
            apiClient.patchMovie(movieDetials._id,movieDetials).then((res) => {
                setMode('show');
                dispatch({type: 'UPDATE_MOVIE', payload: movieDetials});
            })
        }    

        return <div>
            Name: <input type="text" name="name" onChange={(e) => { setMovieDetails({ ...movieDetials, name: e.target.value }) }} value={movieDetials.name} />
            Description: <input type="text" name="description" onChange={(e) => { setMovieDetails({ ...movieDetials, description: e.target.value }) }} value={movieDetials.description} />
            Premiered: <DateSelector onChange={(date) => { setMovieDetails({ ...movieDetials, premiered: date }) }}/>
            <button type="submit" onClick={() => { onSubmit() }}>Save</button>
            <button onClick={() => { setMode('show') }}>Cancel</button>
        </div>
    }


    return <div>This is tab 1
            {
                mode === 'show' && (roles.includes(rolesEnum.admin) || roles.includes(rolesEnum.VIEW_MOVIES)) && showMovies()
            }
            {
                mode === 'edit' && (roles.includes(rolesEnum.admin) || roles.includes(rolesEnum.UPDATE_MOVIE)) && editMovie()
            }
            {
                mode === 'add' && (roles.includes(rolesEnum.admin) || roles.includes(rolesEnum.CREATE_MOVIES)) && addMovie() 
            }
    </div>;

  }

  export default MoviesTab