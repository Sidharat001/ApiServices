const JwtHelper = require('../helpers/jwtHelper');

class AuthMiddleware {
    static requireAuth(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }

        const decodedToken = JwtHelper.verifyToken(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decodedToken;
        next();
    }
}

module.exports = AuthMiddleware;
