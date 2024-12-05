const express = require('express');
const subsModel = require("../models/subscriptions")
const router = express.Router()

router.post('/subs', async (req, res) => {
    try {
      const { userid, movieName } = req.body;
      if (!userid || !movieName) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const data = new subsModel({ userid, movieName });
      const dataToSave = await data.save();
      res.status(201).json(dataToSave);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  });

    router.get('/subs', async (req, res) => {
        try{
        const data = await subsModel.find().exec();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get('/subs/:id', async (req, res) => {
try{
    const data = await subsModel.findById(req.params.id);
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
})

router.delete('/subs/:id', async (req, res) => {
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

router.patch('/subs/:id', async (req, res) => {
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