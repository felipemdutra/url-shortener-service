import { createShortUrl } from "./url.js"
import express from "express"

const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 8000

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/shorten", (req, res) => {
    const longUrl = req.body.longUrl;
    console.log("Received: ", longUrl);

    const shortUrl = createShortUrl(longUrl);
    console.log("Shortened: ", shortUrl);

    res.redirect("/");
})

app.listen(PORT);

