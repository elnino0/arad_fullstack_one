const express = require('express');
const subsModel = require("../models/subscriptions");
const authorize = require('../middleware/rbacMiddleware');
const UserRole = require('../enums/roles');
const moviesModel = require('../models/movies');
const router = express.Router()

router.post('/subs', authorize(UserRole.admin, UserRole.CreateSubscriptions),async (req, res) => {
    
  try {
      console.log("subs body",req.body)
      const { userId: userid, movieName, date, movieId } = req.body;

      if (!userid || !movieName) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const movie = await moviesModel.findOne({ name: movieName });

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      const data = new subsModel({ userid, movieName, date, movieId });
      const dataToSave = await data.save();

      res.status(201).json(dataToSave);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  });

    router.get('/subs', authorize(UserRole.admin, UserRole.ViewSubscriptions),async (req, res) => {
        try{
        const data = await subsModel.find().exec();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get('/subs/:id',authorize(UserRole.admin, UserRole.ViewSubscriptions) ,async (req, res) => {
try{
    const data = await subsModel.findById(req.params.id);
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
})

router.delete('/subs/:id',authorize(UserRole.admin, UserRole.DeleteSubscriptions) ,async (req, res) => {
    try {
    const id = req.params.id;
    const data = await subsModel.findByIdAndDelete(id)
    
    if (!data) {
        return res.status(404).json({ message: 'Subscription not found' });
      }

      if (!data) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
}
catch (error) {
    res.status(400).json({ message: error.message })
}
});

router.patch('/subs/:id',authorize(UserRole.admin, UserRole.CreateSubscriptions) ,async (req, res) => {
try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await subsModel.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
})

module.exports = router;