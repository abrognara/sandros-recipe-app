const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b59f9076846d0c',
    password: '5f00f69c',
    database: 'heroku_c20ccf2941bde2b'
});

app.use(express.json());
app.listen(port, () => console.log('Server listening on port ' + port));

app.get('/', async (req, res) => {
    res.json({ message: 'App is running' });
});

app.get('/ingredient', async (req, res) => {
    let ingredientName = req.query.name;
    const query = `SELECT * FROM ingredient WHERE name=\"${ingredientName}\"`;
    console.log(query);
    connection.query(query, (error, results) => {
        if (error) console.log(error);
        else if (!results[0]) {
            res.json({ results: 'None' });
        }
        else {
            res.json(results[0]);
        }
    });
});