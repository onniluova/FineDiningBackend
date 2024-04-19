let users = [];

function registerUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;

    for(let i = 0; i < users.length; i++) {
        if(users[i].email === email || users[i].username === username) {
            console.log("Error: User already exists");
            return;
        }
    }

    let newUser = {
        email: email,
        password: password,
        username: username
    };

    users.push(newUser);
}

function loginUser() {
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;

    for(let i = 0; i < users.length; i++) {
        if(users[i].username === username && users[i].password === password) {
            console.log("Login Success");
            return;
        }
    }
    console.log("Error: Invalid username or password");
}