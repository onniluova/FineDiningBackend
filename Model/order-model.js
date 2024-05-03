import promisePool from '../utils/database.js';
export const createOrder = async (order) => {
    const [rows] = await promisePool.query('INSERT INTO Orders (asiakas_id, tila, paivamaara, tuotteet) VALUES (?, ?, ?, ?)', [order.asiakas_id, order.tila, order.paivamaara, JSON.stringify(order.tuotteet)]);
    return rows;
};