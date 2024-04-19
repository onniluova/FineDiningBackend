import promisePool from '../utils/database.js';

export const listAllCustomers = async () => {
    const [rows] = await promisePool.query('SELECT * FROM Customer');
    console.log('rows', rows);
    return rows;
};

export const createCustomer = async (customer) => {
    const [rows] = await promisePool.query('INSERT INTO Customer (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [customer.firstName, customer.lastName, customer.email, customer.password]);
    return rows;
};