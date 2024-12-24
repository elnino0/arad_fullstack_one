const express = require('express');
   const { registerUser, loginUser, getUserProfile, changePassword } = require('../controllers/authController');
   const { protect } = require('../middleware/authMiddleware');

   const router = express.Router();

   router.post('/register', registerUser);
   router.post('/changePassword',  protect, changePassword);
   router.post('/login', loginUser);
   router.get('/profile', protect, getUserProfile);

   module.exports = router;