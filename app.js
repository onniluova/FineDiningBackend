import express from 'express';
import {listAllCustomers, createCustomer} from './Model/testiModel.js';
import bodyParser from 'body-parser';

const hostname = '127.0.0.1';
const app = express();
const port = 3001;
import cors from 'cors';

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(listAllCustomers());
});

app.post('/register', async (req, res) => {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    };
    try {
        const result = await createCustomer(newUser);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error registering new user', error: error.message});
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});