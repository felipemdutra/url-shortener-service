import express from "express"

import { shortenUrl, redirectToLongUrl } from "../controllers/urlControllers.js"

export function urlRouter(db) {
    const router = express.Router()

    router.post("/shorten", shortenUrl(db))
    router.get(`/:shortUrl`, redirectToLongUrl)
}

