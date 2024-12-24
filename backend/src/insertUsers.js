const users = require("./usersData/users.json")
const UserModel = require('./models/safeuser');
const permissions = require('./config/Permissions.json');

async function insertUsers(){

    for(let user of users){
        
        if((await UserModel.findOne({username:user.username, email:user.email}))){
            continue
        }

        let userPermissions = permissions.find((r) => r.id === user.id);
    
        if(!userPermissions){
            userPermissions=[]
        }

        const userData = {username:user.username,
            email:user.email,
            password:"defualte", 
            address:{city:user.address.city, street:user.address.street}, 
            roles:userPermissions.permissions}

        const userModel = new UserModel(userData)
        userModel.save()//.then((res) => console.log(res)).catch((err) => console.log(err))

    }
    return
}

module.exports = insertUsers

