const express = require('express');
require("./modules/mongodbConnector")
const app = express();
const databaseClass = require("./modules/mongodbConnector");
const insertUsers = require('./insertUsers');
const { protect } = require('./middleware/authMiddleware');
const insertMovies = require('./insertMovies');
const movieRouter = require("./routes/moviesRoutes")
const subsRouter = require("./routes/subRoutes")
const userRouter = require("./routes/userRoutes")
const authRputer = require("./routes/authRoutes")
const cors = require('cors');

const onConnection =() =>{
    console.log("database connected")
    insertMovies()
    insertUsers()
}

databaseClass.connect(onConnection)

app.use(cors());
app.use(express.json())
app.use(protect);

app.use('/auth', authRputer)
app.use('/api', movieRouter)
app.use('/api', subsRouter)
app.use('/api', userRouter)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})