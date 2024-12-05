const users = require("./usersData/users.json")
const UserModel = require('./models/safeuser');


async function insertUsers(){

    for(let user of users){
        
        if((await UserModel.findOne({username:user.username, email:user.email}))){
            console.log("found")
            continue
        }

        const userModel = new UserModel({username:user.username, email:user.email,password:"defualte"})
        userModel.save()

    }
    return
}

module.exports = insertUsers

