import promisePool from './utils/database.js';

export const registerUser = async (user) => {
    const [existingUsers] = await promisePool.query('SELECT * FROM Customer WHERE email = ?', [user.email]);
    if (existingUsers.length > 0) {
        throw new Error('Käyttäjä on jo olemassa.');
    }
    const [rows] = await promisePool.query('INSERT INTO Customer (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)', [user.first_name, user.last_name, user.email, user.password, "user"]);
    console.log(rows);
    return rows;
};

export const loginUser = async (email, password) => {
    const [users] = await promisePool.query('SELECT * FROM Customer WHERE email = ?', [email]);
    if (users.length > 0) {
        const user = users[0];
        if (user.password === password) {
            return user;
        }
    }
    return null;
};