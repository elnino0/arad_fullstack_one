const mongoose = require('mongoose');
const database = require('../modules/mongodbConnector').database;

const dataSchema = new mongoose.Schema({
    userid: {
        required: true,
        type: String
    },

    movieId: {
        required: true,
        type: String
    },

    movieName: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    }
})

const subscriptionsdb = database.useDb('subscriptions')
const subscriptionsModel = subscriptionsdb.model('subscriptions', dataSchema)

module.exports = subscriptionsModel