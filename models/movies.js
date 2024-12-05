const mongoose = require('mongoose');
const database = require('../modules/mongodbConnector').database;

const dataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    genres:{
        type: [String],
        required: true,
    },
    premiered:{
        type: String,
        required: true,

    },
    image:{
        type: String,
        required: true,
    },


})

const userdb = database.useDb('moviesdb')
const moviesModel = userdb.model('movies', dataSchema)

module.exports = moviesModel