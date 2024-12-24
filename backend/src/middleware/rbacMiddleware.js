// middleware/rbacMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/safeuser');
// Check if the user has the required permission for a route

// Assuming you have a function to extract the user's role from the request
async function getUserRolesFromRequest(req) {
  const token = req.headers.authorization.split(' ')[1];
  const { id } = jwt.verify(token, config.jwtSecret);
  console.log("id",id);
  const userRoles = await User.findById(id).select('roles');
  console.log("userRoles",userRoles);
  return userRoles.roles;
}

/**
 * Checks if the user has the required permission for a route
 * @param {String|String[]} requiredRoles The required permission(s) for the route
 * @returns {Function} A middleware function that checks the user's permission
 */
 function authorize(...requiredRoles) {
  return async (req, res, next) => {
    console.log("req.path", req.path ,req.method);
    console.log(requiredRoles);
    try {
      const userRoles = await getUserRolesFromRequest(req);

      const isAuthorized = requiredRoles.some((role) => userRoles.includes(role));//some((role) => userRoles.includes(role));

      if (isAuthorized) {
        return next();
      } 
      else {
        console.log(`User is not authorized to access this route. Required roles: ${requiredRoles}`);
      }

      res.status(403).send('Forbidden');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
}

module.exports = authorize;

