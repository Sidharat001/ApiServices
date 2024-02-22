const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JwtHelper {
    static generateToken(payload) {
        const secretKey = crypto.randomBytes(20).toString('base64');
        return jwt.sign(payload, secretKey, { expiresIn: '1h' });
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
