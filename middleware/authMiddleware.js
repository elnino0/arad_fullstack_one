const jwt = require('jsonwebtoken');
const User = require('../models/safeuser');
const config = require('../config/config');

exports.protect = async (req, res, next) => {
  let token;
  console.log("req.path ---- ", req.path, " ---- ", req.path.includes('/login'))

  if (req.path.includes('/login')) {
    next();
  }else{
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, config.jwtSecret);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }

  }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  }

};