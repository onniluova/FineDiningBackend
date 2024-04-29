import promisePool from '../utils/database.js';
export const createOrder = async (order) => {
    const [rows] = await promisePool.query('INSERT INTO Orders (asiakas_id, tila, paivamaara) VALUES (?, ?, ?)', [order.asiakas_id, order.tila, order.paivamaara]);
    return rows;
};