
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Database } from './database';
import { Entry } from './models/entry';

const db = new Database();

export async function startup() {
    try {
        await db.open();
        await db.initSchemaIfNotExists();

        const app = express();
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.set('view engine', 'ejs')

        app.get('/', getIndex);
        app.post('/', postIndex)

        app.listen(8080, () => console.log('Example app listening on port 8080!'));
    } catch (err) {
        console.error(err);
    }
}

async function getIndex(req: express.Request, res: express.Response) {
    const entries = await db.getEntries();
    res.render('index', { entries: entries });
}

async function postIndex(req: express.Request, res: express.Response) {
    const entry: Entry = req.body;
    entry.date = new Date();
    await db.createEntry(entry);

    const entries = await db.getEntries();
    res.render('index', { entries: entries });
}