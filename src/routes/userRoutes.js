import express from "express"

import { signUp } from "../controllers/userControllers.js"

export function userRouter(db) {
    const router = express.Router()

    router.get("/", (req, res) => {
        res.render("homePage")
    })

    router.get("/sign-up", (req, res) => {
        res.render("signUpPage")
    }) 

    router.post("/signup", signUp(db))

    return router
} 

