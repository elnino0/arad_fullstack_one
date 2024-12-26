const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const hashPassword = require('../modules/hashPassword');
const database = require('../modules/mongodbConnector').database;


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: {    
      city: String,
      street: String
    }
  },
  roles: {
    type: [String],
    required: true,
  },

  dataCreated: {
    type: String,
    default: Date.now().toString(),
  },

  sessionTimeMin: {
    type: Number,
    default: 60,
  }

});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await hashPassword(this.password)
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userdb = database.useDb("safeUser")
const safeUser = userdb.model('User', userSchema);

module.exports = safeUser;