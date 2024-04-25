// Model/reservation-model.js
import promisePool from '../utils/database.js';

export const createReservation = async (reservation) => {
    const [rows] = await promisePool.query('INSERT INTO Reservations (customer_count, date) VALUES (?, ?)', [reservation.customer_count, reservation.date]);
    return rows;
};

export const getAllReservations = async () => {
    const [rows] = await promisePool.query('SELECT * FROM Reservations');
    return rows;
};