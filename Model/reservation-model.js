import promisePool from '../utils/database.js';

export const createReservation = async (reservation) => {
    const { asiakas_id, reservationDate, customer_count, ajankohta } = reservation;

    const [rows] = await promisePool.execute(
        'INSERT INTO Reservations (asiakas_id, date, time, customer_count, ajankohta) VALUES (?, ?, ?, ?)',
        [asiakas_id, reservationDate, customer_count, ajankohta]
    );
    return rows;
};

export const getAllReservations = async () => {
    const [rows] = await promisePool.query('SELECT * FROM Reservations');
    return rows;
};

export const getReservationsByUser = async (asiakas_id) => {
    const [rows] = await promisePool.query(`
        SELECT Reservations.*
        FROM Customer
        JOIN Transactions ON Customer.asiakas_id = Transactions.asiakas_id
        JOIN Reservations ON Transactions.reservation_id = Reservations.reservation_id
        WHERE Customer.asiakas_id = ?
    `, [asiakas_id]);
    return rows;
};