import sqlite3 from 'sqlite3';

import { initializeUrlsTable } from './urls.js';
import { initializeUsersTable } from './users.js';

/*
 * @param {string} database path
 * @returns {sqlite3.Database}
 */
export function initializeDatabase(dbPath) {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error("Couldn't open Database:", err.message);
            return
        }

        initializeUrlsTable(db);
        initializeUsersTable(db);

        console.log("Connected to the SQLite database.");
    });

    return db;
}

/*
 * @param {sqlite3.Database}
 */
export function closeDatabase(db) {
    db.close((err) => {
        if (err) {
            console.error("Couldn't close database:", err.message);
        }
    })
}

