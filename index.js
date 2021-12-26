const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.listen(port, () => console.log('Server listening on port ' + port));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/status.html');
});

app.get('/recipe', async (req, res) => {
    res.json({ message: 'Sample Recipe' });
});