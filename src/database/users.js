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
    // Email is not valid
    //if (!checkValidEmail(db, email)) {
    //    console.log("Email already exists")
     //   return null;
    //}

    //if (!checkValidUsername(db, username)) {
     //   console.log("Username already exists")
     //   return null;
   // }

    return new Promise((resolve, reject) => {
        try {
            // Hash password before inserting into DB.
            const hashedPassword = hashPassword(password)
            db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], function(err) {
                    if (err) {
                        reject(err.message)
                    } else {
                        resolve(username)
                    }
            })
        }
        catch (err) {
            reject(err.message)
        }
    })
}

/*
 * This function checks if there is any other user with the same email
 *
 * @param {sqlite3.Database} db
 * @param {string} email
 *
 * Returns true if no user is found and false if a user with the same email
 * exists
 */
 function checkValidEmail(db, email) {
    return new Promise((resolve, reject) => {
        db.get("SELECT email FROM users WHERE email = ?", [email], (err, row) => {
            if (err) {
                console.log(err)
                return reject(err.message)
            }

            if (!row) {
                resolve(true)
            }
        })

        resolve(false)
    })
}

function checkValidUsername(db, username) {
    return new Promise ((resolve, reject) => {
        db.get("SELECT username FROM users WHERE username = ?", [username], (err, row) => {
            if (err) {
                console.log(err)
                return reject(err.message)
            }

            if (!row) {
                resolve(true)
            }
        })

        resolve(false)
    })
}

export function getUser(db, email) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
            if (err) {
                console.log(err)
                return reject(err.message)
            }

            if (!row) {
                return reject("User not found")
            }

            resolve(row)
        })
    })
}

