// models/permissions.js
const roles = require('../config/Permissions.json');

class Permissions {
    constructor() {
      this.permissions = [];
    }
  
  getPermissionsByRoleName(roleName) {
      const role = roles.permissions.find((r) => r.name === roleName);
      return role ? role.permissions : [];
    }
  }
  module.exports = Permissions;