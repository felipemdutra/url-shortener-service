export function initializeUrlsTable(db) {
    db.serialize(() => {
        db.run(`
                CREATE TABLE IF NOT EXISTS urls (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                original TEXT UNIQUE NOT NULL,
                shortened TEXT UNIQUE NOT NULL
                )
        `, (err) => {
            if (err) {
                console.error("Couldn't create table:", err.message);
                return
            }
        });

        db.run("CREATE INDEX IF NOT EXISTS idx_shortened ON urls(shortened)");
    });
}

/*
 * @param db {sqlite3.Database} 
 * @param original {string} original URL
 * @param shortened {string} shortened URL
 * @returns {Promise<string>}
 */
export function insertUrl(db, original, shortened) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO urls (original, shortened) VALUES (?, ?)", 
            [original, shortened], function(err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(shortened);
            }
        });
    });
}

/*
* @param db {sqlite3.Database} 
* @param shortened {string} shortened URL
* @returns {Promise<string>}
*/
export function getUrl(db, shortened) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT original FROM urls WHERE shortened = ?`, [shortened], (err, row) => {
                if (err) {
                    reject(err.message)
                    return
                }

                resolve(row ? row.original : null)
            })
    })
}
