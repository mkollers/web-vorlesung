const bodyParser = require('body-parser');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

startup();

async function startup() {
    try {
        const db = await openDatabase();
        await createEntryTable(db);

        const app = express();

        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.set('view engine', 'ejs')

        app.get('/', async function (req, res) {
            const entries = await getEntries(db);            
            res.render('index', { entries: entries });
        });

        app.post('/', async function (req, res) {
            await createEntry(db, req.body.name, req.body.message);
            const entries = await getEntries(db);
            res.render('index', { entries: entries });
        })

        app.listen(8080, function () {
            console.log('Example app listening on port 8080!')
        });
    } catch (err) {
        console.error(err);
    }
}

function createEntry(db, name, message) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO entries (name, message, date) VALUES (?, ?, ?)`, [name, message, new Date()], (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    })
}

function getEntries(db) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM entries`, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    })
}

function openDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./dhbw.db', (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            console.log('Connected to the DHBW database.');
            resolve(db);
        });
    });
}

function createEntryTable(db) {
    return new Promise((resolve, reject) => {
        const sql = `CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(128), message TEXT, date DATETIME)`
        db.run(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}