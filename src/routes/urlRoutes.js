import express from "express"

export const router = express.Router()

router.get("/test/test-router", (req, res) => {
    res.status(200).send("The router is in")
})

