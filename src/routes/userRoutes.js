import express from "express"

import { signUp } from "../controllers/userControllers.js"

export function userRouter(db) {
    const router = express.Router()

    userRouter.get("/", (req, res) => {
        res.render("homePage")
    })

    userRouter.get("/sign-up", (req, res) => {
        res.render("signUpPage")
    }) 

    userRouter.post("/signup", signUp(db))

    return router
} 

