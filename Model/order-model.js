import promisePool from '../utils/database.js';

export const createOrder = async (order) => {
    const [rows] = await promisePool.query('INSERT INTO Orders (userId, orderItems, orderStatus, orderDate) VALUES (?, ?, ?, ?)', [order.userId, JSON.stringify(order.orderItems), order.orderStatus, order.orderDate]);
    return rows;
};