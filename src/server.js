import express from "express"

import { createShortUrl } from "./url.js"
import { closeDatabase, initializeDatabase, insertUrl } from "./database/database.js"

const app = express();
app.use(express.urlencoded({ extended: true }))

const db = initializeDatabase("./urls.db")

const PORT = 8000

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/shorten", (req, res) => {
    const longUrl = req.body.longUrl
    console.log("Received: ", longUrl)

    const shortUrl = createShortUrl(longUrl)
    console.log("Shortened: ", shortUrl)

    insertUrl(db, longUrl, shortUrl)

    res.redirect("/")
})

app.listen(PORT)

closeDatabase(db)

