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

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const config = require('../config');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// mongoose.connect(config.mongodbUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB', err);
// });

// app.use(bodyParser.json());
// app.use('/api/auth', authRoutes);


// Protect the route with RBAC middleware
//router.get('/records', rbacMiddleware.checkPermission('read_record'), recordsController.getAllRecords);

const onConnection =() =>{
    console.log("database connected")
    insertMovies()
    insertUsers()
}

databaseClass.connect(onConnection)





app.use(express.json())
app.use(protect);
// app.use(checkPermission)
app.use('/auth', authRputer)
app.use('/api', movieRouter)
app.use('/api', subsRouter)
app.use('/api', userRouter)

// //Post Method
// routes.post('/post', (req, res) => {
//     console.log("req.body",req.body)
//     const data = new Model({
//         name: req.body.name,
//         age: req.body.age
//     })

//     try {
//         const dataToSave = data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

// //Get all Method
// routes.get('/getall', async  (req, res) => {
//     try{
//         const data = await Model.find();
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// //Get by ID Method
// routes.get('/getOne/:id', async (req, res) => {
//     try{
//         const data = await Model.findById(req.params.id);
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// //Update by ID Method
// routes.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// //Delete by ID Method
// routes.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id)
//         res.send(`Document with ${data.name} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})