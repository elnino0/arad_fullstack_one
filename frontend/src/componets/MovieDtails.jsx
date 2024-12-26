const MoviesDtails = ({ details , OnDelete, OnEdit}) => {
    return (
        <div>
            <h1>Movie Details</h1>
                Name: {details.name}
                <br />
                Description: {details.description}
                <br />
                Category: {details.category}
                <br />
                Genre: {details.genre}
                <br />
                Image: <img  src={details.image} />
                <br />
                Rating: {details.rating}
                <br />
                Premiered: {details.premiered}
                <br />
            { (OnEdit) &&
                <div>
                     <button onClick={() => {OnEdit(details)}}>Edit</button>
                </div>
            }

            { (OnDelete) &&
                <div>
                     <button onClick={() => {OnDelete(details)}}>Delete</button>
                </div>
            }   

        </div>
    );
}

export default MoviesDtails