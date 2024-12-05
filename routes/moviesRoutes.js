const express = require('express');
const moviesModel = require("../models/movies")
const router = express.Router()

router.post('/movies',  (req, res) => {
        const data = new moviesModel({
            ...req.body
    })

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

});

router.get('/movies', async (req, res) => {
        try{
        const data = await moviesModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get('/movies/:id', async (req, res) => {
    try{
        const data = await moviesModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/movies/:id', async (req, res) => {
        try {
        const id = req.params.id;
        const data = await moviesModel.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.patch('/movies/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await moviesModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;