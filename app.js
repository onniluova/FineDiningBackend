import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

import {listAllCustomers} from './Model/register-model.js';
import {registerUser, loginUser} from "./signup.js";
import { createReservation, getAllReservations, getReservationsByUser, deleteReservation } from './Model/reservation-model.js';
import { createOrder, deleteOrder, getAllOrders, deleteAllOrders } from './Model/order-model.js';
import { deleteUser } from "./Model/user-model.js";
import { fetchBikeRentalStations, getBikeStation } from './graph.js';

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
        res.status(500).send({message: 'Virhe:', error: error.message});
    }
});

app.post('/register', async (req, res) => {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
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
            res.status(500).send({message: 'Virhe lukiessa menua', error: err.message});
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
        asiakas_id: req.body.asiakas_id,
        tila: req.body.tila,
        paivamaara: req.body.paivamaara,
        tuotteet: req.body.tuotteet
    };
    try {
        const result = await createOrder(newOrder);
        res.status(201).send({message: 'Tilaus tehty onnistuneesti.', orderId: result.insertId});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe tehdessä tilausta', error: error.message});
    }
});

app.delete('/orders/:order_id', async (req, res) => {
    try {
        const result = await deleteOrder(req.params.order_id);
        if (result.affectedRows === 0) {
            res.status(404).send({message: 'Tilausta ei löytynyt'});
        } else {
            res.send({message: 'Tilaus poistettu'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe poistaessa tilausta', error: error.message});
    }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe etsiessä tilauksia', error: error.message});
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
        const reservationId = await createReservation(newReservation)
        res.status(201).send({message: 'Varaus tehty onnistuneesti', reservationId: reservationId});
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

app.delete('/reservations/:reservation_id', async (req, res) => {
    try {
        const result = await deleteReservation(req.params.reservation_id);
        if (result.affectedRows === 0) {
            res.status(404).send({message: 'Varausta ei löytynyt'});
        } else {
            res.send({message: 'Varaus poistettu'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe poistaessa varausta', error: error.message});
    }
});

app.delete('/users/:asiakas_id', async (req, res) => {
    try {
        const result = await deleteUser(req.params.asiakas_id);
        if (result.affectedRows === 0) {
            res.status(404).send({message: 'Käyttäjää ei löytynyt'});
        } else {
            res.send({message: 'Käyttäjä poistettu'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe poistaessa käyttäjää', error: error.message});
    }
});

app.get('/createAdmin', async (req, res) => {
    const testAdminUser = {
        first_name: 'Test',
        last_name: 'Admin',
        email: 'testiadmin@admin.com',
        password: 'testadmin123',
        role: 'admin'
    };

    try {
        const result = await registerUser(testAdminUser);
        res.status(201).send({message: 'Test admin user created successfully', userId: result.insertId});
    } catch (error) {
        console.error('Virhe tehdessä adminia.', error.message);
        res.status(500).send({message: 'Virhe tehdessä adminia.', error: error.message});
    }
});

app.delete('/orders', async (req, res) => {
    try {
        const result = await deleteAllOrders();
        res.send({message: 'Kaikki tilaukset poistettu.', affectedRows: result.affectedRows});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Virhe poistaessa tilauksia.', error: error.message});
    }
});

app.get('/reititys', async (req,res)=> {
    try {
        const result = await fetchBikeRentalStations();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error fetching bike rental stations.', error: error.message});
    }
});

app.get('/reititys/:id', async (req, res) => {
    try {
        const result = await getBikeStation(req.params.id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error fetching bike station.', error: error.message});
    }
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});