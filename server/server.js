const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const router = express.Router();
const pg = require('pg');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});


// Create a connection "pool" to our postgres DB
const pool = new pg.Pool({
    database: 'jazzy_sql',      // name of the database

    // Optional Params
    host: 'localhost',
    port: 5432,

});


// TODO - Replace static content with a database tables
const artistList = [ 
    {
        name: 'Ella Fitzgerald',
        birthdate: '04-25-1917'
    },
    {
        name: 'Dave Brubeck',
        birthdate: '12-06-1920'
    },       
    {
        name: 'Miles Davis',
        birthdate: '05-26-1926'
    },
    {
        name: 'Esperanza Spalding',
        birthdate: '10-18-1984'
    },
]
const songList = [
    {
        title: 'Take Five',
        length: '5:24',
        released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        released: '1959-08-17'
    },
    {
        title: 'Black Gold',
        length: '5:17',
        released: '2012-02-01'
    }
];

app.get('/artist', (req, res) => {
    let sqlQuery = `
        -- We can write any SQL we want here!
        SELECT * FROM "artist";
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            // Log the response data
            console.log(dbRes);
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('sql failed', err);
            res.sendStatus(500);
        });
});

app.post('/artist', (req, res) => {
    let sqlQuery = `
        -- Add a new song to the DB
        INSERT INTO "artist"
            ("name", "birthday")
        VALUES
        -- Use placeholders or SQL Parameters
        -- to prevent a SQL Injection attach
            ($1, $2);
    `;
    let sqlParams = [
        req.body.name, // $1
        req.body.birthdate,  // $2
    ]
     console.log('sqlQuery:', sqlQuery);
     console.log('sql params', sqlParams);

    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            // DB is happy,
            // We're happy
            // Everyone's happy
            // Don't need dbRes'
            res.send(201); // Created
        })
        .catch((err) => {
            console.log("post error", err);
            res.sendStatus(500);
        });
});

app.get('/song', (req, res) => {
    let sqlQuery = `
    -- We can write any SQL we want here!
    SELECT * FROM "song";
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            // Log the response data
            console.log(dbRes);
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('sql failed', err);
            res.sendStatus(500);
        });
});

app.post('/song', (req, res) => {
    let sqlQuery = `
        -- Add a new song to the DB
        INSERT INTO "song"
            ("title", "length", "released")
        VALUES
        -- Use placeholders or SQL Parameters
        -- to prevent a SQL Injection attach
            ($1, $2, $3);
    `;
    let sqlParams = [
        req.body.title, // $1
        req.body.length,  // $2
        req.body.released,  // $3
    ]
    console.log('sqlQuery:', sqlQuery);
    console.log('sql params', sqlParams);

    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            // DB is happy,
            // We're happy
            // Everyone's happy
            // Don't need dbRes'
            res.send(201); // Created
        })
        .catch((err) => {
            console.log("post error", err);
            res.sendStatus(500);
        });
});


