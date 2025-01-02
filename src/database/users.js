import { hashPassword } from "./utils/password.js";

/*
 * @param {sqlite3.Database}
 */
export function initializeUsersTable(db) {
    db.serialize(() => {
        db.run(`
                CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
                )
        `, (err) => {
            if (err) {
                console.error("Couldn't create table:", err.message)
                return
            }
        });

        db.run("CREATE INDEX IF NOT EXISTS idx_username ON users(username)")
    })
}

/*
 * This function hashes the user's password (@param password) before inserting
 * the username, email and hashed password into the users table.
 *
 * @param db {sqlite3.Database}
 * @param username {string}
 * @param email {string}
 * @param password {string}
*/
export function insertUser(db, username, email, password) {
    return new Promise((resolve, reject) => {
        // Hash password before inserting into DB.
        const hashedPassword = hashPassword(password)
        db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], function(err) {
            if (err) {
                reject(handleSqliteError(err))
            } else {
                resolve(username)
            }
        })
    })
}

function handleSqliteError(err) {
    if (err.code === "SQLITE_CONSTRAINT") {
        if (err.message.includes("users.username")) {
            return "Username is already taken"
        } else if (err.message.includes("users.email")) {
            return "Email is already taken"
        }
        return "A database constraint error has occured"
    }
    // In case of a generic error
    return err.message
} 

export function getUser(db, email) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
            if (err) {
                console.log(err)
                return reject(err.message)
            }

            if (!row) {
                return reject(-1)
            }

            resolve(row)
        })
    })
}

