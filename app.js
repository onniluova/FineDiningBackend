import express from 'express';
import {createCustomer, listAllCustomers} from './Model/testiModel.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3001;
import cors from 'cors';

app.use(cors());

app.get('/', (req, res) => {
    res.send(listAllCustomers());
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});