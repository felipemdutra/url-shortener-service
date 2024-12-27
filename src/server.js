import express from "express"

import { createShortUrl } from "./url.js"
import { initializeDatabase } from "./database/database.js"
import { insertUrl, getUrl } from "./database/urls.js"
import { insertUser, getUser } from "./database/users.js"

const app = express();
app.use(express.urlencoded({ extended: true }))

const db = initializeDatabase("./urlShortener.db")

const PORT = 8000

app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.render("homePage")
})

app.get("/sign-up", (req, res) => {
    res.render("signUpPage")
}) 

app.get(`/:shortUrl`, async (req, res) => {
    try {
        const originalUrl = await getUrl(db, req.params.shortUrl);
        if (originalUrl) {
            res.redirect(`${originalUrl}`);
            return 0
        }
        res.status(404).send("Not found");
        console.log("URL not found");
    }

    catch (err) {
        res.status(500).send("Internal server error");
        console.error(err);
    }
    
}) 

app.post("/shorten", (req, res) => {
    const longUrl = req.body.longUrl
    console.log("Received: ", longUrl)

    const shortUrl = createShortUrl(longUrl)
    console.log("Shortened: ", shortUrl)

    insertUrl(db, longUrl, shortUrl)

    res.render("displayLinkPage", { shortUrl: shortUrl })
})

app.post("/signup", async (req, res) => {
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
})

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        return null
    }
    console.log("Listening on port" , PORT)
})

