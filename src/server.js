const express = require("express")
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

    res.redirect("/");
})

app.listen(PORT);

