const express = require('express');
const safeuserModel = require("../models/safeuser");
const authorize = require('../middleware/rbacMiddleware');
const UserRole = require('../enums/roles');
const config = require('../config/config');
const router = express.Router()


router.post('/users',authorize(UserRole.admin) ,async (req, res) => {
    try{
    const updatedData = req.body;
    updatedData["password"] = "defulte"
    const result = await safeuserModel.create(
        updatedData
    )
    
    res.json(result)
}
catch(error){
    console.log(error)
    res.status(500).json({message: error.message})
}
});

router.get('/users',authorize(UserRole.admin) ,async (req, res) => {
    try{
    const data = await safeuserModel.find();
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
});

router.get('/users/:id', authorize(UserRole.admin), async (req, res) => {
try{
    const data = await safeuserModel.findById(req.params.id);
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
})

router.delete('/users/:id', authorize(UserRole.admin), async (req, res) => {
    try {
    const id = req.params.id;
    const data = await safeuserModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
});

router.patch('/users/:id', authorize(UserRole.admin), async (req, res) => {
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

const roles = config.roles
router.get('/roles', authorize(UserRole.admin), async (req, res) => {
    try {

        res.send({roles :roles})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
    })

module.exports = router;