import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

import {listAllCustomers} from './Model/register-model.js';
import {registerUser, loginUser} from "./signup.js";
import { createReservation, getAllReservations, getReservationsByUser } from './Model/reservation-model.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    try {
        const customers = await listAllCustomers();
        res.send(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe asiakkaiden', error: error.message});
    }
});

app.post('/menu', (req, res) => {
    res.send('Menu');
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

app.get('/menu', (req, res) => {
    fs.readFile(path.join(__dirname, 'menu.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({message: 'Error reading menu file', error: err.message});
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/menu', (req, res) => {
    const newMenu = req.body;
    fs.writeFile(path.join(__dirname, 'menu.json'), JSON.stringify(newMenu, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send({message: 'Virhe', error: err.message});
        } else {
            res.send({message: 'Menu päivitetty onnistuneesti'});
        }
    });
});

app.post('/orders', async (req, res) => {
    const newOrder = {
        userId: req.body.userId,
        orderItems: req.body.orderItems,
        orderStatus: req.body.orderStatus,
        orderDate: req.body.orderDate
    };
    try {
        const result = await createOrder(newOrder);
        res.status(201).send({message: 'Tilaus onnistui', orderId: result.insertId});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe luodessa tilausta', error: error.message});
    }
});

app.post('/reservations', async (req, res) => {
    const newReservation = {
        asiakas_id: req.body.asiakas_id,
        customer_count: req.body.customer_count,
        date: req.body.date,
        ajankohta: req.body.ajankohta
    };
    try {
        const result = await createReservation(newReservation)
        if (result.length > 0) {
            res.status(201).send({message: 'Varaus tehty onnistuneesti', asiakasid: result[0].asiakasid, reservationId: result[0].reservation_id});
        } else {
            res.status(201).send({message: 'Varaus tehty onnistuneesti, mutta asiakasid ja reservation_id ei löytynyt'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Varauksen teossa ilmeni virhe', error: error.message});
    }
});

app.get('/reservations', async (req, res) => {
    try {
        const reservations = await getAllReservations();
        res.send(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe etsiessä varauksia', error: error.message});
    }
});

app.get('/reservations/:asiakas_id', async (req, res) => {
    try {
        const reservations = await getReservationsByUser(req.params.asiakas_id);
        res.send(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe etsiessä varauksia', error: error.message});
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});