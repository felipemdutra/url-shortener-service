import { getUrl, insertUrl } from "../database/urls.js"
import { createShortUrl } from "../url.js"

export function shortenUrl(db, req, res) {
    const longUrl = req.body.longUrl
    console.log("Received: ", longUrl)

    const shortUrl = createShortUrl(longUrl)
    console.log("Shortened: ", shortUrl)

    insertUrl(db, longUrl, shortUrl)

    res.render("displayLinkPage", { shortUrl: shortUrl })
}

export async function redirectToLongUrl(req, res) {
    try {
        const originalUrl = await getUrl(db, req.params.shortUrl);
        if (originalUrl) {
            res.redirect(`${originalUrl}`);
            return 0
        }
        res.status(404).send("Not found");
        console.log("URL not found");
    }

    catch (err) {
        res.status(500).send("Internal server error");
        console.error(err);
    }
}

