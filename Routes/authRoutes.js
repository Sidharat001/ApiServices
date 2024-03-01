const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/protected', AuthMiddleware.requireAuth, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

// Handle 404 - Route not found
router.all("*", (req, res) => {
    res.status(404).json({ message: '404 Not Found', status: 404 });
});

module.exports = router;
