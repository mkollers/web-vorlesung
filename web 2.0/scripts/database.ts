import { Database as SqliteDB } from 'sqlite3';
import { Entry } from './models/entry';

export class Database {
    private _db: SqliteDB;

    constructor() { }

    open() {
        return new Promise<void>((resolve, reject) => {
            this._db = new SqliteDB('./dhbw.db', (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                console.log('Succefully connected to the database.');
                resolve();
            });
        });
    }

    initSchemaIfNotExists() {
        return new Promise<void>((resolve, reject) => {
            const sql = `CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(128), message TEXT, date DATETIME)`
            this._db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    getEntries() {
        return new Promise<Entry[]>((resolve, reject) => {
            this._db.all(`SELECT * FROM entries`, (err, result: Entry[]) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        })
    }

    createEntry(entry: Entry) {
        return new Promise<void>((resolve, reject) => {
            this._db.run(`INSERT INTO entries (name, message, date) VALUES (?, ?, ?)`, [entry.name, entry.message, entry.date], (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        })
    }
}