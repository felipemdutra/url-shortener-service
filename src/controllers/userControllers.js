import { insertUser, getUser } from "../database/users.js"

/*
 * @param db {sqlite3.Database}
*/
export async function signUp(db, req, res) {
    const { username, email, password } = req.body

    try {
        await insertUser(db, username, email, password)
        // Retrieve user info
        const userInfo = await getUser(db, email)

        console.log("User found")
        console.log(userInfo)

        res.status(200).send("OK")
    } catch (error) {
        console.error("Error:", error);
    }
}
