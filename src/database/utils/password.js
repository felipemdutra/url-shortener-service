import bcrypt from 'bcrypt'

/*
 * @param {string} password
 * @returns {string} encrypted password
 */
export function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

/*
 * @param password {string}
 * @param encryptedPassword {string}
 * @return {boolean}
 */
export function comparePassword(password, encryptedPassword) {
    const result = bcrypt.compareSync(password, encryptedPassword)
    return result ? 0 : -1;
}

