// controllers/authController.js

const User = require('../models/safeuser');
const Role = require('../modules/role');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { is } = require('express/lib/request');


// Register a new user with a role
exports.registerUser = (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, role });

  User.register(user, password, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User registered successfully' });
  });
};

const generateToken = (id) => {
     return jwt.sign({ id }, config.jwtSecret, { expiresIn: '6d' });
   };

   exports.registerUser = async (req, res) => {
     const { username, email, password } = req.body;

     const userExists = await User.findOne({ username });

     if (userExists) {
       return res.status(400).json({ message: 'User already exists' });
     }

     const user = await User.create({ username, email, password });

     if (user) {
       res.status(201).json({
         _id: user._id,
         username: user.username,
         email: user.email,
         token: generateToken(user._id),
       });
     } else {
       res.status(400).json({ message: 'Invalid user data' });
     }
   };

   exports.loginUser = async (req, res) => {
     const { email, password } = req.body;
      console.log("loginUser", { email, password } )
     const user = await User.findOne({ email });

     if (user && (await user.matchPassword(password))) {
       res.json({
         _id: user.id,
         username: user.username,
         email: user.email,
         token: generateToken(user._id),
         isAdmin: user.roles.includes(Role.Admin),
       });
     } else {
       res.status(401).json({ message: 'Invalid email or password' });
     }
   };

   exports.getUserProfile = async (req, res) => {
     const user = await User.findById(req.user.id);

     if (user) {
       res.json({
         _id: user._id,
         username: user.username,
         email: user.email,
         roles: user.roles,
       });
     } else {
       res.status(404).json({ message: 'User not found' });
     }
   };


   exports.changePassword = async (req, res) => {
     const { oldPassword, newPassword } = req.body;
     const user = await User.findById(req.user.id);
 
     if (user && (await user.matchPassword(oldPassword))) {
       user.password = newPassword;
       await user.save();
 
       res.json({ message: 'Password changed successfully' });
     } else {
       res.status(401).json({ message: 'Invalid old password' });
   }
  }