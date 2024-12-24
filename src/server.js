import express from "express"

import { createShortUrl } from "./url.js"
import { initializeDatabase, insertUrl, getUrl } from "./database/database.js"

const app = express();
app.use(express.urlencoded({ extended: true }))

const db = initializeDatabase("./urls.db")

const PORT = 8000

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

app.get(`/:shortUrl`, async (req, res) => {
    try {
        const originalUrl = await getUrl(db, req.params.shortUrl);
        if (originalUrl) {
            res.redirect(`${originalUrl}`);
        }
        else {
            res.status(404).send("Not found");
            console.log("URL not found");
        }
    }
    catch (err) {
        res.status(500).send("Internal server error");
        console.error("Error:", err);
    }
    
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

