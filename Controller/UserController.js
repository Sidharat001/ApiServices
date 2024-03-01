const UserModel = require('../Model/userModel');
const JwtHelper = require('../helpers/jwtHelper');
const HttpStatusCodes = require('../HttpsStatus/HttpsStatusCode');
const bcrypt = require('bcrypt');
const SendMailHelper = require('../helpers/Sendmail');

class UserController {
    static async register(req, res) {
        try {
            const { email, password, name } = req.body;

            // Check if user already exists
            let user = await UserModel.getUserByEmail(email);
            if (user?.status === HttpStatusCodes.OK && user?.data?.length > 0) {
                return res.status(HttpStatusCodes.OK).json({ status: HttpStatusCodes.OK, message: `User ${email} already exists`, data: user.data });
            }

            // Generate a random username
            const username = `SYT-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

            // Create new user
            let userRegister = await UserModel.createUser(username, email, password, name);
            if (userRegister?.status !== HttpStatusCodes.OK) {
                return res.status(userRegister.status).json({ status: userRegister?.status, message: userRegister?.message, data: [] });
            }

            // Prepare mail data and send registration email
            const mailData = Object.assign(req.body, { username: username });
            let sendMail = await SendMailHelper(mailData);
            if (sendMail.status !== HttpStatusCodes.OK) {
                return res.status(sendMail.status).json({ status: sendMail?.status, message: sendMail?.message, data: [] });
            }

            // Return success response
            res.status(HttpStatusCodes.OK).json({ status: HttpStatusCodes.OK, message: 'User registered successfully', data: [] });
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.Internal_Server_Error).json({ status: HttpStatusCodes.Internal_Server_Error, message: 'Error registering user' });
        }
    }


    static async login(req, res) {
        try {
            const { email, password } = req.body;
            let user = await UserModel.getUserByEmail(email);
            if (!user && user.status !== 200) {
                return res.status(404).json({ status: user?.status, message: user?.message });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = JwtHelper.generateToken({ email: user.email, user: user.username });
                // sessionStorage.setItem({ token: token, user: user.username });
                return res.status(200).json({ status: HttpStatusCodes.OK, message: `User Login Successfully with ${user.username}`, token: token });
            } else return res.status(401).json({ status: HttpStatusCodes.UNAUTHORIZED, message: 'Invalid email or password' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error logging in' });
        }
    }

    static async getallUsers(req, res, next) {
        try {
            const getallUsers = await this.UserRepository.getAllUsers();
        } catch (error) {

        }
    }
}

module.exports = UserController;
