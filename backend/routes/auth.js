// Import express and the Router
const express = require('express');
const { registerUser, loginUser } = require('../controller/authController');
const router = express.Router();



// Define your routes using the router instance
router.post('/register', registerUser);
router.post('/login', loginUser);


// Export the router instance
module.exports = router;
