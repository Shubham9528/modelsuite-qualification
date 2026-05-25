const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Intentional gap: no rate limiting on auth routes — brute force attack vector
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
