// Import express and the Router
const express = require('express');
const { getBugs, createBug, updateBug } = require('../controller/bugController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();



// Define your routes using the router instance
router.get('/',authenticateToken, getBugs );
router.post('/', authenticateToken, createBug);
router.put("/:id",authenticateToken, updateBug)


// Export the router instance
module.exports = router;
