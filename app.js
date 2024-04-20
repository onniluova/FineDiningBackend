import express from 'express';
import {listAllCustomers} from './Model/register-model.js';
import bodyParser from 'body-parser';

const hostname = '127.0.0.1';
const app = express();
const port = 3001;
import cors from 'cors';
import {registerUser, loginUser} from "./signup.js";

app.use(cors());
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
    try {
        const customers = await listAllCustomers();
        res.send(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error retrieving customers', error: error.message});
    }
});

app.post('/register', async (req, res) => {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: "user"
    };
    try {
        const result = await registerUser(newUser);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe rekisteröidessä käyttäjää', error: error.message});
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        if (user) {
            res.status(200).send({message: 'Kirjautuminen onnistui', user});
        } else {
            res.status(401).send({message: 'Väärä salasana tai sähköposti'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe kirjautuessa sisään', error: error.message});
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});