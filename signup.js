import promisePool from './utils/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (user) => {
    const [existingUsers] = await promisePool.query('SELECT * FROM Customer WHERE email = ?', [user.email]);
    if (existingUsers.length > 0) {
        throw new Error('Käyttäjä on jo olemassa.');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [rows] = await promisePool.query('INSERT INTO Customer (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)', [user.first_name, user.last_name, user.email, hashedPassword, "user"]);
    console.log(rows);
    return rows;
};

export const loginUser = async (email, password) => {
    const [users] = await promisePool.query('SELECT * FROM Customer WHERE email = ?', [email]);
    if (users.length > 0) {
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user.id }, 'sala-avain', { expiresIn: '1h' });
            console.log(token);
            return { user, token };
        }
    }
    return null;
};