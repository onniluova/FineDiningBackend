import promisePool from '../utils/database.js';
export async function deleteUser(userId) {
    const sql = 'DELETE FROM Users WHERE asiakas_id = ?';
    const result = await db.query(sql, [userId]);
    return result;
}