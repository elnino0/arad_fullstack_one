const mongoose = require('mongoose');
const database = require('../modules/mongodbConnector').database;

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

const userdb = database.useDb('userdb')
const usersModel = userdb.model('users', dataSchema)

module.exports = usersModel