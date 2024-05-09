import promisePool from '../utils/database.js';
export async function deleteUser(userId) {
    const sql = 'DELETE FROM Customer WHERE asiakas_id = ?';
    const [result] = await promisePool.query(sql, [userId]);
    return result;
}