// Model/reservation-model.js
import promisePool from '../utils/database.js';

export const createReservation = async (reservation) => {
    const [rows] = await promisePool.query('INSERT INTO Reservations (userId, reservationDate, customerCount) VALUES (?, ?, ?)', [reservation.userId, reservation.reservationDate, reservation.customerCount]);
    return rows;
};