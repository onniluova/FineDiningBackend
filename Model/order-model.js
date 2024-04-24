import promisePool from '../utils/database.js';

export const createOrder = async (order) => {
    const [rows] = await promisePool.query('INSERT INTO Orders (userId, orderItems, orderDate) VALUES (?, ?, ?)', [order.userId, JSON.stringify(order.orderItems), order.orderDate]);
    return rows;
};