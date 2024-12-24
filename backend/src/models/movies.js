const mongoose = require('mongoose');
const database = require('../modules/mongodbConnector').database;

const dataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    genres:{
        type: [String],
    },
    premiered:{
        type: String,

    },
    image:{
        type: String,
    },


})

const userdb = database.useDb('moviesdb')
const moviesModel = userdb.model('movies', dataSchema)

module.exports = moviesModel