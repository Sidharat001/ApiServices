const mysqlCon = require('../Config/db');
const bcrypt = require('bcrypt');
const util = require('util');
const HttpsStatus = require('../HttpsStatus/HttpsStatusCode');

// Promisify the query method of mysqlCon
const mysqlQuery = util.promisify(mysqlCon.query).bind(mysqlCon);

class User {
    static async createUser(username, email, password, name) {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO users (username, email, name, password) VALUES (?, ?, ?, ?)';
            const result = await mysqlQuery(query, [username, email, name, hashPassword]);

            if (result.affectedRows > 0) {
                return {
                    status: HttpsStatus.OK,
                    message: `User registered successfully`,
                };
            } else {
                return {
                    status: HttpsStatus.Internal_Server_Error,
                    message: 'Failed to register user',
                };
            }
        } catch (error) {
            return {
                status: HttpsStatus.Internal_Server_Error,
                message: error.message,
            };
        }
    }

    static async getUserByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const result = await mysqlQuery(query, [email]);

            if (result.length > 0) {
                return {
                    status: HttpsStatus.OK,
                    message: '',
                    data: result,
                };
            } else {
                return {
                    status: HttpsStatus.OK,
                    message: 'User not found',
                    data: []
                };
            }
        } catch (error) {
            return {
                status: HttpsStatus.Internal_Server_Error,
                message: error.message,
            };
        }
    }

    static async getUserByUserName(userName) {
        try {
            const query = 'SELECT * FROM users WHERE username = ?';
            const result = await mysqlQuery(query, [userName]);

            if (result.length > 0) {
                return {
                    status: HttpsStatus.OK,
                    data: result[0],
                };
            } else {
                return {
                    status: HttpsStatus.OK,
                    message: 'User not found',
                };
            }
        } catch (error) {
            return {
                status: HttpsStatus.Internal_Server_Error,
                message: error.message,
            };
        }
    }
}

module.exports = User;
