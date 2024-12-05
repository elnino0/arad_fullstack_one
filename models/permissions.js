const mongoose = require('mongoose');
const database = require('../modules/mongodbConnector').database;

const dataSchema = new mongoose.Schema({
    user_id: {
        required: true,
        type: Number
    },
    roles: {
        required: true,
        type: [String]
    }
})

const permissionsdb = database.useDb('permissionsdb')
const permissionsModel = permissionsdb.model('permissions', dataSchema)

module.exports = permissionsModel