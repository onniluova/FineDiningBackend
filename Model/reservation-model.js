import promisePool from '../utils/database.js';

export const createReservation = async (reservation) => {
    const { asiakas_id, date, customer_count, ajankohta } = reservation;

    const [result] = await promisePool.execute(
        'INSERT INTO Reservations (asiakas_id, date, customer_count, ajankohta) VALUES (?, ?, ?, ?)',
        [asiakas_id, date, customer_count, ajankohta]
    );
    return result.insertId;
};

export const getAllReservations = async () => {
    const [rows] = await promisePool.query('SELECT * FROM Reservations');
    return rows;
};

export const getReservationsByUser = async (asiakas_id) => {
    const [rows] = await promisePool.query(`
        SELECT * FROM Reservations WHERE asiakas_id = ?
    `, [asiakas_id]);
    return rows;
};

export const deleteReservation = async (reservation_id) => {
    const [result] = await promisePool.execute(
        'DELETE FROM Reservations WHERE reservation_id = ?',
        [reservation_id]
    );
    return result;
};