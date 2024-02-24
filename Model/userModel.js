const mysqlCon = require('../Config/db');
const bcrypt = require('bcrypt');

class User {
    static async createUser(username, email, password, name) {
        try {
            const hashPassword = await bcrypt.hash(password, 10); // Hash the password
            const query = 'INSERT INTO users (username, email, name, password) VALUES (?, ?, ?, ?)';
            const result = await new Promise((resolve, reject) => {
                mysqlCon.query(query, [username, email, name, hashPassword], function (error, result) {
                    if (error) reject(error);
                    resolve(result);
                });
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const result = await new Promise((resolve, reject) => {
                mysqlCon.query(query, [email], function (err, result) {
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
