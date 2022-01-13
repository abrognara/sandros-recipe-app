const e = require('express');
const express = require('express');
// const mysql = require('mysql');
const pool = require('./database');

const app = express();
const port = process.env.PORT || 8080;

// const connection = mysql.createConnection({
//     host: 'us-cdbr-east-05.cleardb.net',
//     user: 'b59f9076846d0c',
//     password: '5f00f69c',
//     database: 'heroku_c20ccf2941bde2b'
// });

app.use(express.json());
app.listen(port, () => console.log('Server listening on port ' + port));

app.get('/', async (req, res) => {
    res.json({ message: 'App is running' });
});

app.get('/ingredient', async (req, res) => {
    let ingredientName = req.query.name;
    const query = `SELECT * FROM ingredients WHERE name=\"${ingredientName}\"`;
    console.log(query);
    pool.query(query, (error, results) => {
        if (error) console.log(error);
        else if (!results[0]) {
            res.json({ results: 'None' });
        }
        else {
            res.json(results[0]);
        }
    });
});

app.get('/ingredients', async (req, res) => {
    const query = `SELECT * FROM ingredients`;
    console.log(query);
    pool.query(query, (error, results) => {
        if (error) console.log(error);
        else if (!results[0]) {
            res.json({ results: 'None' });
        }
        else {
            res.json(results);
        }
    });
});

app.post('/ingredient', async (req, res) => {
    let name = req.body.name;
    if (!name) res.status(400).send('Please include an ingredient name');
    const query = `INSERT INTO ingredients VALUES (DEFAULT,\"${name}\")`;
    console.log(query);
    pool.query(query, (error) => {
        if (error) {
            res.json({ status: 'failure', reason: error.code });
        }
        else {
            res.json({ status: 'success', created: name });
        }
    });
});

app.get('/recipes', async (req, res) => {
    const query = `SELECT * FROM recipes;`;
    console.log(query);
    pool.query(query, (error, results) => {
        if (error) console.log(error);
        res.json(results);
    });
});

app.get('/recipe', async (req, res) => {
    const name = req.query.name;
    const query1 = `SELECT rd.recipeId, rd.ingredientId, rd.amount, rd.metric, i.name AS ingredientName FROM recipe_details rd
        JOIN recipes r ON r.recipeId = rd.recipeId AND r.name = \"${name}\"
        JOIN ingredients i ON i.ingredientId = rd.ingredientId;`;
    console.log(query1);

    const query2 = `SELECT s.recipeId, s.stepId, s.text FROM steps s
        JOIN recipes r ON r.recipeId = s.recipeId AND r.name = \"${name}\";`;
    console.log(query2);

    // TODO ingredients should have a col for order, return with ORDER BY
    let recipeId = '';
    let ingredients = [];
    let steps = []

    /* 
        Collect unique ingredients & steps 
        TODO: optimize sql query if possible or code
    */
    pool.query(query1, (error, results) => {
        if (error) console.log(error);
        if (results.length === 0) res.json(results);
        
        recipeId = results[0].recipeId;
        results.forEach(elm => {
            ingredients.push({ 
                ingredientId: elm.ingredientId,
                amount: elm.amount,
                metric: elm.metric,
                ingredientName: elm.ingredientName
            });
        });

        console.log(`ingredient ids: ${ingredientIds}`);
        console.log(`step ids: ${stepIds}`);
    });

    pool.query(query2, (error, results) => {
        if (error) console.log(error);
        if (results.length === 0) res.json(results);

        recipeId = results[0].recipeId;
        results.forEach(elm => {
            steps.push({ stepId: elm.stepId, text: elm.text });
        });
    });

    res.json({ recipeId: recipeId, ingredients: ingredients, steps: steps });
});

// app.post('/recipe', async (req, res) => {
//     let name = req.body.name;
//     if (!name) res.status(400).send('Please include a recipe name');
    
// });