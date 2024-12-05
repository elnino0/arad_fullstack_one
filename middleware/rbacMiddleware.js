// middleware/rbacMiddleware.js

const Role = require('../modules/role');
const Permissions = require('../models/permissions.js');

// Check if the user has the required permission for a route
exports.checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const userPermissions = await Permissions.findById(req.user?.id);
      if (userPermissions && userPermissions.permissions?.includes(permission)) {
        return next();
      } else {
        return res.status(403).json({ error: 'Access denied' });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};
