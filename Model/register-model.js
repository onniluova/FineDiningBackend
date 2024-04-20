import promisePool from '../utils/database.js';

export const listAllCustomers = async () => {
    const [rows] = await promisePool.query('SELECT * FROM Customer');
    console.log('rows', rows);
    return rows;
};