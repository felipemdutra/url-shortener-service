import bcrypt from 'bcrypt'

/*
 * @param {string} password
 * @returns {string} encrypted password
 */
export async function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

