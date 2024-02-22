const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/authController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/protected', AuthMiddleware.requireAuth, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;
