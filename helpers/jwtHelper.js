const jwt = require('jsonwebtoken');

class JwtHelper {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
            return null;
        }
    }
}

module.exports = JwtHelper;
