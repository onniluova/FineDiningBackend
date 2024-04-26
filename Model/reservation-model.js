import promisePool from '../utils/database.js';

export const createReservation = async (reservation) => {
    // Insert the new reservation
    const [insertRows] = await promisePool.query('INSERT INTO Reservations (customer_count, date) VALUES (?, ?)', [reservation.customer_count, reservation.date]);

    // Get the ID of the newly created reservation
    const reservationId = insertRows.insertId;

    // Perform a JOIN query to get the asiakasid and reservation_id
    const [selectRows] = await promisePool.query(`
        SELECT Customers.asiakas_id, Transactions.reservation_id
        FROM Customers
        JOIN Transactions
        ON Customers.asiakasid = Transactions.asiakas_id
        WHERE Transactions.reservation_id = ?
    `, [reservationId]);

    // Return the result of the JOIN query
    return selectRows;
};

export const getAllReservations = async () => {
    const [rows] = await promisePool.query('SELECT * FROM Reservations');
    return rows;
};

export const getReservationsByUser = async (asiakas_id) => {
    const [rows] = await promisePool.query(`
        SELECT Reservations.* 
        FROM Reservations 
        JOIN Transactions ON Reservations.id = Transactions.reservation_id 
        WHERE Transactions.asiakas_id = ?
    `, [asiakas_id]);
    return rows;
};