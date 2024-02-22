const mysqlCon = require('../Config/db');
const bcrypt = require('bcrypt');

class User {
    static async createUser(username, email, password, name) {
        try {
            let hashPassword = await bcrypt.hash(password, 10)
            const result = await new Promise((resolve, reject) => {
                mysqlCon.query('INSERT INTO users (username, email, name, password) VALUES (?, ?, ?, ?)', [username, email, name, hashPassword], function (error, result) {
                    if (error) reject(error);
                    resolve(result);
                });
            });
            console.log(result)
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const getUserByEmail = `SELECT * FROM users WHERE email = '${email}'`;
            const result = await new Promise((resolve, reject) => {
                mysqlCon.query(getUserByEmail, function (err, result) {
                    if (err) reject(err);
                    resolve(result);
                });
            });
            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
