import express from "express"

import { shortenUrl, redirectToLongUrl } from "../controllers/urlControllers.js"

export function urlRouter(db) {
    const router = express.Router()

    router.post("/shorten", (req, res) => shortenUrl(db, req, res))
    router.get(`/:shortUrl`, (req, res) => redirectToLongUrl(db, req, res))

    return router
}

