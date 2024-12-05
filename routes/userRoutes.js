const express = require('express');
const safeuserModel = require("../models/safeuser")
const router = express.Router()

router.get('/user', async (req, res) => {
    try{
    const data = await safeuserModel.find();
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
});

router.get('/user/:id', async (req, res) => {
try{
    const data = await safeuserModel.findById(req.params.id);
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
})

router.delete('/user/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const data = await safeuserModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
});

router.patch('/user/:id', async (req, res) => {
try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await safeuserModel.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
})


module.exports = router;