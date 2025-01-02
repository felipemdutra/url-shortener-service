import { insertUser, getUser } from "../database/users.js"
import { comparePassword } from "../database/utils/password.js"

/*
 * @param db {sqlite3.Database}
*/
export async function signUp(req, res, db) {
    const { username, email, password } = req.body

    try {
        insertUser(db, username, email, password)

        // Retrieve user info
        const userInfo = await getUser(db, email)

        console.log("User found")
        console.log(userInfo)

        res.status(200)
        res.redirect("/")
    } catch (error) {
        console.error("Error:", error);
        res.status(500)
    }
}

export async function logIn(req, res, db) {
    const { email, password } = req.body

    try {
        // Retrieve user info
        const userInfo = await getUser(db, email)

        if (userInfo < 0) {
            return res.status(400).send("Invalid email");
        }

        if (comparePassword(password, userInfo.password) < 0) {
            return res.status(400).send("Invalid password");
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500)
    }
}

