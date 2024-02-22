const User = require('../Model/userModel');
const JwtHelper = require('../helpers/jwtHelper');
const HttpStatusCodes = require('../HttpsStatus/HttpsStatusCode');
const bcrypt = require('bcrypt');

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, name } = req.body;
            let user = await User.getUserByEmail(email);
            if(user && user.length > 0) {
                res.status(200).json({status: HttpStatusCodes.OK, message: `User ${email} already exists`, data: user });
            }else{
                let username = `SYT-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
                await User.createUser(username, email, name, password);
                res.status(200).json({ status: HttpStatusCodes.OK, message: 'User registered successfully' });
            }
        } catch (error) {
            res.status(500).json({status: HttpStatusCodes.Internal_Server_Error, message: 'Error registering user' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ status: HttpStatusCodes.Not_Found, message: 'Unauthorized User' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = JwtHelper.generateToken({ email: user.email });
                return res.status(200).json({ status: HttpStatusCodes.OK, token: token });
            }else return res.status(401).json({ status: HttpStatusCodes.UNAUTHORIZED, message: 'Invalid email or password' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error logging in' });
        }
    }
}

module.exports = AuthController;
