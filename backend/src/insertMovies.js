const movies = require("./usersData/movies.json")
const moviesModel = require('./models/movies');
const con = require("./modules/mongodbConnector");


async function insertMovies(){

    for(let movie of movies){
        if((await moviesModel.findOne({name:movie.name}))){
            continue
        }

        const userModel = new  moviesModel({name:movie.name,description:movie.summary  ,genres:movie.genres, premiered:movie.premiered, image:movie.image.medium})
        userModel.save()

    }
    return
}

module.exports = insertMovies
