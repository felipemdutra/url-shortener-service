import { insertUser, getUser } from "../database/users.js"

/*
 * @param db {sqlite3.Database}
*/
export function signUp(req, res, db) {
    const { username, email, password } = req.body

    try {
        insertUser(db, username, email, password)

        // Retrieve user info
        const userInfo = getUser(db, email)

        console.log("User found")
        console.log(userInfo)

        res.status(200).send("OK")
    } catch (error) {
        console.error("Error:", error);
    }
}

