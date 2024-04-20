import promisePool from './utils/database.js';

export const registerUser = async (user) => {
    const [existingUsers] = await promisePool.query('SELECT * FROM users WHERE email = ?', [user.email]);
    if (existingUsers.length > 0) {
        throw new Error('Käyttäjä on jo olemassa.');
    }
    const [rows] = await promisePool.query('INSERT INTO Customer (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)', [user.first_name, user.last_name, user.email, user.password, 'default_role']);
    return rows;
};

function loginUser() {
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;

    for(let i = 0; i < users.length; i++) {
        if(users[i].username === username && users[i].password === password) {
            console.log("Kirjautuminen onnistui");
            return;
        }
    }
    console.log("Error: Väärä salasana tai sähköposti");
}