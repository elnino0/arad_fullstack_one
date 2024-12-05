const permissions = require("./config/Permissions.json")
const permissionsModel = require('./models/permissions');


async function insertPermissions(){

    for(let per of permissions){
        if((await permissionsModel.findOne({id:per.id}))){
            continue
        }

        const userModel = new permissionsModel({user_id:per.id,roles:per.permissions})
        userModel.save()

    }
    return
}

module.exports = insertPermissions

