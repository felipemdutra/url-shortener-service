import express from "express"

export const userRouter = express.Router()

router.get("/", (req, res) => {
    res.render("homePage")
})

router.get("/sign-up", (req, res) => {
    res.render("signUpPage")
}) 

