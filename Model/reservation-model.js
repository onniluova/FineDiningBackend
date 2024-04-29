import promisePool from '../utils/database.js';

export const createReservation = async (reservation) => {
    const { date, customer_count, ajankohta } = reservation;

    const [result] = await promisePool.execute(
        'INSERT INTO Reservations (date, customer_count, ajankohta) VALUES (?, ?, ?)',
        [date, customer_count, ajankohta]
    );
    return result.insertId; // This is the reservation_id of the newly created reservation
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