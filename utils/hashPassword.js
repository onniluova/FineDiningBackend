import bcrypt from 'bcrypt';
import promisePool from "./database.js";

const password = "jormis123"; // replace with the actual password
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
export const updatePassword = async (email, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await promisePool.execute(
        'UPDATE Customer SET password = ? WHERE email = ?',
        [hashedPassword, email]
    );
    return result;
};

updatePassword('jormis@admin.fi', 'newPassword');