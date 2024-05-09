import promisePool from '../utils/database.js';
export const createOrder = async (order) => {
    const [rows] = await promisePool.query('INSERT INTO Orders (asiakas_id, tila, paivamaara, tuotteet) VALUES (?, ?, ?, ?)', [order.asiakas_id, order.tila, order.paivamaara, JSON.stringify(order.tuotteet)]);
    return rows;
};

export const deleteOrder = async (orderId) => {
    const [result] = await promisePool.query('DELETE FROM Orders WHERE order_id = ?', [orderId]);
    return result;
};

export const getAllOrders = async () => {
    const [rows] = await promisePool.query('SELECT * FROM Orders');
    return rows;
};

export const deleteAllOrders = async () => {
    const [result] = await promisePool.query('DELETE FROM Orders');
    return result;
};