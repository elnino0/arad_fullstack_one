const bcrypt = require('bcryptjs');

const hashPassword = async function(enteredPassword) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(enteredPassword, salt);
  };

  
  module.exports = hashPassword