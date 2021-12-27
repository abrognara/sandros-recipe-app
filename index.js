const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    // socketPath: process.env. ??
});

app.use(express.json());
app.listen(port, () => console.log('Server listening on port ' + port));

app.get('/', async (req, res) => {
    res.json({ message: 'App is running' });
});

app.get('/:ingredient', async (req, res) => {
    const query = 'SELECT * FROM ingredient WHERE name = ?';
    pool.query(query, [req.params.breed], (error, results) => {
        if (!results[0]) {
            res.json({ results: 'None' });
        }
        else {
            res.json(results[0]);
        }
    });
});