import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoviesDtails from '../componets/MovieDtails';
import apiClient from '../apiClient/apiClient';

function MoviePage() {
  const { id } = useParams(); 
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data based on the id parameter
    const fetchData = async () => {
      try {
        apiClient.getMovie(id).then((response) => {
          console.log("getMovie  ",response.data);
            setData(response.data);
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); 

  if (!data) {
    return <div>Loading...</div>; 
  }

  // Render the data 
  return (
    <div>
      <h1>Page for ID: {id}</h1>
      <div>Data: <MoviesDtails details={data} /></div> 
      {/* Render other data fields */}
    </div>
  );
}

export default MoviePage;