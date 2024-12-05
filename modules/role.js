// models/role.js

const roles = require('../config/Permissions.json');

class Role {
  constructor() {
    this.roles = roles.roles;
  }

  getRoleByName(id) {
    return this.roles.find((role) => role.id === id);
  }

  getRoles() {
    return this.roles;
  }
}

module.exports = Role;