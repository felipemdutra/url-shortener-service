import crypto from "crypto"

/*
 * @param {string} url
 * @return {string} short url
*/
export function createShortUrl(url) {
    const hash = crypto.createHash('sha1').update(url).digest('hex')
    return hash.slice(0, 6)
}

