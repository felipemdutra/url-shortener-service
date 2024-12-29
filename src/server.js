import express from "express"

import { urlRouter } from "./routes/urlRoutes.js"
import { userRouter } from "./routes/userRoutes.js"
import { initializeDatabase } from "./database/database.js"

const app = express();
app.use(express.urlencoded({ extended: true }))

const db = initializeDatabase("./urlShortener.db")

const PORT = 8000

app.set("view engine", "ejs")

app.use("/", userRouter(db))
app.use("/", urlRouter(db))

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        return null
    }
    console.log("Listening on port" , PORT)
})

