const users = require("./usersData/users.json")
const UserModel = require('./models/safeuser');
const permissions = require('./config/Permissions.json');

async function insertUsers(){

    for(let user of users){
        
        if((await UserModel.findOne({username:user.username, email:user.email}))){
            console.log("found")
            continue
        }

        let userPermissions = permissions.find((r) => r.id === user.id);
        if(!userPermissions){
            userPermissions=[]
        }
        const userModel = new UserModel({username:user.username,email:user.email,password:"defualte", roles:userPermissions.permissions})
        userModel.save()

    }
    return
}

module.exports = insertUsers

