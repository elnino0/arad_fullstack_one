require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  roles : ["View Subscriptions","Create Subscriptions","Delete Subscriptions","View Movies","Create Movies","Delete Movies" ,"Update Subscription", "Update Movie"]
};