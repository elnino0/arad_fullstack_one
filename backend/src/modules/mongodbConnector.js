const mongoose = require('mongoose');
require('dotenv').config();

class Mongodb {

    constructor(){
         this.mongoString = process.env.DATABASE_URL
         this.database = mongoose.connection
    }

    isConnected(){
        return this.database.isConnected
    }

    connect(onConnection){
        mongoose.connect(this.mongoString)

        this.database = mongoose.connection
        this.database.once("open",onConnection)
        this.database.on('error', (error) => {
            console.log(error)
        })
    }
}

const con = new Mongodb()

module.exports =  con